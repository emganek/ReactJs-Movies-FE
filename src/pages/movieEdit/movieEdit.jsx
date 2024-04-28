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
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MA_NHOM } from '../../constants/common';
import { fetchMovieDetaiAPI, updateMovieAPI } from '../../services/movies';

export default function MovieEdit() {
    const params = useParams().movieID;
    const navigate = useNavigate();
    const [image, setImage] = useState("");


    //FORM CONFIG------------------------------------------BEGIN
    const [form] = Form.useForm();
    const [componentSize, setComponentSize] = useState('default');
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
        maPhim: '',
    })

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
        //FORM CONFIG------------------------------------------END
    //FORM CONFIG------------------------------------------END

    useEffect(() => {
        fetchMovieDetail();
    }, []);

    const fetchMovieDetail = async () => {
        let result = await fetchMovieDetaiAPI(params);
        result = result.data.content;
        let newState = { ...state };

        for (let key in state) {
            if (key === "ngayKhoiChieu") {
                form.setFieldsValue({
                    [key]: moment(result[key]),
                });
                newState = { ...newState, [key]: moment(result[key]).format("DD/MM/YYYY") };
            }
            else if (key === "hinhAnh") {
                setImage(result[key]);
                newState = { ...newState, [key]: null };
            }
            else {
                form.setFieldsValue({
                    [key]: result[key],
                });
                newState = { ...newState, [key]: result[key] };
            }
        }

        setState(newState)
    }

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
                if (state.hinhAnh !== null) {
                    formData.append('File', state.hinhAnh, state.hinhAnh.name)
                }
            }
        }

        try {
            await updateMovieAPI(formData);
            notification.success({ message: "Movie is updated successfully" });
            navigate("/admin/movie-management");
        } catch (error) {
            notification.error({
                message: "Update movie fail!",
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
            form={form}
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
            <Form.Item name='dangChieu' label="Now showing" valuePropName="checked">
                <Switch onChange={handleSwitchChange} checked={false} name='dangChieu' />
            </Form.Item>
            <Form.Item name='sapChieu' label="Soon coming" valuePropName="checked">
                <Switch onChange={handleSwitchChange} name='sapChieu' />
            </Form.Item>
            <Form.Item name='hot' label="Hot" valuePropName="checked">
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
                <Button type='primary' htmlType='submit'>Update</Button>
            </Form.Item>
        </Form>
    );
}

