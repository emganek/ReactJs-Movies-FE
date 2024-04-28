import { Table, Popconfirm, notification, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { deleteMovieAPI, fetchMovieListAPI } from '../../services/movies';
import './index.css';
import { DeleteOutlined, EditOutlined, ScheduleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function MovieManagement() {
  const navigate = useNavigate();
  const [sortedInfo, setSortedInfo] = useState({});
  const [movieList, setMovieList] = useState([]);

  //TABLE HANDLER------------------------------------------------BEGIN---------
  const handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: 'Movie code',
      dataIndex: 'maPhim',
      key: 'maPhim',
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortOrder: sortedInfo.columnKey === 'maPhim' ? sortedInfo.order : null,
      ellipsis: true,
      width: "8%",
    },
    {
      title: 'Movie Name',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
      sorter: (a, b) => {
        const phimA = a.tenPhim.toLowerCase().trim();
        const phimB = b.tenPhim.toLowerCase().trim();

        if (phimA < phimB) {
          return 1;
        }
        return -1;
      },
      sortOrder: sortedInfo.columnKey === 'tenPhim' ? sortedInfo.order : null,
      ellipsis: true,
      width: "15%",
    },
    {
      title: 'Image',
      dataIndex: 'hinhAnh',
      render: (text, item, index) => {
        return <img className='movie-image' src={item.hinhAnh} alt={item.maPhim} />
      },
      key: 'hinhAnh',
      ellipsis: true,
      width: "10%",
    },
    {
      title: 'Descripstion',
      dataIndex: 'moTa',
      key: 'moTa',
      ellipsis: true,
    },
    {
      title: 'Acions',
      dataIndex: 'thaoTac',
      render: (text, item, index) => {
        return (
          <React.Fragment key={index}>
            <EditOutlined onClick={() => navigate(`/admin/movie-edit/${item.maPhim}`)} className='edit-button mr-3' />
            <Popconfirm title={`Are you sure to delete ${item.tenPhim}`} onConfirm={() => confirmDelete(item.maPhim)} okText="Yes" cancelText="No">
              <DeleteOutlined className='delete-button mr-3' />
            </Popconfirm>
            <ScheduleOutlined onClick={() => navigate(`/admin/movie-schedule/${item.maPhim}`)} className='schedule-button mr-3' />
          </React.Fragment>
        )
      },
      key: 'thaoTac',
      width: "10%",
    },
  ];
  //TABLE HANDLER------------------------------------------------END---------

  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async (keyword = "") => {
    let movieList = await (await fetchMovieListAPI(keyword)).data.content
    movieList = movieList.map((ele, index) => ({ ...ele, key: index }))
    setMovieList(movieList);
  }

  const confirmDelete = (maPhim) => {
    handleDelete(maPhim);
  }

  const handleDelete = async (maPhim) => {
    try {
      await deleteMovieAPI(maPhim);
      notification.success({ message: `Movie is deleted successfully!` });
      fetchMovieList();
    } catch (error) {
      notification.error({
        message: `Delete fail!`,
        description: error.response.data.content,
      });
    }
  }

  const onClick = (evt) =>{
    fetchMovieList(evt);
  }

  return (
    <>
      <Input.Search onSearch={onClick} allowClear className='mb-3' style={{ width: '100%', }} defaultValue="" />
      <Table columns={columns} dataSource={movieList} onChange={handleChange} />
    </>
  );
}
