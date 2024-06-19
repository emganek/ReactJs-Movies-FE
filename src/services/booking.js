import { request } from "../configs/axios"

export const fetchRoomListAPI = (maLichChieu) =>{
    return request({
        url:`theater/booking?MaLichChieu=${maLichChieu}`,
        method: 'GET',
    })
}

export const bookingTicketAPI = (data) =>{
    return request({
        url:`theater/booking`,
        method:'POST',
        data,
    })
}