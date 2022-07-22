import { useContractWrite } from 'wagmi';

import MediciPoolABI from './abi/MediciPool.abi.json';

export function useDeposit(numberOfTokens) {
    const { data, isError, isLoading, write } = useContractWrite({
        addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        contractInterface: MediciPoolABI.abi,
        functionName: 'deposit',
    });

    return { data, isError, isLoading, write };
}
