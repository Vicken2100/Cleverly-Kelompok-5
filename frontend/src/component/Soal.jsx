import React from "react";
import Jujur from "../Image/jujur.png";

const Soal = ({setStart, soal, setJawaban, batas, start, hitung, jawaban}) =>{
    if(start === batas + 1){
        return;
    }
    let soalTampil = "";
    let judul = "";
    if(soal && soal[0] && soal[0].soal && soal[0].judul){
        soalTampil = soal[0].soal;
        judul = soal[0].judul
    }
    return (
        <>
            <header className="grid grid-cols-5 gap-4 items-center justify-items-center mt-7">
                <h1 className="font-bold block align-middle text-center col-span-3 text-xl">{judul}</h1>
            </header>
            <main className="mt-[60px]">
                <div className=" w-[90%] bg-black m-auto">
                    <img src={Jujur} alt="" />
                </div>
                <h1 className="text-white mt-5 justify-center mb-5 mx-auto w-full text-center font-bold">{soalTampil}</h1>
                {soal && soal.length > 0 ? 
                soal.map((rslt, index) => <button className="bg-white rounded-xl mt-[15px] mr-3 text-xl w-[90%] ml-4"
                key={index}
                onClick={()=>{
                    const jawabanTemp = {
                        "nomor" : rslt.nomor,
                        "jawaban" : rslt.jawaban
                    }
                    const temp = jawaban
                    temp[rslt.nomor - 1] = jawabanTemp;
                    setJawaban(temp)
                    if(rslt.nomor !== batas){
                        setStart((df) => df+1);
                    }else{
                        hitung()
                    }
                    
                }}
                > {rslt.jawaban}</button>) :""    
            }
                <button className="bg-white rounded-xl mt-[50px] mr-3 text-xl px-6 ml-[280px] " onClick={()=>{
                    setStart((df) => df+1)
                }}>Lanjut</button>
            </main>
        </>
       
    );
}

export default Soal;