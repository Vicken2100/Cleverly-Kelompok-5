import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Hasil = () =>{
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const nilai = searchParams.get("nilai");
    useEffect(()=>{
        if(!nilai){
            navigate("/")
        }
    }, {navigate, nilai})
    return (
        <>
            <main className="justify-items-center text-white">
                <h1 className="mt-[230px] w-max mx-auto text-[24px] font-bold">Nilai Kamu</h1>
                <h1 className="w-max mx-auto text-[24px] font-bold">{nilai}</h1>
                <button className="bg-white text-black rounded-xl mt-[20px] mr-3 text-md w-[90%] ml-4 mt-[300px]"
                onClick={() =>{
                    navigate("/Kuis");
                }}>Kembali</button>
                <button className="bg-white text-black rounded-xl mt-[20px] mr-3 text-md w-[90%] ml-4"
                onClick={() =>{
                    navigate("/Nilai");
                }}>Lihat Nilai Kuiz Lain</button>
            </main>
            
        </>
       
    );
}

export default Hasil;