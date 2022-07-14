// [Required Actions]
// request loan
// repay loan
// deposit loan
// withdraw loan
// approve
import { Box } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navigation from '../components/Navigation';
import TopNav from '../components/top-nav';
import Borrow from '../pages/borrow';
import Deposit from '../pages/deposit';

function Layout() {
    const tabs = [
        {
            path: '/deposit',
            name: 'Deposit',
            component: Deposit,
        },
        {
            path: '/borrow',
            name: 'Borrow',
            component: Borrow,
        },
    ];

    return (
        <BrowserRouter>
            <TopNav />
            <Box
                textAlign="center"
                fontSize="xl"
                w={['90%', '85%', '80%']}
                maxW={800}
                mx="auto"
            >
                <Box pt={10} pb={10}>
                    <Navigation />
                </Box>
            </Box>
        </BrowserRouter>
    );
}

export default Layout;
