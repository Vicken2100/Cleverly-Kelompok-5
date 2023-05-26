import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { url } from "../utils/globalVariabel";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { sleep } from "../utils/utils";

const Login = () =>{
    const [loading, setLoading] = useState(false);
    const username = useRef();
    const password = useRef();
    const rePass = useRef();
    const Token = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const token = Cookies.get('token');
    useEffect(()=>{
        if(!token){
          navigate("/");
        }
      }, [navigate, token])

    const submitEvent = async(e) =>{
        e.preventDefault();
        setLoading(true);
        const data = {
            username : username.current.value,
            password : password.current.value,
            rePass : rePass.current.value,
            token : Token.current.value
        }
        try {
            await axios.post(url+ "/login/register", data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            Swal.fire('Berhasil Ditambah', '', 'success');
            await sleep(1000);
            window.location.reload();
        } catch (error) {
            if (error.response) {
                setError("Register Gagal, coba lagi");
              } 
              Swal.fire('Gagal Di tambah', '', 'error');

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
                    <h1 className="mt-[230px] w-max mx-auto text-[24px] font-bold">Buat Akun</h1>
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

                        <div className="mx-auto w-max mt-[30px]">
                            <input
                            type="password" 
                            ref={rePass}
                            className="bg-transparent placeholder-white"
                            placeholder="Retype Password"
                            />
                            <hr />
                        </div>

                        <div className="mx-auto w-max mt-[30px]">
                            <input
                            type="text" 
                            ref={Token}
                            className="bg-transparent placeholder-white"
                            placeholder="Token"
                            />
                            <hr />
                        </div>

                        {error ? <p className="block text-center mt-[10px] text-red-500">{error}</p>  : ""}
                        
                        <div className="bg-white block agline-middle rounded-md mx-auto w-max px-[100px] mt-[40px]">
                            <input 
                            className="font-bold text-[#1D92AC]"
                            type="submit" 
                            disabled={loading}
                            value="Buat Akun" />
                        </div>
                    </form>
                </div>
            </main>
            
        </>
       
    );
}

export default Login;