import React, { useState } from "react";
import TopHeader from "../Layout/TopHeader";
import Footer from "../Layout/Footer";
import SectionTilte from "../Layout/SectionTitle";
import axios from "axios";
import { Base_Url } from "../API/Base_Url";
import { toast } from "react-toastify";


const RegisterCoustomer = () => {

   
     const [data, setData] = useState([]);

    
    const fetchRegisterUser = async () => {
        try {
            const resp = await axios.get(`${Base_Url}api/web-users`)
            if (resp.data.success) {
                console.log(resp.data)
               setData(resp.data.users);

            } else {
                toast.error(resp.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch User")
        }
    }

    React.useEffect(() => {
        fetchRegisterUser()
    }, [])

    return (
        <>
            <TopHeader />

            <section className="py-4 px-4">
                <div className="container mx-auto">
                    <SectionTilte title="Register Customer" />

                    <div className="pt-6 overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#FAFAFA] text-sm font-semibold">

                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Phone</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">City</th>
                                    <th className="p-3 text-left">Address</th>
                                
                                </tr>
                            </thead>

                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td className="text-center py-6 text-gray-500">
                                            No customers found
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((itm) => (
                                        <tr
                                            key={itm._id}
                                            className="bg-white shadow-sm rounded"
                                        >
                                            {/* NAME */}
                                            <td className="p-3">{itm.name}</td>
                                            {/* PHONE */}
                                            <td className="p-3">{itm.mobile}</td>
                                            <td className="p-3">{itm.email}</td>
                                            <td className="p-3">{itm.city}</td>
                                            <td className="p-3">{itm.address}</td>
                                           
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default RegisterCoustomer;
