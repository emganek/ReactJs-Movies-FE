import { notification } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { bookingTicketAPI, fetchRoomListAPI } from '../../services/booking';
import Chair from '../chair/chair';
import './index.css';

export default function Booking() {
    const params = useParams().maLichChieu;
    const navigate = useNavigate();
    const [roomList, setRoomList] = useState({});
    const [selectedChairList, setSelectedChairList] = useState([]);

    useEffect(() => {
        fetchRoomList();
    }, []);

    const fetchRoomList = async () => {
        const data = await (await fetchRoomListAPI(params)).data.content;
        setRoomList(data);
    }

    const handleSelect = (selectedChair) => {
        let tempList = [...selectedChairList];

        const index = tempList.findIndex(ele => ele.soGhe === selectedChair.soGhe);

        if (index === -1) {
            tempList = [...tempList, selectedChair]
        }
        else {
            tempList.splice(index, 1)
        }
        setSelectedChairList(tempList)
    }

    const calTotalPrice = () => {
        return selectedChairList.reduce((total, value) => {
            return total += value.giaVe;
        }, 0)

    }

    const handleBookingTicket = async () => {
        const danhSachVe = selectedChairList.map(ele => {
            return (
                {
                    soGhe: ele.soGhe,
                    giaVe: ele.giaVe,
                }
            )
        });

        const data = {
            "maLichChieu": roomList.id,
            "danhSachVe": danhSachVe,
        }

        try {
            await bookingTicketAPI(data);
            navigate('/home');
            notification.success({
                message: "Booking success"
            })
        } catch (error) {
            notification.error({
                message: "Booking failed"
            })
        }
    }

    return Object.keys(roomList).length !== 0 ?
        (
            <section id='booking-ticket'>
                <div className="booking-ticket-wrapper">
                    <div className="row w-75 mx-auto my-5">
                        <div className="col-md-4 cinema-info">
                            <img className="img-fluid" src={roomList.phim.hinhAnh} alt="alt" />
                            <h4>{roomList.phim.tenPhim}</h4>
                            <h5><span>Cinemas: </span>{roomList.rap.tenCumRap} </h5>
                            <h6><span>Room: </span> {roomList.rap.tenRap}</h6>
                            <p><span>Selected chairs:</span> {selectedChairList.map((ele) => {
                                return <span key={ele.soGhe} className="badge badge-warning mr-2">{ele.soGhe}</span>
                            })}</p>
                            <p>Total price:
                                <span> {calTotalPrice().toLocaleString()}</span>
                                <span> VND</span>
                            </p>
                            <button onClick={() => handleBookingTicket()} className="btn btn-danger font-weight-bold text-white">Purchase</button>
                        </div>
                        <div className="mt-5 mt-md-0 col-md-8 ds-ghe-wrapper">
                            <div className='ghe-type d-flex mb-4'>
                                <h4>Types of chair:</h4>
                                <div className='d-flex align-items-center mt-2'>
                                    <button disabled className='ghe-sample mr-4'></button>
                                    <span>Normal chair</span>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <button disabled className='ghe-sample gheVip mr-4'></button>
                                    <span>Vip chair</span>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <button disabled className='ghe-sample daDat mr-4'></button>
                                    <span>Selected chair</span>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <button disabled className='ghe-sample dangDat mr-4'></button>
                                    <span>Selecting chair</span>
                                </div>
                            </div>
                            <div className="ds-ghe">
                                {
                                    roomList.danhSachChoNgoi.map((ele, index) => {
                                        return (
                                            <React.Fragment key={ele.soGhe}>
                                                <Chair handleSelect={handleSelect} item={ele} />
                                                {(index + 1) % 16 === 0 && <br />}
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        ) :
        (
            <div>Loading</div>
        )
}

