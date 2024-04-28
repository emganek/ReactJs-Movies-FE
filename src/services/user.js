import { request } from "../configs/axios"
import { MA_NHOM } from "../constants/common"

export const loginAPI = (data) =>{
    return request({
        url:'QuanLyNguoiDung/DangNhap',
        method: 'POST',
        data: data,
    })
}

export const registerAPI = (data) =>{
    return request({
        url:'QuanLyNguoiDung/DangKy',
        method:'POST',
        data,
    })
}

export const fetchUserListAPI = (keyword = "") => {
    if (keyword === ""){
        return request({
            url: `QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${MA_NHOM}`,
            method: "GET",
        })
    }
    else{
        return request({
            url: `QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${MA_NHOM}&tuKhoa=${keyword}`,
            method: "GET",
        })
    }
}

export const fetchUserInfoAPI = (taiKhoan) => {
    return request({
        url: `QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`,
        method: "POST",
    })
}

export const updateUserInfoAPI = (data) => {
    return request({
        url: `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        method: "POST",
        data,
    })
}

export const deleteUserAPI = (taiKhoan) => {
    return request({
        url: `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
        method: "DELETE",
    })
}

export const fetchUserTypesAPI = () => {
    return request({
        url: `QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`,
        method: "GET",
    })
}

export const fetchAccountInfoAPI = () => {
    return request({
        url: `QuanLyNguoiDung/ThongTinTaiKhoan`,
        method: "POST",
    })
}


export const updateAccountInfoAPI = (data) => {
    return request({
        url: `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        method: "PUT",
        data,
    })
}