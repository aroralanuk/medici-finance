import React, { useState } from 'react';
import { VStack, Text, Heading } from '@chakra-ui/react';
import { useAccount, useContractRead } from 'wagmi';
import { address, abi } from '../data/data';

// const { data: usdcBalance } = useContractRead(
//   {
//     addressOrName: address,
//     contractInterface: abi,
//   },
//   'getPoolReserves',
// )
//
// const { data: usdcDeposited } = useContractRead(
//   {
//     addressOrName: address,
//     contractInterface: abi,
//   },
//   'approvers',
//   {
//     args: useAccount(),
//   }
// )

export default function ApproverInfo(props) {
    const [depositAmt, setDepositAmt] = useState(0);

    return (
        <VStack bg="gray.50" rounded="lg" w="30vw">
            <Heading fontSize="lg">Lender Info</Heading>
            <Text color="#3a243b" fontSize="md">
                {`USDC balance ${0}`}
            </Text>
            <Text color="#3a243b" fontSize="md">
                {`USDC deposited ${0}`}
            </Text>
        </VStack>
    );
}
