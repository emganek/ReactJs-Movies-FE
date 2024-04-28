import { notification } from 'antd';
import React, { createRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MA_NHOM } from '../../constants/common';
import { registerAPI } from '../../services/user';
import './index.css';

const DEFAULT_VALUES = {
    taiKhoan: "",
    hoTen: "",
    matKhau: "",
    soDt: "",
    email: "",
    maNhom: MA_NHOM,
}

const formRef = createRef();
const pattern = '[^0-9.,/<>?:"\!@#$%^~`&\'{}\[()]+';
export default function RegisterPage() {
    const [state, setState] = useState({
        values: DEFAULT_VALUES,
        errors: {
            taiKhoan: "",
            hoTen: "",
            matKhau: "",
            soDt: "",
            email: "",

        },
        isFormValid: false,
    });

    const navigate = useNavigate();

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    //Form hanler=============================================================================
    // Read infomation from inputs
    const inputListening = (evt) => {
        const { name, value } = evt.target;
        const updateValues = { ...state.values, [name]: value };
        setState({
            ...state, values: updateValues
        });

    };

    //Error handler
    const errorHandler = (evt) => {
        const { name, title } = evt.target;
        const { valueMissing, patternMismatch } = evt.target.validity;
        let errorMessage = "";

        if (name === "email" && patternMismatch) {
            errorMessage = `${title} is not valid!`
        }
        if (name === "soDt" && patternMismatch) {
            errorMessage = `${title} must be number and have 10 digits`
        }
        if (name === "hoTen" && patternMismatch) {
            errorMessage = `${title} cannot contain any numbers or special charectors`
        }
        if (valueMissing) {
            errorMessage = `Please fill ${title} !`
        }
        const updatedErrors = { ...state.errors, [name]: errorMessage };
        setState({
            ...state, errors: updatedErrors
        });
    }

    // When SAVE is clicked
    const submitHandler = async (evt) => {
        evt.preventDefault();
        const data = state.values

        try {
            await registerAPI(data);
            notification.success({
                message: "Register success!",
            });
            navigate('/login');
        } catch (error) {
            notification.error({
                message: "Register fail!",
                description: error.response.data.content,
            })
        }

        resetFormHandler();
    };

    const resetFormHandler = () => {
        setState({
            ...state, values: DEFAULT_VALUES, errors: DEFAULT_VALUES
        });
    }
    // =====================================================================================

    return (
        <div id="register-form">
            <div className="card p-0">
                <div className="card-header bg-warning text-white font-weight-bold">
                    REGISTER FORM
                </div>
                <div className="card-body">
                    <form ref={formRef} noValidate onSubmit={submitHandler}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input required value={state.values.taiKhoan} title="Username" name="taiKhoan" onBlur={errorHandler} onChange={inputListening} type="text" className="form-control" />
                                    {state.errors.taiKhoan !== "" && <span className='text-danger'>{state.errors.taiKhoan}</span>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input pattern={pattern} required value={state.values.hoTen} title="Full Name" name="hoTen" onBlur={errorHandler} onChange={inputListening} type="text" className="form-control" />
                                    {state.errors.hoTen !== "" && <span className='text-danger'>{state.errors.hoTen}</span>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input required value={state.values.matKhau} title="Password" name="matKhau" onBlur={errorHandler} onChange={inputListening} type="text" className="form-control" />
                                    {state.errors.matKhau !== "" && <span className='text-danger'>{state.errors.matKhau}</span>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input pattern='[0-9]{10}\b' required value={state.values.soDt} title="Phone Number" name="soDt" onBlur={errorHandler} onChange={inputListening} type="text" className="form-control" />
                                    {state.errors.soDt !== "" && <span className='text-danger'>{state.errors.soDt}</span>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$" required value={state.values.email} title="Email" name="email" onBlur={errorHandler} onChange={inputListening} type="text" className="form-control" />
                                    {state.errors.email !== "" && <span className='text-danger'>{state.errors.email}</span>}
                                </div>
                            </div>
                        </div>

                        <button disabled={!formRef.current?.checkValidity()} className="btn btn-warning mr-2">SAVE</button>
                        <button onClick={resetFormHandler} type="reset" className="btn btn-outline-dark">RESET</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
