import {
    Button,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMenu as EthereumCurrency } from 'react-icons/ai';

import ApproverInfo from '../components/ApproverInfo';
import MediciPool from '../sdk/MediciPool';

function Deposit() {
    const handleDeposit = (event: SyntheticEvent) => {
        MediciPool.deposit(Number(event.currentTarget.value));
    };

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
                    <Input placeholder="Amount" variant="outline" />
                </InputGroup>
                <Button onClick={() => handleDeposit()} colorScheme="purple">
                    Deposit
                </Button>
            </HStack>
            <ApproverInfo />
        </VStack>
    );
}

export default Deposit;
