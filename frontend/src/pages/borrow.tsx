import {
  VStack,
  Text,
  Box,
} from '@chakra-ui/react';
import BorrowerInfo from '../components/BorrowerInfo';
import worldId from "@worldcoin/id";
import { useState, useEffect } from 'react';

// borrow limit
// amount to pay back
// time limit
const BorrowDashboard = (
) => {
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
        {`Borrow Limit ${0}`}
      </Text>
      <Text
        fontSize="sm"
      >
        {`Interest ${0}`}
      </Text>
      <Text
        fontSize="sm"
      >
        {`Due by ${0}`}
      </Text>
      <BorrowerInfo />
    </VStack >
  );
}

const WorldCoinButton: React.FC = () => {
  return (
    <VStack
      width="100%"
      spacing={5}
    >
      <Text
        fontWeight="bold"
      >
        Sign in with World Coin to borrow
      </Text>
      <Box
        id="world-coin-button"
      ></Box>
    </VStack >
  );
}

/* eslint-disable react/jsx-no-constructed-context-values */
function Borrow() {
  const [borrowLimit, setBorrowLimit] = useState(0);
  const [interest, setInterest] = useState(0);
  const [dueDate, setDueDate] = useState();

  useEffect(() => {
    const setUpWorldId = async () => {
      if (!worldId.isInitialized()) {
        worldId.init("world-coin-button", {
          enable_telemetry: true,
          action_id: "wid_lshSNnaJfdt6Sohu6YAA",
          signal: "my-user-id-1",
          app_name: "My App",
          signal_description: "Lenders",
        });
      }
      if (!worldId.isEnabled()) {
        await worldId.enable();
      }
    }

    setUpWorldId();
  });

  return (
    <>
      {
        worldId.isEnabled() ?
          <BorrowDashboard />
          :
          <WorldCoinButton />
      }
    </>
  );
}

export default Borrow;
