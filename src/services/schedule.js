import { request } from "../configs/axios"

export const postScheduleAPI = (data) =>{
    return request({
        url:`theater/schedule`,
        method:'POST',
        data,
    })
}