import React, { useEffect, useState } from 'react';
import { Carousel as CarouselAntd } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import './index.css';
import { fetchCarouselImagesAPI } from '../../services/carousel';

const contentStyle = {
    width: '100%',
    objectFit: 'cover',
    height: '100vh',
};

const SampleNextArrow = props => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{
                ...style,
                color: '#9e9e9e85',
                fontSize: '30px',
                lineHeight: '1',
                right: '0px',
                weight: '50px',
                width: '50px',
            }}
            onClick={onClick}
        >
            <RightOutlined />
        </div>
    )
}

const SamplePrevArrow = props => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{
                ...style,
                color: '#9e9e9e85',
                fontSize: '30px',
                lineHeight: '1',
                left: '0px',
                weight: '50px',
                width: '50px',
                zIndex: '1'
            }}
            onClick={onClick}
        >
            <LeftOutlined />
        </div>
    )
}

var settings = {
    dots: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};

export default function Carousel(props) {
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        fetchCarouselImages();
    }, [])

    const fetchCarouselImages = async () => {
        const result = await fetchCarouselImagesAPI()
        setImageList(result.data.content);
    }
    
    const renderCarousel = () => {
        return imageList.map((ele, index) => {
            return (
                <div key={index}>
                    <img style={contentStyle} src={ele.hinhAnh} alt={index} />
                </div>
            )
        })
    }
    return (
        <CarouselAntd draggable auto {...settings} arrows>
            {renderCarousel()}
        </CarouselAntd>
    )
}
