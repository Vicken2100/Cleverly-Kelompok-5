import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../utils/globalVariabel";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSearchParams } from 'react-router-dom';
import Soal from "../component/Soal";


const PageSoal = () =>{
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState([]);
    
    const token = Cookies.get('token');
    const [searchParams] = useSearchParams();
    const subClass = searchParams.get("subclass");
    const judul = searchParams.get("judul");
    const kesulitan = searchParams.get("kesulitan");

    const [total, setTotal] = useState(0);
    const [start, setStart] = useState(1);
    const [jawaban, setJawaban] = useState(new Array(total).fill({}));

    useEffect(()=>{
        if(!token){
          navigate("/login");
        }
      }, [navigate, token])

    const getClassess = async() =>{
        const result = await axios.get(url + "/class/quiz/get?filters[subclassname]=" + encodeURIComponent(subClass) + "&filters[tingkatkesulitan]=" + encodeURIComponent(kesulitan) + "&filters[judul]=" + encodeURIComponent(judul), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const value = result.data.data;
        let rendah = -999;
        for (let index = 0; index < value.length; index++) {
            const element = value[index];
            if(element.nomor > rendah){
                rendah = element.nomor;
            }
        }

        setTotal(rendah);

        return result.data.data;
    };
    useEffect(()=>{
        getClassess().then((result) => {
            setQuiz([...result]);
        });
    }, []);

    const hitung = async()=>{
        let totalBenar = 0;
        for (let index = 0; index < jawaban.length; index++) {
            const element = jawaban[index];
            const result = quiz.filter(item => item.nomor === element.nomor && item.jawaban === element.jawaban);
            if(result[0].tipe == true){
                totalBenar += 1;
            }
        }
        const nilaiBenar = (totalBenar / total) * 100;
        const data = {
            judulKuiz : quiz[0].judul,
            hasil: nilaiBenar
        }
        await axios.post(url + "/class/hasils", data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        navigate("hasil?nilai=" + nilaiBenar);

    }

    const sortirSoalFux = (strt) =>{
        return quiz.filter(item => item.nomor === strt);
    }
    return (
        <>
            {total !== 0 &&  total + 1 !== start ? <Soal
            setStart={setStart}
            soal={sortirSoalFux(start)}
            setJawaban={setJawaban}
            batas={total}
            start={start}
            hitung={hitung}
            jawaban={jawaban}
            /> : ""}
        </>
       
    );
}

export default PageSoal;