import { request } from "../configs/axios"

export const fetchCarouselImagesAPI = () =>{
    return request({
        url: 'QuanLyPhim/LayDanhSachBanner',
        method: 'GET',
    })
}