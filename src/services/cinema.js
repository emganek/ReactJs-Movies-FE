import { request } from "../configs/axios"
import { MA_NHOM } from "../constants/common"

export const fetchMovieShowTimeAPI = (maPhim) =>{
    return request({
        url:`theater/showtime?MaPhim=${maPhim}`,
        method: 'GET'
    })
}

export const fetchCinemasAPI = () =>{
    return request({
        url:`theater?maNhom=${MA_NHOM}`,
        method: 'GET'
    })
}

export const fetchLocationAPI = (cinema) =>{
    return request({
        url:`theater/location?maHeThongRap=${cinema}`,
        method: 'GET'
    })
}