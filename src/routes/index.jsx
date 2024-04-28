import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom';
import AuthGuard from '../guards/auth.guard';
import NoAuthGaurd from '../guards/no-auth.guard';
import AdminLayout from '../layouts/admin';
import HomeLayout from '../layouts/home';
import Booking from '../modules/booking/booking';
import HomePage from '../pages/home/home';
import Login from '../pages/login/login';
import MovieManagement from '../pages/movieManagement/movieManagement';
import MovieDetailPage from '../pages/movieDetail/movieDetail';
import AdminGuard from '../guards/admin.guard';
import RegisterPage from '../pages/register/register';
import UserManagement from '../pages/userManagement/userManagement';
import MovieAdd from '../pages/movieAdd/movieAdd';
import MovieEdit from '../pages/movieEdit/movieEdit';
import MovieSchedule from '../pages/movieSchedule/movieSchedule';
import UserEdit from '../pages/userEdit/userEdit';
import AccountInfoPage from '../pages/accountInfo/accountInfo';

export default function Router() {
    const routing = useRoutes([
        {
            path: '/',
            element: <HomeLayout />,
            children: [
                {
                    path: '/',
                    element: <HomePage />,
                },
                {
                    path: '/home',
                    element: <HomePage />,
                },
                {
                    path: '/movie/:movieID',
                    element: <MovieDetailPage />,
                },
                {
                    path: '/',
                    element: <NoAuthGaurd />,
                    children: [
                        {
                            path: '/login',
                            element: <Login />,
                        },
                        {
                            path: '/register',
                            element: <RegisterPage />,
                        },
                    ]
                },
                {
                    path: '/',
                    element: <AuthGuard />,
                    children: [
                        {
                            path: '/booking/:maLichChieu',
                            element: <Booking />,
                        },
                        {
                            path: '/account-info',
                            element: <AccountInfoPage />,
                        },
                    ]
                },
            ],
        },
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    path: '/admin',
                    element: <AdminGuard />,
                    children: [
                        {
                            path: '/admin/movie-management',
                            element: <MovieManagement />,
                        },
                        {
                            path: '/admin/user-management',
                            element: <UserManagement />,
                        },
                        {
                            path: '/admin/movie-add',
                            element: <MovieAdd />,
                        },
                        {
                            path: '/admin/movie-edit/:movieID',
                            element: <MovieEdit />,
                        },
                        {
                            path: '/admin/movie-schedule/:movieID',
                            element: <MovieSchedule />,
                        },
                        {
                            path: '/admin/user-management',
                            element: <UserManagement />,
                        },
                        {
                            path: '/admin/user-edit/:taiKhoan',
                            element: <UserEdit />,
                        },
                    ]
                },
            ],
        },
        {
            path: '*',
            element: <Navigate  to='/home' />,
        },
    ])

    return routing
}
