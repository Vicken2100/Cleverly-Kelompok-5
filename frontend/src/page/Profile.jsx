import React, { useEffect, useState } from "react";
import profil from "../Image/PIcture/Cleverly no bg putih.png";
import Footer from "../component/footer";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { url } from "../utils/globalVariabel";

const Profile = () =>{
    const navigate = useNavigate();
    const token = Cookies.get('token');
      const [users, setUsers] = useState({});
      const getUser = async() =>{
        const result = await axios.get(url + "/login", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return result.data.data;
    };
    useEffect(()=>{
        getUser().then((result) => setUsers(result));
    }, []);


      const deleteCookies = ()=>{
        Cookies.remove("token");
        Cookies.remove("status");
        window.location.reload();
      }
    return (
        <>
            <main className="text-black">
                {token ? <> <div className="mt-[150px] w-[90px] mx-auto rounded-full bg-white">
                        <img src={profil} alt="default profile" />
                </div>

                <div 
                className="mx-auto mt-[80px] block bg-white text-[26px] py-1 w-[80%] rounded-md"
                
                >
                    <h1 className="flex">username : <p> {users.username}</p></h1> 
                </div>
                
                <div className="mx-auto mt-[30px] block bg-white text-[26px] py-1 w-[80%] rounded-md"
                >
                   <h1 className="flex ">Status : <p className="capitalize"> {users.status}</p> </h1>
                </div>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl mt-5 mx-auto block"
                    onClick={()=>{
                        deleteCookies();
                    }}
                    >Log Out</button>
            </> : <button className="bg-[#1b88a1] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl mt-[260px] mx-auto block text-[20px]"
                    onClick={()=>{
                        navigate("/login")
                    }}
                    > Akses fitur lebih banyak <br /> dengan login terlebih dahulu :) <br /> <br /> Tekan disini untuk Login</button>}
                    
                </main>
            
            <Footer />
        </>
       
    );
}
export default Profile;