import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { fetchMovieShowTimeAPI } from '../../services/cinema';
import moment from 'moment';
import './index.css'

export default function ShowTime() {
    const params = useParams().movieID;

    const [showTime, setShowTime] = useState({});
    useEffect(() => {
        fetchMovieShowTime();
    }, []);

    const fetchMovieShowTime = async () => {
        console.log('fetchMovieShowTime');
        // const data = await (await fetchMovieShowTimeAPI(params))?.data?.content;
        fetchMovieShowTimeAPI(params)
        .then(
         (data) => {
            console.log('fetchMoviesShowTimeAPI success', data);
            data && setShowTime(data)
         }
        )
        .catch(
            (error) => {
                console.log('fetchMoviesShowTimeAPI fail', error)
            }
        )
        // data && setShowTime(data);
    };

    const renderTabs = () => {
        return showTime?.heThongRapChieu?.map((ele, index) => {
            return (
                <img src={ele.logo} key={ele.maHeThongRap} className={`nav-link rounded ${index === 0 && 'active'}`} data-toggle="pill" href={`#${ele.maHeThongRap}`} role="tab" aria-selected="false" />
            )
        })
            ;
    }

    const renderContent = () => {
        return showTime?.heThongRapChieu?.map((ele, index) => {
            return (
                <div key={ele.maHeThongRap} className={`tab-pane fade show ${index === 0 && 'active'}`} id={`${ele.maHeThongRap}`} role="tabpanel">
                    {
                        ele.heThongRap.filter(item => item.suatChieu.length).map((item) => {
                            return (
                                <div key={item.maRap} className="row mb-5">
                                    <div className="col-3 col-md-2 mb-3">
                                        <img className="img-fluid rounded" src={item?.hinhAnh} />
                                    </div>
                                    <div className="rap-info col-9 col-md-10 pl-0 mb-3">
                                        <h5>{item.tenRap}</h5>
                                        <span>{item.diaChi}</span>
                                    </div>
                                    <div className='col-3 col-md-0'></div>
                                    <div className="col-9 col-md-12 pl-0">
                                        <div className="row">
                                            {
                                                item.suatChieu.map(schedule => {
                                                    return (
                                                        <div key={schedule.id} className="col-md-4 mb-2">

                                                            <Link to={`/booking/${schedule.id}`} >
                                                                {moment(schedule.ngayChieuGioChieu).format('LLL')}</Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        })
    }

    return (
        <div className="row">
            <div className="col-md-3">
                <div className="nav d-flex nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    {showTime ? renderTabs() : ''}
                </div>
            </div>
            <div className="col-md-9 mt-4">
                <div className="tab-content" id="v-pills-tabContent">
                    {showTime ? renderContent() : ''}
                </div>
            </div>
        </div>
    )
}
