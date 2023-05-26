import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { url } from "../utils/globalVariabel";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () =>{
    const [loading, setLoading] = useState(false);
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const login = Cookies.get('token');
    useEffect(()=>{
        if(login){
          navigate("/");
        }
      }, [navigate, login])

    const submitEvent = async(e) =>{
        e.preventDefault();
        setLoading(true);
        const data = {
            username : username.current.value,
            password : password.current.value
        }
        try {
            const result = await axios.post(url+ "/login", data);
            const accessToken = result.data.data.accessToken;
            const expirationDate = new Date(new Date().getTime() + (accessToken.expiredAt * 60 * 60 * 1000));
            Cookies.set("token", accessToken.token, { expires: expirationDate });
            Cookies.set("status", accessToken.role, { expires: expirationDate });
            navigate("/");
        } catch (error) {
            if (error.response) {
                const err = error.response.data.message.response;
                setError(err);
              } 
        }
        
        setLoading(false);
    }

    return (
        <>

        {loading ? <div className="fixed top-0 bottom-0 left-0 right-0 bg-gradient-to-br from-blue-900 to-blue-500 h-screen w-screen flex items-center justify-center opacity-50 z-5">
            <div className="animate-pulse rounded-full h-20 w-20 border-4 border-blue-100"></div>
        </div> : ""}
        
            <main className="text-white">
                
                <div className="justify-items-center text-white">
                    <h1 className="mt-[230px] w-max mx-auto text-[24px] font-bold">L o g i n</h1>
                    <form onSubmit={submitEvent}>
                        <div className="mx-auto w-max mt-[80px]">
                            <input 
                            type="text"
                            className="bg-transparent placeholder-white"
                            ref={username}
                            placeholder="Username"
                            />
                            <hr />
                        </div>
                        
                        <div className="mx-auto w-max mt-[30px]">
                            <input
                            type="password" 
                            ref={password}
                            className="bg-transparent placeholder-white"
                            placeholder="Password"
                            />
                            <hr />
                        </div>

                        {error ? <p className="block text-center mt-[15px] text-red-500">Terjadi Kesalahan, Silahkan Coba Lagi</p>  : ""}
                        
                        <div className="bg-white text-black block agline-middle rounded-md mx-auto w-max px-[100px] mt-[20px]">
                            <input 
                            className="font-bold text-[#1D92AC]"
                            type="submit" 
                            disabled={loading}
                            value="Login" />
                        </div>
                    </form>
                </div>
            </main>
            
        </>
       
    );
}

export default Login;