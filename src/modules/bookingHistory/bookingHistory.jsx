import moment from 'moment';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { ACCOUNT_INFO_KEY } from '../../constants/common';
import { fetchAccountInfoAPI } from '../../services/user';
import './index.css'

export default function BookingHistory() {
    const [accountInfo, setAccountInfo] = useState([]);

    useEffect(() => {
        let data = localStorage.getItem(ACCOUNT_INFO_KEY);
        if (data) {
            data = JSON.parse(data);
            setAccountInfo(data);
        }
        else {
            fetchAccountInfo();
        }
    }, []);

    const fetchAccountInfo = async () => {
        let result = await fetchAccountInfoAPI();
        result = result.data.content;
        localStorage.setItem(ACCOUNT_INFO_KEY, JSON.stringify(result));
        setAccountInfo(result);
    }

    const renderBookingHistoryItems = () => {
        return accountInfo.thongTinDatVe?.map((ele, index) => {
            return (
                <div key={index} className="row booking-history-item mb-4">
                    <div className="movie-image col-12 col-md-2">
                        <img src={ele.hinhAnh} alt="booking-item-image" />
                    </div>
                    <div className="movie-info col-12 col-md-10">
                        <h4>{ele.tenPhim}</h4>
                        <h5>{ele.danhSachGhe[0].tenHeThongRap}</h5>
                        <h6>{moment(ele.ngayDat).format("DD/MM/YYYY HH:MM:SS")}</h6>
                        <p>Ticket(s): {
                            ele.danhSachGhe.map((item, idx)=>{
                                return  <span key={idx} className='badge badge-warning mr-2'>{item.tenGhe}</span>
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
