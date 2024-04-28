import { request } from "../configs/axios"

export const postScheduleAPI = (data) =>{
    return request({
        url:`QuanLyDatVe/TaoLichChieu`,
        method:'POST',
        data,
    })
}