import { ethers } from 'ethers';

import MediciPoolABI from './abi/MediciPool.abi.json';
import { MediciPoolAbi } from './types';

const poolInterface = new ethers.utils.Interface(MediciPoolABI.abi);

export default class MediciPool {
    readonly contract: MediciPoolAbi;
    contructor(tokenAddress: string) {
        this.contract = new ethers.Contract(
            tokenAddress,
            MediciPoolABI.abi
        ) as MediciPoolAbi;
    }

    /**
     * deposit money to the pool
     */
    deposit = async (amount: ethers.BigNumber) => {
        return this.contract.deposit(amount.toString());
    };
}
