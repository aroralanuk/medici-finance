import {
    Button,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
    VStack,
} from '@chakra-ui/react';
import React, { createRef } from 'react';
import { AiOutlineMenu as EthereumCurrency } from 'react-icons/ai';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

import ApproverInfo from '../components/ApproverInfo';
import MediciPoolInterface from '../sdk/abi/MediciPool.abi.json';
import USDCTokenInterface from '../sdk/abi/USDCToken.abi.json';

const contractConfig = {
    addressOrName: '0x35bfa40f365f8de7707749ba5a483dfef99ed2c9',
    contractInterface: MediciPoolInterface.abi,
};

const usdcConfig = {
    addressOrName: '0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C',
    contractInterface: USDCTokenInterface,
};

function Deposit() {
    const textInput: React.RefObject<HTMLInputElement> =
        createRef<HTMLInputElement>();
    const [depositAmount, setDepositAmount] = React.useState(5);

    const { write: approveUSDC } = useContractWrite(usdcConfig, 'approve', {
        args: [
            '0x35bfa40f365f8de7707749ba5a483dfef99ed2c9',
            100_000_000_000_000,
        ],
        overrides: { gasLimit: 1e7 },
    });

    const {
        data: depositData,
        write: handleDeposit,
        isLoading: isDepositLoading,
        isSuccess: isDepositSuccess,
    } = useContractWrite(contractConfig, 'deposit', {
        args: [12],
        overrides: { gasLimit: 1e7 },
    });

    // const { depositConfig } = usePrepareContractWrite({
    //     addressOrName: '0x35bfa40f365f8de7707749ba5a483dfef99ed2c9',
    //     contractInterface: MediciPoolInterface.abi,
    //     functionName: 'deposit',
    //     args: [depositAmount],
    // });

    // const {
    //     data: depositData,
    //     write: handleDeposit,
    //     isLoading: isDepositLoading,
    //     isSuccess: isDepositSuccess,
    // } = useContractWrite({ ...depositConfig });

    const { isSuccess: txSuccess } = useWaitForTransaction({
        hash: depositData?.hash,
    });

    const depositSuccess = txSuccess;

    // const handleDeposit = () => {
    //     console.log(textInput.current?.value);
    //     // deposit(textInput.current?.value);
    //     setDepositAmount(textInput.current?.value);
    // };

    return (
        <VStack
            justifyContent="start"
            bg="purple.50"
            rounded="lg"
            p={5}
            as="section"
            h="40vh"
            alignItems="center"
        >
            <Text textAlign="left" fontWeight="bold" w="100%">
                Deposit to lending pool
            </Text>
            <HStack w="100%">
                <InputGroup>
                    <InputLeftAddon
                        pointerEvents="none"
                        children={<EthereumCurrency />}
                    />
                    <Input
                        placeholder="Amount"
                        variant="outline"
                        ref={textInput}
                    />
                </InputGroup>
                <Button onClick={() => approveUSDC()} colorScheme="red">
                    Approve
                </Button>
                <Button onClick={() => handleDeposit()} colorScheme="purple">
                    Deposit
                </Button>
            </HStack>
            <ApproverInfo />
        </VStack>
    );
}

export default Deposit;
