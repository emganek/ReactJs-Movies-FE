import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { notification } from 'antd';

export default function AdminGuard() {
    const navigate = useNavigate();
    const reduxState = useSelector(state => ({ ...state.userReducer }));

    useEffect(() => {
        if (!reduxState.userInfo) {
            return navigate('/login');
        }

        if (reduxState.userInfo && reduxState.userInfo.maLoaiNguoiDung !== 'QuanTri') {
            notification.error({
                message: 'You do not have permission to access Admin Page!',
            });
            return navigate('/');
        }
    }, [])

    return <Outlet />
}
