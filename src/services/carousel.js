import { request } from "../configs/axios"

export const fetchCarouselImagesAPI = () =>{
    return request({
        url: 'movie/banner',
        method: 'GET',
    })
}