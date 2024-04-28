import {
    Button,
    Form,
    Input,
    InputNumber,
    notification,
    Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ACCOUNT_INFO_KEY, MA_NHOM } from '../../constants/common';
import { fetchAccountInfoAPI, fetchUserTypesAPI, updateAccountInfoAPI } from '../../services/user';

export default function AccountInfo() {
    const params = useParams().taiKhoan;
    const [isEditing, setIsEditing] = useState(false);

    //FORM CONFIG------------------------------------------BEGIN
    const [form] = Form.useForm();
    const [typesUser, setTypesUser] = useState([])

    const renderButton = () => {
        if (isEditing) {
            return (
                <>
                    <Button type='primary' htmlType='submit'>Update</Button>
                    <Button onClick={handleCancelEdit} type='danger' className='ml-3'>Cancel</Button>
                </>
            )
        }
        else {
            return <Button onClick={handleEdit} type='primary'>Edit</Button>
        }
    }

    //FORM CONFIG------------------------------------------END

    useEffect(() => {
        fetchAccountInfo();
        fetchUserTypes();
    }, []);

    const fetchAccountInfo = async () => {
        const templateData = {
            taiKhoan: " ",
            matKhau: " ",
            hoTen: " ",
            email: " ",
            soDT: " ",
            maLoaiNguoiDung: " ",
        }

        let result = await fetchAccountInfoAPI();
        result = result.data.content;
        localStorage.setItem(ACCOUNT_INFO_KEY, JSON.stringify(result));
        for (let key in templateData) {
            form.setFieldsValue({
                [key]: result[key],
            });
        }
    }

    const fetchUserTypes = async () => {
        let result = await fetchUserTypesAPI();
        setTypesUser(result.data.content)
    }
    //HANLE ACTION CỦA FORM------------------------------------------BEGIN
    const handleEdit = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        setIsEditing(true);
        ;
    }

    const handleCancelEdit = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        setIsEditing(false);
        ;
    }

    const handleSubmit = async (evt) => {
        let data = { ...evt, maNhom: MA_NHOM };
        delete data.size;

        try {
            await updateAccountInfoAPI(data);
            notification.success({ message: "User information is updated successfully" });
            setIsEditing(false);
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
            form={form}
            onFinish={handleSubmit}
        >

            <Form.Item label="Username" name="taiKhoan">
                <Input disabled name='taiKhoan' />
            </Form.Item>
            <Form.Item label="Password" name="matKhau" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input disabled={!isEditing} name='matKhau' />
            </Form.Item>
            <Form.Item label="Fullname" name="hoTen" rules={[{ required: true, message: 'Please input your Fullname!' }]}>
                <Input disabled={!isEditing} name='hoTen' />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
                <Input disabled={!isEditing} name='email' />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please input your Price!' }]} name="soDT" label="Phone Number">
                <InputNumber disabled={!isEditing} style={{ width: '100%' }} name='giaVe' />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please input your Type of user!' }]} name="maLoaiNguoiDung" label="Type of user">
                <Select disabled={!isEditing} options={typesUser.map(ele => ({ label: ele.tenLoai, value: ele.maLoaiNguoiDung }))} />
            </Form.Item>
            { }
            <Form.Item colon={false} label=" ">
                {renderButton()}
            </Form.Item>
        </Form>
    );
}
