// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import 'openzeppelin-contracts/contracts/access/Ownable.sol';
import 'openzeppelin-contracts/contracts/utils/Counters.sol';
import 'openzeppelin-contracts/contracts/security/ReentrancyGuard.sol';
import 'openzeppelin-contracts/contracts/token/ERC20/IERC20.sol';
import './helpers/Math.sol';

import './MediciToken.sol';

contract MediciPool is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    MediciToken poolToken;
    address USDCAddress = 0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747;

    struct Loan {
        address borrower;
        uint256 amount;
        address approver;
        uint256 startTime;
    }

    struct Approver {
        uint256 balance;
        uint256 reputation;
        uint256 approvalLimit;
        uint256 currentlyApproved;
    }

    struct Borrower {
        uint256 borrowLimit;
        uint256 currentlyBorrowed;
        uint256 reputation;
        uint256[] loans;
    }

    uint256 public lendingRateAPR; // per 10^18
    Counters.Counter currentId;
    mapping(address => Approver) approvers;
    mapping(address => Borrower) borrowers;
    mapping(uint256 => Loan) loans;

    uint256 totalShares; // total shares of LP tokens
    uint256 maxLoanAmount;
    uint256 maxTimePeriod; //in days
    uint256 minPoolAllocation; // per 10^18

    /**************************************************************************
     * Events
     *************************************************************************/

    event DepositMade(address indexed poolProvider, uint256 amount, uint256 shares);
    event WithdrawalMade(address indexed poolProvider, uint256 amount, uint256 shares);
    event NewLoanRequest(address indexed borrower, uint256 loanId, uint256 amount);
    event LoanApproved(
        address indexed approver,
        address indexed borrower,
        uint256 loanId,
        uint256 amount
    );

    /**************************************************************************
     * Constructor
     *************************************************************************/

    constructor(address _tokenAddr) public Ownable() {
        poolToken = MediciToken(_tokenAddr);
        initialize();
    }

    function initialize() public onlyOwner {
        lendingRateAPR = 2 ^ 17;
        maxTimePeriod = 30;
        minPoolAllocation = 10 ^ 15;
        totalShares = 0;
    }

    /**************************************************************************
     * Modifiers
     *************************************************************************/

    modifier onlyApprover() {
        require(approvers[msg.sender].balance > 0, 'Must be an approver');
        _;
    }

    /**************************************************************************
     * Utility Functions
     *************************************************************************/

    function getLendingRate() public view returns (uint256) {
        return lendingRateAPR;
    }

    function setLendingRate(uint256 _lendingRateAPR) public onlyOwner {
        lendingRateAPR = _lendingRateAPR;
    }

    function setUSDCAddress(address _addr) public {
        USDCAddress = _addr;
    }

    function getRepayAmount(address _borrower) public view returns (uint256) {
        // TODO
        // require(loans[_borrower].approved, "Loan not approved");
        // return loans[_borrower].amount + Math.calculateInterest(loans[_borrower], lendingRateAPR, 1);
    }

    function getPoolShare(uint256 _amt) public view returns (uint256) {
        uint256 share = (_amt * 1e18) / (_amt + totalShares);
        return share;
    }

    function getTotalShares() public view returns (uint256) {
        return poolToken.totalSupply();
    }

    function getPoolReserves() public view returns (uint256) {
        return getUSDC(USDCAddress).balanceOf(address(this));
    }

    function mintNewShares(uint256 _amt) public onlyApprover {
        poolToken.mint(_amt);
    }

    function burnShares(uint256 _amt) public onlyApprover {
        poolToken.burn(_amt);
    }

    function getUSDC(address _addr) internal view returns (IERC20) {
        return IERC20(_addr);
    }

    function doUSDCTransfer(
        address from,
        address to,
        uint256 amount
    ) internal returns (bool) {
        require(to != address(0), "Can't send to zero address");
        IERC20 usdc = getUSDC(USDCAddress);
        return usdc.transferFrom(from, to, amount);
    }

    function getInitialBorrowLimit() public view returns (uint256) {
        return Math.mulDiv(getPoolReserves(), minPoolAllocation, 10**18);
    }

    function getTimePeriod() internal returns (uint256) {
        return maxTimePeriod * 24 * 60 * 60;
    }

    /**************************************************************************
     * Core Functions
     *************************************************************************/

    function deposit(uint256 _amt) external {
        require(_amt > 0, 'Must deposit more than zero');
        uint256 depositShare = getPoolShare(_amt);

        bool success = doUSDCTransfer(msg.sender, address(this), _amt);
        require(success, 'Failed to transfer for deposit');
        mintNewShares(depositShare);

        uint256 rep = getReputation();

        if (approvers[msg.sender].balance == 0) {
            approvers[msg.sender] = Approver(_amt, _amt, rep, 0);
        } else {
            approvers[msg.sender].balance += _amt;
            approvers[msg.sender].approvalLimit += _amt;
            approvers[msg.sender].reputation = rep;
        }

        emit DepositMade(msg.sender, _amt, depositShare);
    }

    function withdraw(uint256 _amt) external {
        require(_amt > 0, 'Must withdraw more than zero');

        Approver storage _approver = approvers[msg.sender];
        require(_approver.balance >= _amt, 'Not enough balance');
        uint256 withdrawShare = getPoolShare(_amt);
        burnShares(withdrawShare);

        _approver.balance -= _amt;
        updateApproverReputation(_approver);

        doUSDCTransfer(address(this), msg.sender, _amt);
        emit WithdrawalMade(msg.sender, _amt, withdrawShare);
    }

    function approve(uint256 _loanId) public onlyApprover {
        Loan storage loan = loans[_loanId];
        require(loan.amount == 0, 'Invalid loan');
        require(loan.approver != address(0), 'Loan already approved');

        require(
            approvers[msg.sender].approvalLimit >
                loan.amount + approvers[msg.sender].currentlyApproved,
            'Going over your approval limit'
        );

        Borrower storage borrower = borrowers[loan.borrower];
        require(borrower.borrowLimit == 0, "Borrower doesn't exist");
        require(loanAlreadyExists(loan.borrower, _loanId), 'Loan already exists');

        borrower.loans.push(_loanId);
        borrower.currentlyBorrowed += loan.amount;
        loan.approver = msg.sender;
        loan.startTime = block.timestamp;

        approvers[msg.sender].currentlyApproved += loan.amount;

        bool success = doUSDCTransfer(address(this), msg.sender, loan.amount);
        require(success, 'Failed to transfer for borrow');

        emit LoanApproved(msg.sender, msg.sender, _loanId, loan.amount);
    }

    function request(uint256 _amt) external {
        require(_amt > 0, 'Must borrow more than zero');

        _checkUniqueId();
        Borrower storage borrower = borrowers[msg.sender];

        require(
            _amt + borrower.currentlyBorrowed < borrower.borrowLimit,
            'Going over your borrow limit'
        );

        uint256 loanId = currentId.current();
        loans[loanId] = Loan(msg.sender, _amt, address(0), 0);
        currentId.increment();
        updateBorrowerReputation(borrower);

        emit NewLoanRequest(msg.sender, loanId, _amt);
    }

    function repay(uint256 _loanId, uint256 _amt) external {
        require(_amt > 0, 'Must borrow more than zero');

        _checkUniqueId();

        Loan storage loan = loans[_loanId];
        Borrower storage borrower = borrowers[msg.sender];
        Approver storage approver = approvers[loan.approver];

        require(!checkDefault(_loanId), 'Passed the deadline');
        require(_amt <= borrower.currentlyBorrowed, "Can't repay more than you owe");
        uint256 repayAmt = _amt + calcIntr(_amt, getTimePeriod());

        bool success = doUSDCTransfer(address(this), msg.sender, repayAmt);
        require(success, 'Failed to transfer for repay');

        loan.amount = 0;
        removeLoan(_loanId, loan.borrower);
        borrower.currentlyBorrowed -= _amt;

        updateBorrowerReputation(borrower);
        updateApproverReputation(approver);
    }

    /**************************************************************************
     * Internal Functions
     *************************************************************************/

    function _checkUniqueId() internal returns (bool) {
        return true;
    }

    function getReputation() public returns (uint256) {
        return 200;
    }

    function getBorrowLimit(uint256 _reputation) public returns (uint256) {
        return 1000;
    }

    function getApprovalLimit(uint256 _reputation) public returns (uint256) {
        return 1000;
    }

    function updateBorrowerReputation(Borrower memory _borrower) public {
        uint256 _rep = getReputation();
        _borrower.reputation = _rep;
        _borrower.borrowLimit = getBorrowLimit(_rep);
    }

    function updateApproverReputation(Approver memory _approver) public {
        uint256 _rep = getReputation();
        _approver.reputation = _rep;
        _approver.approvalLimit = getApprovalLimit(_rep);
    }

    function loanAlreadyExists(address _bAddr, uint256 _loanId) public view returns (bool) {
        Borrower memory borrower = borrowers[_bAddr];
        for (uint256 i = 0; i < borrower.loans.length; i++) {
            if (borrower.loans[i] == _loanId) {
                return true;
            }
        }
        return false;
    }

    function calcIntr(uint256 _amt, uint256 _durationDays) public view returns (uint256) {
        return Math.mulDiv(_amt, lendingRateAPR * _durationDays, 10**18 * 365);
    }

    function checkDefault(uint256 _loanId) public returns (bool) {
        Loan memory _loan = loans[_loanId];
        if (_loan.startTime + getTimePeriod() < block.timestamp) {
            return true;
        } else {
            return false;
        }
    }

    function removeLoan(uint256 _loanId, address _borrower) internal {
        uint256[] storage loans = borrowers[_borrower].loans;
        uint256 index;
        for (uint256 i = 0; i < loans.length; i++) {
            if (loans[i] == _loanId) {
                index = i;
                break;
            }
        }

        loans[index] = loans[loans.length - 1];
        loans.pop();
    }
}
