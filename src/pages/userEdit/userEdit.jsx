import {
    Button,
    Form,
    Input,
    InputNumber,
    notification,
    Radio,
    Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MA_NHOM } from '../../constants/common';
import { fetchUserInfoAPI, fetchUserTypesAPI, updateUserInfoAPI } from '../../services/user';

export default function UserEdit(props) {
    const params = useParams().taiKhoan;
    const navigate = useNavigate();

    //FORM CONFIG------------------------------------------BEGIN
    const [form] = Form.useForm();
    const [componentSize, setComponentSize] = useState('default');
    const [state, setState] = useState([])

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    //FORM CONFIG------------------------------------------END

    useEffect(() => {
        fetchUserInfo();
        fetchUserTypes();
    }, []);

    const fetchUserInfo = async () => {
        const templateData = {
            taiKhoan: " ",
            matKhau: " ",
            hoTen: " ",
            email: " ",
            soDT: " ",
            maLoaiNguoiDung: " ",
        }

        let result = await fetchUserInfoAPI(params);
        result = result.data.content;

        for (let key in templateData) {
            form.setFieldsValue({
                [key]: result[key],
            });
        }
    }

    const fetchUserTypes = async () => {
        let result = await fetchUserTypesAPI();
        setState(result.data.content)
    }
    //HANLE ACTION CỦA FORM------------------------------------------BEGIN

    const handleSubmit = async (evt) => {
        let data = {...evt, maNhom: MA_NHOM};
        delete data.size;

        try {
            await updateUserInfoAPI(data);
            notification.success({ message: "User information is updated successfully" });
            navigate("/admin/user-management");
        } catch (error) {
            notification.error({
                message: "Fail to update user infomation!",
                description: error.response.data.content,
            })
        }
    }
    //HANLE ACTION CỦA FORM------------------------------------------END

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

            <Form.Item label="Username" name="taiKhoan">
                <Input disabled name='taiKhoan' />
            </Form.Item>
            <Form.Item label="Password" name="matKhau" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input name='matKhau' />
            </Form.Item>
            <Form.Item label="Fullname" name="hoTen" rules={[{ required: true, message: 'Please input your Fullname!' }]}>
                <Input name='hoTen' />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
                <Input name='email' />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please input your Price!' }]} name="soDT" label="Phone Number">
                <InputNumber style={{ width: '100%' }} name='giaVe' />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please input your Type of user!' }]} name="maLoaiNguoiDung" label="Type of user">
                <Select options={state.map(ele => ({ label: ele.tenLoai, value: ele.maLoaiNguoiDung }))} />
            </Form.Item>
            <Form.Item colon={false} label=" ">
                <Button type='primary' htmlType='submit'>Update</Button>
            </Form.Item>
        </Form>
    );
}
