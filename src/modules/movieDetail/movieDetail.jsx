import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchMovieDetaiAPI } from '../../services/movies';
import './index.css';
import moment from 'moment';

export default function MovieDetail() {
    const params = useParams().movieID;

    const [movieDetail, setMovieDetail] = useState({});

    useEffect(()=>{
        fetchMovieDetail();
    },[]);

    const fetchMovieDetail = async () =>{
        const data = await (await fetchMovieDetaiAPI(params)).data.content;
        setMovieDetail(data)
    }

    return (
        <div className="row">
            <div className="col-md-3">
                <img className="w-100" src={movieDetail.hinhAnh} alt='alt' />
            </div>
            <div className="col-md-9 mt-4 mt-md-0">
                <h3 className='movie-detail-tenPhim font-weight-bold'>{movieDetail.tenPhim}</h3>
                <p className='movie-detail-moTa'>{movieDetail.moTa}</p>
                <p className='movie-detail-ngayKhoiChieu'><span className='font-weight-bold'>Release day:</span> {moment(movieDetail.ngayKhoiChieu).format('LLL')}</p>
            </div>
        </div>
    )
}
