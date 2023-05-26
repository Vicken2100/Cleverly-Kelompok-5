import React from 'react';
import home from "../Image/PIcture/home.png";
import quiz from "../Image/PIcture/quiz.png";
import profile from "../Image/PIcture/user.png";
import nilai from "../Image/PIcture/nilai.png";
import { useNavigate } from 'react-router-dom';

const Footer = () =>{

    const navigate = useNavigate();

    const clickEvent = (link) =>{
        navigate(link);
    }



    return (
    <footer className='fixed bottom-0 w-full bg-white grid grid-cols-8 gap-2 items-center justify-items-center'>
        <div className='col-span-2 cursor-pointer'
        onClick={() =>{
            clickEvent("/");
        }}
        >
            <img className='w-[25px] h-[25px] mx-3' src={home} alt="home"></img>
            <p className='text-sx text-center'>Home</p>
        </div>
        <div className='col-span-2 cursor-pointer' 
        onClick={() =>{
            clickEvent("/Kuis");
        }}>
            <img className='w-[25px] h-[25px] mx-3' src={quiz} alt='quiz'></img>
            <p className='text-sx text-center'>Kuis</p>
        </div>
        <div className='col-span-2'
         onClick={() =>{
            clickEvent("/nilai");
        }}
        >
            <img className='w-[25px] h-[25px] mx-3' src={nilai} alt="nilai"></img>
            <p className='text-sx text-center'>Nilai</p>
        </div>
            <div className='col-span-2' 
            onClick={() =>{
                clickEvent("/Profile");
            }}
            >
            <img className='w-[25px] h-[25px] mx-3' src={profile} alt='profile'></img>
            <p className='text-sx text-center'>Profil</p>
        </div>
    </footer>)
}

export default Footer;