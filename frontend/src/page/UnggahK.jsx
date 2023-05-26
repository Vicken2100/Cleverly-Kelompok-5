import React, { useEffect, useRef, useState } from "react";
import back from "../Image/PIcture/arrow.png";
import bg from "../Image/PIcture/gaya.jpg";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { url } from "../utils/globalVariabel";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const UnggahK = () =>{
    const navigate = useNavigate();
    const totalSoal = 10
    const [searchParams] = useSearchParams();
    const materi = searchParams.get("class");
    const soal = [];

    for (let i = 1; i <= totalSoal; i++) {
        soal.push(i);
    }
    const token = Cookies.get('token');
    const [classess, setClassess] = useState([]);
    const [tingkatKesulitan, setTingkatKesulitan] = useState("");
    const [subClassess, setSubclassess] = useState("");
    const getClassess = async() =>{
        const result = await axios.get(url + "/class/subClass?filters[class]=" + materi);

        return result.data.data;
    };
    const [soalKuiz, setSoalKuiz] = useState(new Array(totalSoal).fill(""));
    const [jawabanKuiz1, setJawabanKuiz1] = useState(new Array(totalSoal).fill(""));
    const [jawabanKuiz2, setJawabanKuiz2] = useState(new Array(totalSoal).fill(""));
    const [jawabanKuiz3, setJawabanKuiz3] = useState(new Array(totalSoal).fill(""));
    const [jawabanKuiz4, setJawabanKuiz4] = useState(new Array(totalSoal).fill(""));
    const [inputBenar, setInputBenar] = useState(new Array(totalSoal).fill(""));
    const deskripsi = useRef();
    const judul = useRef();
    const [getForm, setForm] = useState();

    useEffect(()=>{
        getClassess().then((result) => setClassess(result));
    }, []);

    useEffect(() =>{
        const sk = soalKuiz;
        const jk1 = jawabanKuiz1;
        const jk2 = jawabanKuiz2;
        const jk3 = jawabanKuiz3;
        const jk4 = jawabanKuiz4;
        const ib = inputBenar;

        const reactFragmentKuiz = soal.map( (rslt, index) =>
                     <div key={rslt}>
                            <div className="flex mt-[15px] mr-[30px] pt-2">
                                <h1 className="text-[11px] ml-[30px] mr-[85px]">Soal Kuis {rslt}</h1>
                                <div className="relative">
                                    <div className=" bg-white rounded-[5px]">
                                    <textarea
                                    id="description"
                                    onChange={(e)=>{
                                        let temp = sk
                                        temp[index] = e.target.value;
                                        setSoalKuiz(temp);
                                    }}
                                    className="w-[180px] h-[40px] rounded-[5px] text-[11px]"
                                    />
                                    </div>
                                    <h1 className="text-[7px]">0/100</h1>
                                </div>
                            </div>
                            <div className="flex mt-[10px] mr-[30px]">
                                <h1 className="text-[11px] ml-[30px] mr-[85px]">Opsi Jawaban</h1>
                                <div className="relative ">
                                    <div className=" rounded-[5px] flex mt-1">
                                        <input 
                                        type="radio" 
                                        value={"1"} 
                                        onChange={(e)=>{
                                            let temp = ib
                                            temp[index] = e.target.value;
                                            setInputBenar(temp);
                                        }}
                                        name={"opsi"+rslt}/>
                                        <input 
                                        type="text" 
                                        name={"i1-"+ rslt} 
                                        className="w-[170px] h-[25px] rounded-[5px] text-[11px] ml-1" 
                                        onChange={(e)=>{
                                            let temp = jk1
                                            temp[index] = e.target.value;
                                            setJawabanKuiz1(temp);
                                        }}
                                        required/>
                                    </div>
                                    <div className=" rounded-[5px] flex mt-1">
                                        <input type="radio" 
                                        onChange={(e)=>{
                                            let temp = ib
                                            temp[index] = e.target.value;
                                            setInputBenar(temp);
                                        }}
                                        value={"2"} name={"opsi"+rslt} />
                                        <input 
                                        type="text" 
                                        name={"i2-"+ rslt} 
                                        onChange={(e)=>{
                                            let temp = jk2
                                            temp[index] = e.target.value;
                                            setJawabanKuiz2(temp);
                                        }}
                                        className="w-[170px] h-[25px] rounded-[5px] text-[11px] ml-1" required/>
                                    </div>
                                    <div className=" rounded-[5px] flex mt-1">
                                        <input type="radio" 
                                        onChange={(e)=>{
                                            let temp = ib
                                            temp[index] = e.target.value;
                                            setInputBenar(temp);
                                        }}
                                        value={"3"} name={"opsi"+rslt} />
                                        <input 
                                        type="text" 
                                        name={"i3-"+ rslt} 
                                        onChange={(e)=>{
                                            let temp = jk3
                                            temp[index] = e.target.value;
                                            setJawabanKuiz3(temp);
                                        }}
                                        className="w-[170px] h-[25px] rounded-[5px] text-[11px] ml-1" required/>
                                    </div>
                                    <div className=" rounded-[5px] flex mt-1">
                                        <input type="radio" 
                                        onChange={(e)=>{
                                            let temp = ib
                                            temp[index] = e.target.value;
                                            setInputBenar(temp);
                                        }}
                                        value={"4"} name={"opsi"+rslt}  />
                                        <input 
                                        type="text" 
                                        name={"i4-"+ rslt} 
                                        onChange={(e)=>{
                                            let temp = jk4
                                            temp[index] = e.target.value;
                                            setJawabanKuiz4(temp);
                                        }}
                                        className="w-[170px] h-[25px] rounded-[5px] text-[11px] ml-1" required/>
                                    </div>
                                    <h1 className="text-[7px]">Pilih Jawaban yang benar</h1>
                                </div>
                            </div>
                        {rslt != 10 ? <hr className="mt-3"/> : ""  }
                    </div>
                    )
            setForm(reactFragmentKuiz)
    }, []);

    const submitToServer = async(data) =>{
        await axios.post(url + "/class/quiz", data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    const handleSubmit = async() =>{
        console.log(inputBenar)
        for (let index = 0; index < totalSoal; index++) {
            //jawaban 1
            const data1  = {
                tingkatkesulitan : tingkatKesulitan,
                judul: judul.current.value,
                deskripsi: deskripsi.current.value,
                soal: soalKuiz[index],
                nomor: index + 1,
                subclass: subClassess,
                type: inputBenar[index] == "1",
                jawaban: jawabanKuiz1[index]
            }

            const data2  = {
                tingkatkesulitan : tingkatKesulitan,
                judul: judul.current.value,
                deskripsi: deskripsi.current.value,
                soal: soalKuiz[index],
                nomor: index + 1,
                subclass: subClassess,
                type: inputBenar[index] == "2",
                jawaban: jawabanKuiz2[index]
            }
            const data3  = {
                tingkatkesulitan : tingkatKesulitan,
                judul: judul.current.value,
                deskripsi: deskripsi.current.value,
                soal: soalKuiz[index],
                nomor: index + 1,
                subclass: subClassess,
                type: inputBenar[index] == "3",
                jawaban: jawabanKuiz3[index]
            }
            const data4  = {
                tingkatkesulitan : tingkatKesulitan,
                judul: judul.current.value,
                deskripsi: deskripsi.current.value,
                soal: soalKuiz[index],
                nomor: index + 1,
                subclass: subClassess,
                type: inputBenar[index] == "4",
                jawaban: jawabanKuiz4[index]
            }
            

            await submitToServer(data1);

            await submitToServer(data2);

            await submitToServer(data3);

            await submitToServer(data4);
        }
        window.location.reload();
    }

    return (
        <>

            <nav className="grid grid-cols-7 gap-4 items-center justify-items-center bg-[#fafafa] p-2">
                <div className="col-span-1 flex items-center">
                    <img src={back} alt="" className="w-[30px] h-[30px] rounded-full" onClick={()=>{
                    navigate("/");
                }}/>
                </div>
                <div className="col-span-3">
                    <h1 className="text-[17px] font-[500]">Unggah Kuis</h1>
                </div>
            </nav>
            
            <main className="items-center justify-items-center w-full p-1">
                <div className="">
                    <img src={bg} alt="" className="h-[163px] bg-black rounded-md m-auto w-[94%] mt-7"/>
                </div>
                <div className="flex mx-auto mt-[25px]">
                <h1 className="ml-[30px] mr-[60px] text-[11px]">Materi Pelajaran</h1>
                <div>
                    <div className="flex">
                        {classess && classess.map((result, index)=>
                            <div 
                            className={`text-[7px] mr-3 rounded-[20px] ${subClassess === result.name ? "text-white bg-green-500" : "text-black bg-white"} px-[13px] py-[6px]`} 
                            key={index}
                            onClick={()=>{
                                setSubclassess(result.name)
                            }}
                            >
                                {result.name}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="flex mt-[33px] mr-[30px]">
                <h1 className="text-[11px] ml-[30px] mr-[85px]">Judul Kuis</h1>
                <div className="relative">
                    <div className=" bg-white rounded-[5px]">
                    <input type="text" ref={judul} className="w-[180px] h-[20px] rounded-[5px] text-[12px]"/>
                    </div>
                </div>
            </div>

            <div className="flex mt-[33px] mr-[30px]">
                <h1 className="text-[11px] ml-[30px] mr-[67px]">Deskripsi Kuis</h1>
                <div className="relative">
                    <div className="bg-white rounded-[5px]">
                    <textarea
                    id="description"
                    ref={deskripsi}
                    className="w-[180px] h-[70px] rounded-[5px] text-[11px]"
                />
                    </div>
                </div>
            </div>

            <div className="flex mx-auto mt-[25px]">
                <h1 className="ml-[30px] mr-[60px] text-[11px]">Tingkat Kesulitan</h1>
                <div>
                    <div className="flex">
                    <button 
                        className={`text-[7px] rounded-[20px] ${tingkatKesulitan === "Mudah" ? "text-white bg-green-500" : "text-black bg-white"} px-[13px] py-[6px] mr-3`}
                            onClick={()=>{
                                setTingkatKesulitan("Mudah");
                            }}
                        >
                            Mudah
                        </button>
                        <button 
                        className={`text-[7px] rounded-[20px] ${tingkatKesulitan === "Sedang" ? "text-white bg-green-500" : "text-black bg-white"} px-[13px] py-[6px] mr-3`}
                            onClick={()=>{
                                setTingkatKesulitan("Sedang");
                            }}
                        >
                            Sedang
                        </button>
                        <button 
                            className={`text-[7px] rounded-[20px] ${tingkatKesulitan === "Sulit" ? "text-white bg-green-500" : "text-black bg-white"} px-[13px] py-[6px] mr-3`}
                            onClick={()=>{
                                setTingkatKesulitan("Sulit");
                            }}
                        >
                            Sulit
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-[#147388] rounded-xl pb-2">

                    

                    {getForm}
                             
            </div>
                
                
                
                

            <button onClick={()=>{handleSubmit()}} className="bg-green-500 px-7 ml-auto block mt-[70px] rounded-xl text-white font-bold text-[15px] py-2">Kirim Kuis</button>


            </main>
            
        </>
       
    );
}

export default UnggahK;