// [Required Actions]
// request loan
// repay loan
// deposit loan
// withdraw loan
// approve
import { BrowserRouter } from 'react-router-dom';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
} from '@chakra-ui/react';
import TopNav from '../components/top-nav';
import Navigation from '../components/Navigation';
import Lend from '../pages/lend';
import Borrow from '../pages/borrow';

function Layout() {

  const tabs = [
    {
      path: '/lend',
      name: 'Lend',
      component: Lend,
    },
    {
      path: '/borrow',
      name: 'Borrow',
      component: Borrow,
    },
  ]

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
    </BrowserRouter >
  );
}

export default Layout;
