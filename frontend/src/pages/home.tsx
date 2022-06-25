import {
  Text,
  Center,
  Button,
  HStack,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

/* eslint-disable react/jsx-no-constructed-context-values */
function Home() {
  const [liquidity, setLiquidity] = useState(0);
  const [loans, setLoans] = useState(0);

  return (
    <VStack>
      <Heading>
        Protocol Statistics
      </Heading>
      <Text
      >
        {`Total Pool Liquidity ${liquidity} WETH`}
      </Text>
      <Text
      >
        {`${loans} Active Loans`}
      </Text>
    </VStack>
  );
}

export default Home;
