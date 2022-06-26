import { FC } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo from './Logo';
import {
  Flex,
  HStack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink as RouterNavLink } from 'react-router-dom';

function NavLink({
  name,
  path,
  onClose,
}) {
  return (
    <Link
      as={RouterNavLink}
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.900'),
      }}
      _activeLink={{
        color: useColorModeValue('blue.500', 'blue.200'),
      }}
      onClick={() => onClose()}
      to={path}
    >
      {name}
    </Link>
  );
}

const TopNav: FC = () => {
  const routes = [
    { name: 'Home', path: '/' },
    { name: 'Lend', path: '/lend' },
    { name: 'Borrow', path: '/borrow' },
    { name: 'Approve', path: '/approve' },
  ];

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      w="100%"
      mb={3}
      p={3}
      bg="gray.100"
    >
      <Logo />
      <HStack justifyContent="center" flexBasis="30%">
        {routes.map((route) => (
          <NavLink
            key={route.toString()}
            name={route.name}
            path={route.path}
            onClose={() => { }}
          />
        ))}
      </HStack>
      <ConnectButton accountStatus="address" />
    </Flex>
  );
}

export default TopNav;
