import React, { useEffect, useState } from 'react';
import Cleverly from '../Image/cleverly.png';
import Ade from '../Image/Ade.png';
import Delasalle from '../Image/logo dela.png';
import Footer from '../component/footer';
import Carousel from "react-multi-carousel";
import axios from "axios";
import { url } from '../utils/globalVariabel';
import { useNavigate } from 'react-router-dom';


const Home = () =>{
    const navigate = useNavigate();
    const [classess, setClassess] = useState([]);
    const getClassess = async() =>{
        const result = await axios.get(url + "/class");
        
        return result.data.data;
    };
    useEffect(()=>{
        getClassess().then((result) => setClassess(result));
    }, []);
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
    };
    const height = window.innerHeight;
    return (
        <>
            <header className="grid grid-cols-5 gap-4 items-center justify-items-center bg-[#1D92AC] p-6" >
                <div className="col-span-1 flex items-center ">
                    <img src={Cleverly} className=" w-[40px] h-[40px] rounded-full" />
                </div>
                <div className="col-span-3 flex items-center justify-center">
                    <form>
                    <div className="flex items-center bg-[#ffffff] rounded-full">
                        <h1 className='py-2 px-[40px] text-[#377491] font-bold text-center text-[16px]'>Cleverly Quiz</h1>
                    </div>
                    </form>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                    <img src={Delasalle} className="w-[40px] h-[40px] rounded-full" />
                </div>
            </header>
            <main className='scrollable overflow-scroll' style={{height:`${height-125}px`}}>
                <section className='kotak awal '>
                    <div className='w-[340px] h-[181px] rounded-full bg-black m-auto'>
                        <img src={Ade} alt="" className='rounded-xl'/>
                    </div>
                </section>

                {classess && classess.map((result, index) =>
                
                <section className='kotakMate p-6 ' key={index} >

                    <div className='grid grid-cols-7 gap-4 items-center justify-items-center'>
                        <h1 className='text-white col-span-2 font-semibold text-left'>{result.name.toUpperCase()}</h1>
                        <div className='col-span-3'></div>
                        <div className=' bg-white rounded-md col-span-2 text-[#1D92AC]'>
                        <h2 className='text-[10px] p-2' onClick={()=>{
                            navigate("/materi?class="+ result.name)
                        }}>View All</h2>
                        </div>
                        
                    </div>
                    {result.subclasses ? 
                    <Carousel
                    showDots={false}
                    infinite={true}
                    autoPlay={false}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    responsive={responsive}
                    className="mt-5"
                    >
                    {result.subclasses && result.subclasses.map((subclassess,index) => 
                        <div className='w-[150px] h-[100px] rounded-xl m-auto flex justify-center items-end relative' key={index} onClick={()=>{
                            window.location.href = url + "/public/materi/" + subclassess.materi
                        }}>
                            <img src={url+"/public/image/"+ subclassess.image} alt="Your Image" className="absolute top-0 left-0 rounded-t-xl w-[150px] h-[70px] object-fill" />
                            <div className='w-[150px] h-[30px] bg-white rounded-b-lg text-center'>{subclassess.name}</div>
                        </div>
                )}
                    </Carousel> : ""}
                    
                    
                </section>
                )}

                
            </main>
            
            <Footer />



        </>
    )
}

export default Home;