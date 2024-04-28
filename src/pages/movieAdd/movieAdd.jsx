import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    notification,
    Radio,
    Switch,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { MA_NHOM } from '../../constants/common';
import { uploadNewMovieAPI } from '../../services/movies';
import './index.css';

export default function MovieAdd() {
    const [componentSize, setComponentSize] = useState('default');
    const [image, setImage] = useState("");
    const [state, setState] = useState({
        tenPhim: '',
        trailer: '',
        moTa: '',
        ngayKhoiChieu: '',
        dangChieu: false,
        sapChieu: false,
        hot: false,
        danhGia: 0,
        hinhAnh: {},
        maNhom: MA_NHOM,
    })

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };


    //HANLE ACTION CỦA FORM------------------------------------------BEGIN
    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = async (evt) => {
        let formData = new FormData();

        for (let key in state) {
            if (key !== "hinhAnh") {
                formData.append(key, state[key])
            }
            else {
                formData.append('File', state.hinhAnh, state.hinhAnh.name)
            }
        }

        try {
            const result = await uploadNewMovieAPI(formData);
            notification.success({ message: "New movie is uploaded successfully" })
        } catch (error) {
            console.log(error);
            notification.error({
                message: "Upload new movie fail!",
                description: error.response.data.content,
            })
        }
    }

    const handleChangeReleaseDate = (date, dateString) => {
        let data = ""
        if (dateString) {
            data = moment(dateString).format('DD/MM/YYYY');
        }
        setState({ ...state, ngayKhoiChieu: data });
    };
    const handleSwitchChange = (value, evt) => {
        const name = evt.target.name;
        setState({ ...state, [name]: value });
    }

    const handleImageChange = (evt) => {
        const file = evt.target.files[0];
        setState({ ...state, hinhAnh: file });
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImage(e.target.result);
            }
            setState({ ...state, hinhAnh: file });
        }
        else {
            setState({ ...state, hinhAnh: {} });
            setImage({});
        }
    }

    return (
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}

            onFinish={handleSubmit}
        >
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please input your Movie Name!' }]} label="Movie Name" name="tenPhim">
                <Input onChange={handleInputChange} name='tenPhim' />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please input your Trailer link!' }]} name="trailer" label="Trailer link">
                <Input onChange={handleInputChange} name='trailer' />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please input your Description!' }]} name="moTa" label="Description">
                <Input onChange={handleInputChange} name='moTa' />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please choose a date!' }]} name="ngayKhoiChieu" label="Release Date">
                <DatePicker onChange={handleChangeReleaseDate} name='ngayKhoiChieu' />
            </Form.Item>
            <Form.Item label="Now showing" valuePropName="checked">
                <Switch onChange={handleSwitchChange} name='dangChieu' />
            </Form.Item>
            <Form.Item label="Soon coming" valuePropName="checked">
                <Switch onChange={handleSwitchChange} name='sapChieu' />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleSwitchChange} name='hot' />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please input your Rating!' }]} name="danhGia" label="Rating">
                <InputNumber min={1} max={10} name='danhGia' onChangeCapture={handleInputChange} />
            </Form.Item>
            <Form.Item label="Image">
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Item>
            {
                Object.keys(image).length !== 0 && <Form.Item colon={false} label=" ">
                    <img className='chosen-image' src={image} alt="# " />
                </Form.Item>
            }
            <Form.Item colon={false} label=" ">
                <Button type='primary' htmlType='submit'>Submit</Button>
            </Form.Item>
        </Form>
    );
}

