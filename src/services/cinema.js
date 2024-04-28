import { request } from "../configs/axios"
import { MA_NHOM } from "../constants/common"

export const fetchMovieShowTimeAPI = (maPhim) =>{
    return request({
        url:`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
        method: 'GET'
    })
}

export const fetchCinemasAPI = () =>{
    return request({
        url:`QuanLyRap/LayThongTinHeThongRap?maNhom=${MA_NHOM}`,
        method: 'GET'
    })
}

export const fetchLocationAPI = (cinema) =>{
    return request({
        url:`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinema}`,
        method: 'GET'
    })
}