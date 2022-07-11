import { FC } from 'react';
import {
    getDefaultWallets,
    RainbowKitProvider,
    lightTheme,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider } from '@chakra-ui/react';
import { alchemyId } from './data/data';
import Layout from './layouts/layout';

const { chains, provider } = configureChains(
    [chain.polygonMumbai],
    [alchemyProvider({ alchemyId }), publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

export const App: FC = () => {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
                chains={chains}
                theme={lightTheme({
                    accentColor: '#7b3fe4',
                    accentColorForeground: 'white',
                    borderRadius: 'medium',
                })}
            >
                <ChakraProvider>
                    <Layout />
                </ChakraProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
};
