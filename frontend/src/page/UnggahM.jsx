import React, { useEffect, useRef, useState } from "react";
import back from "../Image/PIcture/arrow.png";
import bg from "../Image/PIcture/gaya.jpg";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { url } from "../utils/globalVariabel";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const UnggahM = () =>{
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const materi = searchParams.get("class");
    const [classess, setClassess] = useState([]);
    const [error, setError] = useState("");
    const inputMateri = useRef();
    const files = useRef();
    const gambar = useRef();
    const token = Cookies.get('token');
    const getClassess = async() =>{
        const result = await axios.get(url + "/class");

        return result.data.data;
    };
    useEffect(()=>{
        getClassess().then((result) => setClassess(result));
    }, []);

    const handleSubmit = async() =>{
        const data = {
            name: inputMateri.current.value,
            class: materi,
            materi: files.current.files[0],
            image: gambar.current.files[0]
        };
        const isDataValid = Object.values(data).every(val => val !== undefined && val !== '');

        if(!isDataValid){
            setError("Data Belum Lengkap");
            return;
        }
        
        try {
            await axios.post(url + "/class/subClass", data, {
                headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
              }},)
              window.location.reload();
        } catch (error) {
            console.log("gagal")
        }

    }

    return (
        <>
            <nav className="grid grid-cols-7 gap-4 items-center justify-items-center bg-[#fafafa] p-2">
                <div className="col-span-1 flex items-center">
                    <img src={back} alt="back" className="w-[30px] h-[30px] rounded-full" onClick={()=>{
                    navigate("/");
                }}/>
                </div>
                <div className="col-span-3">
                    <h1 className="text-[17px] font-[500]">Unggah Materi</h1>
                </div>
            </nav>
            
            <main className="items-center justify-items-center w-full p-1">
                <div className="">
                    <img src={bg} alt="" className="h-[163px] bg-black rounded-md m-auto w-[94%] mt-7"/>
                </div>
                <div className="flex mx-auto mt-[25px]">
                <h1 className="ml-[30px] mr-[60px] text-[11px]">Mata Pelajaran</h1>
                <div>
                    <div className="flex">
                        {classess && classess.map((result, index)=>
                            <div className={`text-[7px] rounded-[20px] ${materi === result.name ? "text-white bg-green-500" : "text-black bg-white"} px-[13px] py-[6px]`} key={index}>
                                {result.name}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="flex mt-[22px] mr-[30px]">
                <h1 className="text-[11px] ml-[30px] mr-[70px]">Judul Materi</h1>
                <div className="relative">
                    <div className=" bg-white rounded-[5px]">
                    <input type="text" className="w-[180px] h-[25px] rounded-[5px] text-[12px]"
                    ref={inputMateri}
                    />
                    </div>
                </div>
            </div>

            <div className="flex mt-[33px] mr-[30px]">
                <h1 className="text-[11px] ml-[30px] mr-[67px] pr-6">Unggah File</h1>
                <div className="relative">
                    <div className=" rounded-[5px] mb-4">
                    <input ref={files} type="file" class="block w-full text-sm text-black
                        file:mr-2 file:py-1 file:px-4
                        file:rounded-full file:border-0
                        file:text-[12px]
                        file:bg-white file:text-black
                        hover:file:bg-white"/>
                    </div>
                    <h1 className="text-[10px]">
                        Tipe file yang bisa diunggah adalah Word (<span className="text-red-500">.docx</span>), <span className="text-red-500">.pdf</span>
                        , dan Powerpoint (<span className="text-red-500">.pptx</span>)
                    </h1>
                    <h1 className="text-[10px]">
                        Ukuran file <span className="text-red-500">Maksimal 10Mb</span>
                    </h1>
                    <h1 className="text-[10px]">
                        File materi yang sudah diunggah <span className="text-red-500">tidak bisa disunting</span> lagi
                    </h1>
                </div>
            </div>
            <div className="flex mt-[33px] mr-[30px]">
                <h1 className="text-[11px] ml-[30px] mr-[67px]">Unggah Gambar</h1>
                <div className="relative">
                    <div className=" rounded-[5px] mb-4">
                    <input ref={gambar} type="file" class="block w-full text-sm text-black
                        file:mr-2 file:py-1 file:px-4
                        file:rounded-full file:border-0
                        file:text-[12px]
                        file:bg-white file:text-black
                        hover:file:bg-white"/>
                    </div>
                    <h1 className="text-[10px]">
                        Tipe file yang bisa diunggah adalah (<span className="text-red-500">.png</span>), <span className="text-red-500">.jpg</span>
                        , dan (<span className="text-red-500">.jpeg</span>)
                    </h1>
                    <h1 className="text-[10px]">
                        Ukuran file <span className="text-red-500">Maksimal 2MB</span>
                    </h1>
                    <h1 className="text-[10px]">
                        File Image yang sudah diunggah <span className="text-red-500">tidak bisa disunting</span> lagi
                    </h1>
                </div>
            </div>

            <div className="bg-[white] rounded-md">
                {error ? <p className="text-red-500 text-center p-2 ml-4 mt-[40px] outline-black font-bold text-[14px]">Unggah Materi Gagal. Coba Lagi</p> : ""}
            </div>
            
            
            <button 
            
            onClick={() => {handleSubmit()}}
            className="bg-green-500 px-7 m-auto block mt-[70px] rounded-full text-white font-bold text-[15px] py-2">Kirim Materi</button>


            </main>
            
        </>
       
    );
}

export default UnggahM;