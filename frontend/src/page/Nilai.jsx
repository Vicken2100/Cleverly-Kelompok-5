import React, { useEffect, useState } from "react";
import Footer from "../component/footer";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { url } from "../utils/globalVariabel";

const Nilai = () =>{

    const navigate = useNavigate();
    const token = Cookies.get('token');
      const [hasils, setHasils] = useState([]);
      const getUser = async() =>{
        const result = await axios.get(url + "/class/hasils", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return result.data.data;
    };
    useEffect(()=>{
        getUser().then((result) => setHasils(result));
    }, []);

    return (
        <>
        <main className="text-Black">
           {token ?  
                <div className="bg-white rounded-md p-3 m-auto w-max mt-7 justify-between flex">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Username
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Judul
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Nilai
                            </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {hasils && hasils.length > 0 && hasils.map ((hasil) => (
                            <tr key={hasil.judul}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {hasil.username}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {hasil.judulkuiz}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {hasil.hasil}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                </div>
              : <button className="bg-[#1b88a1] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl mt-[260px] mx-auto block text-[20px]"
                    onClick={()=>{
                        navigate("/login")
                    }}
                    >Akses fitur lebih banyak <br /> dengan login terlebih dahulu :) <br /> <br /> Tekan disini untuk Login</button>}
                </main>
            <Footer/>
        </>
       
    );
}

export default Nilai;