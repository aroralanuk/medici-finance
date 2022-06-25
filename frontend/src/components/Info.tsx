import { FC, useState, useEffect } from 'react';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { useContract } from 'wagmi';
import { Box } from "@chakra-ui/react";
require('dotenv').config();

export const Info: FC = () => {
  const [liquidity, setLiquidity] = useState();

  const alchemyId = process.env.ALCHEMY_ID;

  const contract = useContract({
    addressOrName: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    contractInterface: [
      '',
    ],
  });

  useEffect(() => {

  }, []);

  return (
    <Box rounded="lg">
    </Box>
  );
}
