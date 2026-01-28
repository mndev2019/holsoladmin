//import React from 'react'

import { Outlet, useNavigate } from "react-router-dom"
// import Header from "./Header"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useEffect } from "react";

const Layout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token") ?? null;
    useEffect(() => {
        if (token) {
            navigate('/popup-content')
        } else {
            navigate('/login');
        }
    }, [token, navigate]);
    return (
        <>
            {/* <Header/>  */}
            <div className="flex">
                <div className={` overflow-x-hidden bg-transparent transition-all duration-300 w-[15%] min-h-screen`}>
                    <Sidebar />
                </div>
                <div className="w-[85%]">
                    <main className=''>
                        {<Outlet />}
                    </main>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Layout