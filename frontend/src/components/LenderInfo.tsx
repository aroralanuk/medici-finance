import React, { useState } from 'react';
import {
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react";

export default function LenderInfo(props) {
  const [depositAmt, setDepositAmt] = useState(0);

  return (
    <VStack bg="gray.50" rounded="lg" w="30vw">
      <Heading fontSize="lg">
        Lender Info
      </Heading>
      <Text color="#3a243b" fontSize="md" >
        {`Amount deposited ${depositAmt}`}
      </Text>
    </VStack>
  );
}
