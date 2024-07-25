import { request } from "../configs/axios"
import { MA_NHOM } from "../constants/common"

export const loginAPI = (data) =>{
    return request({
        url:'/auth/login',
        method: 'POST',
        data: data,
    })
}

export const logoutAPI = (data = {}) =>{
    return request({
        url:'/auth/logout',
        method: 'POST',
        data: data,
    })
}

export const refreshTokenAPI = (data) =>{
    return request({
        url:'/auth/refresh-token',
        method: 'POST',
        data: data,
    })
}

export const registerAPI = (data) =>{
    return request({
        url:'user/register',
        method:'POST',
        data,
    })
}

export const fetchUserListAPI = (keyword = "") => {
    if (keyword === ""){
        return request({
            url: `user-management`,
            method: "GET",
        })
    }
    else{
        return request({
            url: `user-management?fullName=${keyword}`,
            method: "GET",
        })
    }
}

export const fetchUserInfoAPI = (taiKhoan) => {
    return request({
        url: `user-management/account-info?taiKhoan=${taiKhoan}`,
        method: "GET",
    })
}

export const updateUserInfoAPI = (taiKhoan, data) => {
    return request({
        url: `user-management/account-info`,
        method: "PUT",
        data,
    })
}

export const deleteUserAPI = (taiKhoan) => {
    return request({
        url: `user-management/account-info?taiKhoan=${taiKhoan}`,
        method: "DELETE",
    })
}

export const fetchUserTypesAPI = () => {
    return request({
        url: `user/roles`,
        method: "GET",
    })
}

export const fetchAccountInfoAPI = () => {
    return request({
        url: `user/account-info`,
        method: "GET",
    })
}

export const fetchBookedMoviesAPI = () => {
    return request({
        url: `user/booked-movies`,
        method: "GET",
    })
}


export const updateAccountInfoAPI = (data) => {
    return request({
        url: `user/account-info`,
        method: "PUT",
        data,
    })
}