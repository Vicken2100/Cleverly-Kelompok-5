import React from "react";


const Filter = () =>{
    return (
        <>
            <main className="text-black">
            
                <div className="text-black flex mt-[50px]">
                    <div className="">
                        
                    </div>
                    <h1 className="text-[24px] mx-[45px]">Filter Kuis</h1>
                </div>
                
                <div className="mx-auto w-max">
                
                    <div className="text-black mt-[60px]">
                        <h1 className="text-[18px]">Jenis Mata Pelajaran</h1>
                        <div className="flex">
                            <div
                                className="mt-[23px] bg-white text-[12px] rounded-[20px] text-biru w-max"
                            >
                                <h1 className="px-[10px] py-[10px]">Matematika</h1>
                            </div>
                            <div
                                className="mt-[23px] bg-white text-[12px] rounded-[20px] text-biru w-max mx-[37px]"
                            >
                                <h1 className="px-[10px] py-[10px] mx-[10px]">IPA</h1>
                            </div>
                            <div
                                className="mt-[23px] bg-white text-[12px] rounded-[20px] text-biru w-max"
                            >
                                <h1 className="px-[10px] py-[10px] mx-[10px]">IPS</h1>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-black mt-[60px]">
                        <h1 className="text-[18px]">Tingkat Kesulitan</h1>
                        <div className="flex">
                        <div
                            className="mt-[23px] bg-white text-[12px] rounded-[20px] text-biru w-max"
                        >
                            <h1 className="px-[10px] py-[10px] mx-[10px]">Easy</h1>
                        </div>
                        <div
                            className="mt-[23px] bg-white text-[12px] rounded-[20px] text-biru w-max mx-[37px]"
                        >
                            <h1 className="px-[10px] py-[10px] mx-[10px]">Medium</h1>
                        </div>
                        <div
                            className="mt-[23px] bg-white text-[12px] rounded-[20px] text-biru w-max"
                        >
                            <h1 className="px-[10px] py-[10px] mx-[10px]">Hard</h1>
                        </div>
                        </div>
                    </div>
                    
                    <div
                        className="mt-[69px] bg-white text-[12px] rounded-[20px] text-biru w-max"
                    >
                        <h1 className="px-[130px] py-[10px]">Terapkan</h1>
                    </div>
                
                </div>
            </main>
            <footer className='fixed bottom-0 w-full bg-white grid grid-cols-8 gap-2 items-center justify-items-center p-1'>
                <div className=' bg-pink-500 col-span-2 flex-col'>
                    <div className='w-[25px] h-[25px] bg-black mx-3'></div>
                    <p className='text-sx'>Home</p>
                </div>
                <div className=' bg-pink-500 col-span-2 flex-col'>
                    <div className='w-[25px] h-[25px] bg-black mx-3'></div>
                    <p className='text-sx'>Kuis</p>
                </div>
                <div className=' bg-pink-500 col-span-2 flex-col'>
                    <div className='w-[25px] h-[25px] bg-black mx-3'></div>
                    <p className='text-sx'>Nilai</p>
                </div>
                <div className=' bg-pink-500 col-span-2 flex-col'>
                    <div className='w-[25px] h-[25px] bg-black mx-3'></div>
                    <p className='text-sx'>Profile</p>
                </div>
            </footer>
        </>
       
    );
}

export default Filter;