import { Table, Popconfirm, notification, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { deleteUserAPI, fetchUserListAPI } from '../../services/user';

export default function UserManagement() {
  const navigate = useNavigate();
  const [sortedInfo, setSortedInfo] = useState({});
  const [userList, setUserList] = useState([]);

  //TABLE HANDLER------------------------------------------------BEGIN---------
  const handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: 'Order',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.key - b.key,
      sortOrder: sortedInfo.columnKey === 'key' ? sortedInfo.order : null,
      ellipsis: true,
      width: "5%",
    },
    {
      title: 'Username',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      sorter: (a, b) => {
        const phimA = a.taiKhoan.toLowerCase().trim();
        const phimB = b.taiKhoan.toLowerCase().trim();

        if (phimA < phimB) {
          return 1;
        }
        return -1;
      },
      sortOrder: sortedInfo.columnKey === 'taiKhoan' ? sortedInfo.order : null,
      ellipsis: true,
      width: "10%",
    },
    {
      title: 'Password',
      dataIndex: 'matKhau',
      key: 'matKhau',
      ellipsis: true,
    },
    {
      title: 'Fullname',
      dataIndex: 'hoTen',
      key: 'hoTen',
      ellipsis: true,
      width: "15%",
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'soDT',
      key: 'soDT',
      ellipsis: true,
    },
    {
      title: 'Type',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
      ellipsis: true,
    },
    {
      title: 'Acions',
      dataIndex: 'thaoTac',
      render: (text, item, index) => {
        return (
          <React.Fragment key={index}>
            <EditOutlined onClick={() => navigate(`/admin/user-edit/${item.taiKhoan}`)} className='edit-button mr-3' />
            <Popconfirm title={`Are you sure to delete ${item.taiKhoan}`} onConfirm={() => confirmDelete(item.taiKhoan)} okText="Yes" cancelText="No">
              <DeleteOutlined className='delete-button mr-3' />
            </Popconfirm>
          </React.Fragment>
        )
      },
      key: 'thaoTac',
      width: "10%",
    },
  ];
  //TABLE HANDLER------------------------------------------------END---------

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async (keyword = "") => {
    let userList = await (await fetchUserListAPI(keyword)).data.content
    userList = userList.map((ele, index) => ({ ...ele, key: index+1 }))
    setUserList(userList);
  }

  const confirmDelete = (taiKhoan) => {
    handleDelete(taiKhoan);
  }

  const handleDelete = async (taiKhoan) => {
    try {
      await deleteUserAPI(taiKhoan);
      notification.success({ message: `Remove user successfully!` });
      fetchUserList();
    } catch (error) {
      notification.error({
        message: `Fail to remove user`,
        description: error.response.data.content,
      });
    }
  }

  const onClick = (evt) =>{
    fetchUserList(evt);
  }

  return (
    <>
      <Input.Search onSearch={onClick} allowClear className='mb-3' style={{ width: '100%', }} defaultValue="" />
      <Table columns={columns} dataSource={userList} onChange={handleChange} />
    </>
  );
}
