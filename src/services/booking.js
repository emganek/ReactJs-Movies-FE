import { request } from "../configs/axios"

export const fetchRoomListAPI = (maLichChieu) =>{
    return request({
        url:`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
        method: 'GET',
    })
}

export const bookingTicketAPI = (data) =>{
    return request({
        url:`QuanLyDatVe/DatVe`,
        method:'POST',
        data,
    })
}