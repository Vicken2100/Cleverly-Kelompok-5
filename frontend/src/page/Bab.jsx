import React from "react";
import back from "../Image/PIcture/arrow.png";
import Footer from "../component/footer";

const Bab = () =>{
    return (
        <>
            <nav className="grid grid-cols-7 gap-4 items-center justify-items-center bg-[#fafafa] p-2">
                <div className="col-span-1 flex items-center">
                <img src={back} alt="back" className="w-[40px] h-[40px] cursor-pointer rounded-full object-fill"/>
                </div>
                <div className="col-span-5">
                    <h1 className="text-[17px] font-[500]">Materi Matematika Kelas 4</h1>
                </div>
            </nav>
            
            <main className="flex-col">
                <div className="grid grid-cols-6 gap-4 items-center justify-items-center">
                    <div className="col-span-6 mt-3">
                        <h1 className="text-2xl font-[500] text-white">FPB dan KPK</h1>
                    </div>
                    <div className="h-[163px] bg-black rounded-md col-span-6 w-[90%]">

                    </div>
                    <div className="h-[163px] bg-white rounded-md col-span-6 w-[90%] p-3">
                        <p className="text-justify">&nbsp; Perbedaan FPB dan KPK terlihat dari nama dan pengertiannya. FPB adalah kepanjangan dari faktor persekutuan terbesar, sedangkan KPK adalah kepanjangan dari faktor persekutuan terkecil. </p>
                    </div>
                </div>

                <button className="bg-red-500 w-[90%] rounded-full m-auto block mt-5">Hapus Materi</button>
            </main>

            <Footer/>
        </>
    );
}

export default Bab;