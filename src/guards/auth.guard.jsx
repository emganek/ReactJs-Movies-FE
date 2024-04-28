import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

export default function AuthGuard() {
    const navigate = useNavigate();
    const reduxState = useSelector(state => ({...state.userReducer}));

    useEffect(()=>{
        if (!reduxState.userInfo){
            navigate('/login');
        }
    })

  return (
    <Outlet /> 
  )
}
