//import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from '../assets/Image/logo.png'
import { AiOutlineLogout } from "react-icons/ai";
import product from '../assets/Image/product.png'
import popup from '../assets/Image/popup.png'
import blog from '../assets/Image/blog.png'
import contact from '../assets/Image/contacts.png'
import team from '../assets/Image/team.png'
import customer from '../assets/Image/customer.png'
import Register from '../assets/Image/register.png'
import user from '../assets/Image/user.png'
const Sidebar = ({ closeSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const handlelogout = () => {
        localStorage.clear();
        navigate('/login')
    }
    return (
        <>

            <div className="w-full  h-[100%] overflow-x-hidden overflow-y-au
            to relative bg-black">
               {/* Mobile Top */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700 md:hidden">
                <h2 className="text-white font-semibold">Menu</h2>
                <button onClick={closeSidebar} className="text-white text-xl">✕</button>
            </div>

            {/* Logo */}
            <div className="flex justify-center items-center py-4 border-b border-gray-700 lg:block hidden">
                <div className=" rounded-md p-2">
                    <img src={logo} className="h-[40px]" />
                </div>
            </div>

                <ul className="*:py-1 px-3 *:text-sm *:font-light *:text-primary">

                    <li>
                        <Link  onClick={closeSidebar} to={'/popup-content'} className='w-full  py-2  text-start block  text-white'>
                            <div className="w-full flex gap-2 items-center">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center ${location.pathname === "/popup-content" ? "text-secondary" : ""}`}>
                                    <img src={popup} className="h-[30px]" />

                                </div>
                                <div className={` font-[500] text-[16px] ${location.pathname === '/popup-content' ? "text-secondary" : "text-white"}`}>
                                    Popup Content
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link  onClick={closeSidebar} to={'/product'} className='w-full  py-2  text-start block  text-white'>
                            <div className="w-full flex gap-2 items-center">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center ${location.pathname === "/product" ? "text-secondary" : ""}`}>

                                    <img src={product} className="h-[30px]" />


                                </div>
                                <div className={` font-[500] text-[16px] ${location.pathname === '/product' ? "text-secondary" : "text-white"}`}>
                                    Product
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link  onClick={closeSidebar} to={'/blog'} className='w-full  py-2  text-start block  text-white'>
                            <div className="w-full flex gap-2 items-center">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center ${location.pathname === "/blog" ? "text-secondary" : ""}`}>
                                    <img src={blog} className="h-[30px]" />

                                </div>
                                <div className={` font-[500] text-[16px] ${location.pathname === '/blog' ? "text-secondary" : "text-white"}`}>
                                    Blog
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link  onClick={closeSidebar} to={'/companyoverview'} className='w-full  py-2  text-start block  text-white'>
                            <div className="w-full flex gap-2 items-center">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center ${location.pathname === "/companyoverview" ? "text-secondary" : ""}`}>
                                    <img src={team} className="h-[30px]" />

                                </div>
                                <div className={` font-[500] text-[16px] ${location.pathname === '/companyoverview' ? "text-secondary" : "text-white"}`}>
                                    Team
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link  onClick={closeSidebar} to={'/contact'} className='w-full  py-2  text-start block  text-white'>
                            <div className="w-full flex gap-2 items-center">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center ${location.pathname === "/contact" ? "text-secondary" : ""}`}>
                                    <img src={contact} className="h-[30px]" />

                                </div>
                                <div className={` font-[500] text-[16px] ${location.pathname === '/contact' ? "text-secondary" : "text-white"}`}>
                                    Contact
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link  onClick={closeSidebar} to={'/enquiry-customer'} className='w-full  py-2  text-start block  text-white'>
                            <div className="w-full flex gap-2 items-center">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center ${location.pathname == "/enquiry-customer" ? "text-secondary" : ""}`}>
                                    <img src={customer} className="h-[30px]" />

                                </div>
                                <div className={` font-[500] text-[16px] ${location.pathname === '/enquiry-customer' ? "text-secondary" : "text-white"}`}>
                                    Customer
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link  onClick={closeSidebar} to={'/register-customer'} className='w-full  py-2  text-start block  text-white'>
                            <div className="w-full flex gap-2 items-center">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center ${location.pathname == "/register-customer" ? "text-secondary" : ""}`}>
                                    <img src={Register} className="h-[30px]" />

                                </div>
                                <div className={` font-[500] text-[16px] ${location.pathname === '/register-customer' ? "text-secondary" : "text-white"}`}>
                                    Register Customer
                                </div>
                            </div>
                        </Link>
                    </li>
                        <li>
                        <Link  onClick={closeSidebar} to={'/customer-profile'} className='w-full  py-2  text-start block  text-white'>
                            <div className="w-full flex gap-2 items-center">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center ${location.pathname =="/customer-profile" ? "text-secondary" : ""}`}>
                                    <img src={user} className="h-[30px]" />

                                </div>
                                <div className={` font-[500] text-[16px] ${location.pathname === '/customer-profile' ? "text-secondary" : "text-white"}`}>
                                 Customer Profile
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link className='w-full  py-2  text-start block  text-white'>
                            <div className="w-full flex gap-2 items-center" onClick={handlelogout}>
                                <div className={`h-[40px] w-[40px] flex justify-center items-center ${location.pathname === "/" ? "text-secondary" : ""}`}>
                                    <AiOutlineLogout className="text-light text-2xl  " />

                                </div>
                                <div className={` font-[500]  text-[16px] ${location.pathname === '/' ? "text-secondary" : "text-white"}`}>
                                    Logout
                                </div>
                            </div>
                        </Link>
                    </li>





                </ul>
            </div>
        </>
    )
}

export default Sidebar