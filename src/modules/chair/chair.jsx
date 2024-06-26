import React, { useState } from 'react';
import './index.scss'

export default function Chair(props) {
    const [isSelected, setIsSelected] = useState(false);

    const populateClass = () =>{
        let defaultClass = 'ghe';

        if (props.item.loaiGhe === 'vip'){
            defaultClass += ' gheVip';
        }

        if (props.item.daDat){
            defaultClass += ' daDat';
        }

        if (isSelected){
            defaultClass += ' dangDat';
        }

        return defaultClass;
    }

    const handleOnclick = () =>{
        props.handleSelect(props.item);
        setIsSelected(!isSelected);
    }

    return (
        <button disabled={props.item.daDat} onClick={() => handleOnclick()} key={props.item.soGhe} className={populateClass()}>{props.item.soGhe}</button>
    )
}
