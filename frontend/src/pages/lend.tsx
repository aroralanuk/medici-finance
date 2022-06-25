import {
  Center,
  Text,
  Input,
  VStack,
  HStack,
  Button,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import LenderInfo from '../components/LenderInfo';
import { AiOutlineMenu as EthereumCurrency } from 'react-icons/ai';

/* eslint-disable react/jsx-no-constructed-context-values */
function Lend() {

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
      <Text
        textAlign="left"
        fontWeight="bold"
        w="100%"
      >
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
          />
        </InputGroup>
        <Button
          onClick={() => { }}
          colorScheme='purple'
        >
          Deposit
        </Button>
      </HStack>
      <LenderInfo />
    </VStack >
  );
}

export default Lend;
