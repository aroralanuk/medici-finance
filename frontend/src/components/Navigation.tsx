import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Deposit from '../pages/deposit';
import Borrow from '../pages/borrow';
import Approve from '../pages/approve';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
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
    {
        path: '/approve',
        name: 'Approve',
        component: Approve,
    },
];

function Navigation() {
    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    path={route.path}
                    element={<route.component />}
                    key={route.toString()}
                />
            ))}
        </Routes>
    );
}

export default Navigation;
