import React from "react";
import { sleep } from "../utils/utils";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        async function redirect() {
            await sleep(2000);
            navigate("/");
        }
        redirect();
    }, [navigate])

    return (
        <div className="bg-gradient-to-br from-[#1D92AC] to-pink-500 h-screen w-screen flex items-center justify-center">
            <div className="animate-pulse rounded-full h-20 w-20 border-4 border-purple-100"></div>
        </div>
    );
};

export default Redirect;