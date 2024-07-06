import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

let navigate;

export const setNavigate = (nav) => {
    navigate = nav;
};

export const redirectTo = (path) => {
    if (navigate) {
        navigate(path);
    } else {
        console.error("Navigate function is not set");
    }
};

const NavigationSetter = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setNavigate(navigate);
    }, [navigate]);

    return null;
};

export default NavigationSetter;