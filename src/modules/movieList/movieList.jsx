import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMovieListAPI } from '../../services/movies';
import "./index.css"
import { Modal } from 'antd';


export default function MovieList() {
    const location = useLocation();
    const myRef = useRef(null);
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [trailerLink, setTrailerLink] = useState("");

    const iframeRef = useRef(null)

    //HANDLE MODAL MOVIE--------------------------------BEGIN
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        iframeRef.current.src = "https://www.youtube.com/embed";
        setTrailerLink("https://www.youtube.com/embed");
    };

    useEffect(() => {
        if (trailerLink !== "https://www.youtube.com/embed" && trailerLink !== "") {
            showModal();
        }
    }, [trailerLink])

    const handleTrailer = (trailer) => {
        setTrailerLink(trailer);
        iframeRef.current.src = trailer;
    }
    //HANDLE MODAL MOVIE--------------------------------END

    useEffect(() => {
        fetchMovieList();
        window.scrollTo(0, 0);
    }, []);

    const fetchMovieList = async () => {
        const movieList = await (await fetchMovieListAPI()).data.content

        if (location.hash === "#movieList") {
            const target = document.getElementById("movieList");
            target.scrollIntoView({ behavior: 'smooth' })
        }

        setMovieList(movieList);
    } 

    const renderNowShowingMovieList = () => {
        return movieList.map((ele, index) => {
            if (ele.dangChieu) {
                return (
                    <div key={ele.maPhim} className="col-md-6 col-lg-3">
                        <div className="card movie-card" style={{ marginBottom: 20, height: 480 }}>
                            <img style={{ height: 350, objectFit: 'cover' }} className="card-img-top" src={ele.hinhAnh} alt="movie" />
                            <div className="card-body">
                                <h5 className="card-title">{ele.tenPhim.length < 30 ? ele.tenPhim : `${ele.tenPhim.substring(0, 30)}...`}</h5>
                                <button onClick={() => handleTrailer(ele.trailer)} className="btn btn-danger">TRAILER</button>
                                <button onClick={() => navigate(`/movie/${ele.maPhim}`)} className="btn btn-info ml-2">DETAIL</button>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    }

    const renderSoonComingMovieList = () => {
        return movieList.map((ele, index) => {
            if (!ele.dangChieu) {
                return (
                    <div key={ele.maPhim} className="col-md-6 col-lg-3">
                        <div className="card movie-card" style={{ marginBottom: 20, height: 480 }}>
                            <img style={{ height: 350, objectFit: 'cover' }} className="card-img-top" src={ele.hinhAnh} alt="movie" />
                            <div className="card-body">
                                <h5 className="card-title">{ele.tenPhim.length < 30 ? ele.tenPhim : `${ele.tenPhim.substring(1, 30)}...`}</h5>
                                <button onClick={() => handleTrailer(ele.trailer)} className="btn btn-danger">TRAILER</button>
                                <button onClick={() => navigate(`/movie/${ele.maPhim}`)} className="btn btn-info ml-2">DETAIL</button>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    }

    return (
        <div id="movieList">
            <ul className="nav nav-pills justify-content-center align-items-center py-5">
                <li><a className="active" data-toggle="pill" href="#nowShowing">Now Showing</a></li>
                <li><a data-toggle="pill" href="#soonComing">Soon Coming</a></li>
            </ul>
            <div className="tab-content">
                <div id="nowShowing" className="tab-pane fade in active show mx-auto w-75">
                    <div className="row">
                        {renderNowShowingMovieList()}
                    </div>
                </div>
                <div id="soonComing" className="tab-pane fade mx-auto w-75">
                    <div className="row">
                        {renderSoonComingMovieList()}
                    </div>
                </div>
            </div>
            <Modal className="movieListModal" closeIcon={<img src="/assets/images/close.png" alt="close" />} footer={null} title="Basic Modal" width="50%" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <iframe title='modalTrailer' ref={iframeRef} width="100%" height="550px" src={trailerLink} frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </Modal>
        </div>
    )
}
