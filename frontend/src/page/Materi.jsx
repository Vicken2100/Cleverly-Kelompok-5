import React, { useEffect, useState } from "react";
import back from "../Image/PIcture/arrow.png";
import Cleverly from '../Image/cleverly.png';
import Footer from "../component/footer";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { url } from '../utils/globalVariabel';
import Cookies from 'js-cookie';

const Materi = () =>{
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [subClassess, setSubClassess] = useState([]);
    
    const materi = searchParams.get("class");
    const status = Cookies.get('status');
    const token = Cookies.get("token");

    useEffect(()=>{
        if(!materi){
            navigate("/");
        }
    }, [navigate, materi]);

    const getSubClassess = async() =>{
        const result = await axios.get(url + "/class/subClass?filters[class]="+materi);
        return result.data.data;
    };
    useEffect(()=>{
        getSubClassess().then((result) => setSubClassess(result));
    }, []);
    const deleteMateri = async(xid) =>{
        await axios.delete(url + "/class/subClass/"+xid, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        } )
        window.location.reload();
    }
    return (
        <>
            <header className="flex-col bg-[#fafafa] p-2 sticky top-0" >
                <img src={back} alt="back" className="w-[33px] h-[33px] cursor-pointer rounded-full object-fill" onClick={()=>{
                    navigate("/");
                }}/>
                <div className="flex -600 px-4 mt-2">
                    <h1 className="font-bold text-[#060c0e] capitalize">Materi {materi} <br /><br /> Kelas 4</h1>
                    <div className="w-[70px] h-[70px] m-1 ml-[120px]">
                        <img src={Cleverly} alt="" className="rounded-full"/>
                    </div>
                </div>
            </header>
            <main className="h-[480px] scrollable overflow-scroll mt-5">
                <section className="materi p-6">
                
                {status && status === "guru" ?  <div className="flex justify-between">
                <button className="bg-white hover:bg-gray-700 text-black font-bold py-2 px-4 rounded-xl"
                    onClick={()=>{
                        navigate("/Kuis/UnggahK?class=" + materi);
                    }}
                    >
                        Tambah Kuis
                    </button>
                    <button className="bg-white hover:bg-gray-700 text-black font-bold py-2 px-4 rounded-xl"
                    onClick={()=>{
                        navigate("UnggahM?class=" + materi);
                    }}
                    >
                        Tambah Materi
                    </button>
                </div> : ""}
               
                    <div className='flex-col pt-1'>
                        {subClassess && subClassess.map((subclassessChild,index) => 
                            <div className='w-full h-[100px] mt-3 rounded-xl m-auto flex justify-center items-end relative' key={index}
                            onClick={()=>{
                                window.location.href = url + "/public/materi/" + subclassessChild.materi
                            }}
                            >
                                <img src={url+"/public/image/"+ subclassessChild.image} alt="Your Image" className="absolute top-0 left-0 rounded-t-xl w-full h-[70px] object-fill" />
                                <div className='w-full h-[30px] bg-white text-center'>{subclassessChild.name}</div>
                                {status && status === "guru" ? <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 z-10 text-[10px]"
                                onClick={()=>{
                                    deleteMateri(subclassessChild.xid);
                                }}
                                >
                                    Hapus Materi
                                </button> : ""}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer/>
            
        </>
       
    );
}

export default Materi;