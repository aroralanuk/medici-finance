import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";

function Loan({
  loanAmount,
  repayAmount,
}) {
  return (
    <HStack>
      <VStack>
        <Text>
          {`${loanAmount} WETH Open Position`}
        </Text>
        <Text fontSize="sm">
          {`${repayAmount} WETH to repay`}
        </Text>
      </VStack>
      <Button>
        Repay Loan
      </Button>
    </HStack>
  );
}

export default function BorrowerInfo(props) {
  // Keep track of user's open positions 
  const [activeLoans, setActiveLoans] = useState([]);

  return (
    <VStack bg="purple.50" rounded="lg" w="30vw">
      <Text fontSize="lg">
        Borrower Info
      </Text>
      <Box
        bg="teal.50"
        p={2}
      >
        {
          activeLoans.length == 0 ?
            <Text
              color="gray.400"
            >
              No active loan positions open
            </Text>
            :
            <VStack>
              <Box>
                <Text color="#3a243b" fontSize="md" fontWeight="bold">
                  Active Loans
                </Text>
              </Box>
              {activeLoans.map((loan) => (
                <Loan
                  loanAmount={loan.amount}
                  repayAmount={loan.repay}
                />
              ))}
            </VStack>
        }
      </Box>
    </VStack>
  );
}
