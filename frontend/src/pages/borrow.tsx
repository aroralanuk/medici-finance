import {
  VStack,
  Text,
} from '@chakra-ui/react';
import BorrowerInfo from '../components/BorrowerInfo';
import { useState } from 'react';

// borrow limit
// amount to pay back
// time limit

/* eslint-disable react/jsx-no-constructed-context-values */
function Borrow() {
  const [borrowLimit, setBorrowLimit] = useState(0);
  const [interest, setInterest] = useState(0);
  const [dueDate, setDueDate] = useState(0);

  return (
    <VStack
      rounded="lg"
      bg="purple.50"
      as="section"
      w="100%"
      p={5}
    >
      <Text
        fontSize="sm"
      >
        {`Borrow Limit ${borrowLimit}`}
      </Text>
      <Text
        fontSize="sm"
      >
        {`Interest ${interest}`}
      </Text>
      <Text
        fontSize="sm"
      >
        {`Due by ${dueDate}`}
      </Text>
      <BorrowerInfo />
    </VStack >
  );
}

export default Borrow;
