import moment from 'moment';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { ACCOUNT_INFO_KEY } from '../../constants/common';
import { fetchBookedMoviesAPI } from '../../services/user';
import './index.css'

export default function BookingHistory() {
    const [bookedMovies, setAccountInfo] = useState([]);

    useEffect(() => {
        fetchBookedMovies();
    }, []);

    const fetchBookedMovies = async () => {
        let result = await fetchBookedMoviesAPI();
        result = result.data.content;
        setAccountInfo(result);
    }

    const renderBookingHistoryItems = () => {
        return bookedMovies?.map((ele, index) => {
            return (
                <div key={index} className="row booking-history-item mb-4">
                    <div className="movie-image col-12 col-md-2">
                        <img src={ele.phim.hinhAnh} alt="booking-item-image" />
                    </div>
                    <div className="movie-info col-12 col-md-10">
                        <h4>{ele.phim.tenPhim}</h4>
                        <h5>{ele.danhSachChoNgoi[0].tenHeThongRap}</h5>
                        <h6>{moment(ele.ngayChieuGioChieu).format("DD/MM/YYYY HH:MM:SS")}</h6>
                        <p>Ticket(s): {
                            ele.danhSachChoNgoi.map((item, idx)=>{
                                return  <span key={idx} className='badge badge-warning mr-2'>{item.soGhe}</span>
                            })
                        }</p>
                    </div>
                </div>
            )
        })
    }
    return (
        <div id="booking-history-wrapper">
            {renderBookingHistoryItems()}
        </div>
    )
}
