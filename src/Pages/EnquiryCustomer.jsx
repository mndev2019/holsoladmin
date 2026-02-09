import React, { useState } from 'react'
import TopHeader from '../Layout/TopHeader'
import Footer from '../Layout/Footer'
import { Base_Url } from '../API/Base_Url';
import axios from 'axios';
import { toast } from 'react-toastify';
import SectionTilte from '../Layout/SectionTitle';

const EnquiryCustomer = () => {
     const [data, setData] = useState([]);

    // 🔹 Get customer
    const fetchCustomer = async () => {
        try {
            const resp = await axios.get(`${Base_Url}api/enquiry`)
            if (resp.data.success) {
                setData(resp.data.data)
            } else {
                toast.error(resp.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch customer")
        }
    }

    React.useEffect(() => {
        fetchCustomer()
    }, [])
    return (
        <>
            <TopHeader />
             <section className="py-4 px-4">
                <div className="container mx-auto">
                    <SectionTilte title="Customer Management" />

                    <div className="pt-6 overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#FAFAFA] text-sm font-semibold">
                                  
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Phone</th>
                                    <th className="p-3 text-left">State</th>
                                    <th className="p-3 text-left">City</th>
                                    <th className="p-3 text-left">Pincode</th>
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
                                           

                                           
                                            <td className="p-3">{itm.name}</td>

                                        
                                            <td className="p-3">{itm.mobile}</td>
                                            <td className="p-3">{itm.state}</td>
                                            <td className="p-3">{itm.city}</td>

                                        
                                            <td className="p-3">{itm.pincode}</td>
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
    )
}

export default EnquiryCustomer
