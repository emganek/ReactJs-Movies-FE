// import axios from "axios";
import { request } from "../configs/axios";
import { MA_NHOM } from "../constants/common";

export const fetchMovieListAPI = (keyword = "") => {
    if (keyword === ""){
        return request({
            url: `movie?maNhom=${MA_NHOM}`,
            method: "GET",
        })
    }
    else{
        return request({
            url: `movie?tenPhim=${keyword}`,
            method: "GET",
        })
    }
}

export const fetchMovieDetailAPI = (maPhim) => {
    return request({
        url: `movie/detail?MaPhim=${maPhim}`,
        method: "GET",
    })
}

export const uploadNewMovieAPI = (data) => {
    return request({
        url: `movie`,
        method: "PUT",
        data,
    })
}

export const updateMovieAPI = (data) => {
    return request({
        url: `movie`,
        method: "POST",
        data,
    })
}

export const deleteMovieAPI = (id) => {
    return request({
        url: `movie?id=${id}`,
        method: "DELETE",
    })
}

export const createSessionAPI = (id) => {
    return request({
        url: `create-session`,
        method: "GET",
    })
}