import {
    Button,
    DatePicker,
    Form,
    InputNumber,
    notification,
    Radio,
    Select,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCinemasAPI, fetchLocationAPI } from '../../services/cinema';
import { postScheduleAPI } from '../../services/schedule';

export default function MovieSchedule() {
    const params = useParams().movieID;
    const [state, setState] = useState({
        cinemas: [],
        location: [],
    });

    useEffect(()=>{
        fetchCinemas()
    },[]);

    const fetchCinemas = async () =>{
        const result = await fetchCinemasAPI();
        setState({
            ...state,
            cinemas: result.data.content,
        })
    }
    //FORM CONFIG------------------------------------------BEGIN
    const [form] = Form.useForm();
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    //FORM CONFIG------------------------------------------END

    //HANLE ACTION CỦA FORM------------------------------------------BEGIN
    const handleSubmit = async (evt) => {
        let data = {
            maPhim: params,
            ngayChieuGioChieu: "",
            maRap: 0,
            giaVe: 0,
        }

        data = {...data, maRap:evt.maRap, giaVe:evt.giaVe, ngayChieuGioChieu:moment(evt.ngayChieuGioChieu).format("DD/MM/YYYY HH:MM:SS")};

        console.log(data)

        try {
            await postScheduleAPI(data);
            notification.success({ message: "Add new schedule successfully" });
            form.resetFields();
        } catch (error) {
            console.log(error);
            notification.error({
                message: "Fail to add new schedule!",
                description: error.response.data.content,
            })
        }
    }

    const handleCinemasChange = async (evt) =>{
        const result = await fetchLocationAPI(evt);

        setState({
            ...state,
            location: result.data.content,
        })
    }
        //HANLE ACTION CỦA FORM------------------------------------------END

    return (
        <Form
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 8,
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


            <Form.Item label="Cinemas">
                <Select defaultValue="Please choose your option" options={state.cinemas.map(ele => ({label:ele.maHeThongRap, value:ele.maHeThongRap}))} onChange={handleCinemasChange}/>
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please input your Price!' }]} name="maRap" label="Location">
                <Select  options={state.location.map(ele => ({label:ele.tenCumRap, value:ele.maCumRap}))} />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please input your Price!' }]} name="ngayChieGioChieu" label="Schedule">
                <DatePicker showTime />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please input your Price!' }]} name="giaVe" label="Price">
                <InputNumber min={75000} max={150000} name='giaVe' />
            </Form.Item>
            <Form.Item colon={false} label=" ">
                <Button type='primary' htmlType='submit'>Submit</Button>
            </Form.Item>
        </Form>
    );
}
