import React, { useState} from "react";
import TopHeader from "../Layout/TopHeader";
import Footer from "../Layout/Footer";
import SectionTilte from "../Layout/SectionTitle";
import axios from "axios";
import { Base_Url } from "../API/Base_Url";
import { toast } from "react-toastify";

const RegisterCoustomer = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    // 🔹 Fetch Users
    const fetchRegisterUser = async () => {
        try {
            const resp = await axios.get(`${Base_Url}api/web-users`);
            if (resp.data.success) {
                setData(resp.data.users);
            } else {
                toast.error(resp.data.message);
            }
        } catch {
            toast.error("Failed to fetch User");
        }
    };

    React.useEffect(() => {
        fetchRegisterUser();
    }, []);

    // 🔍 SEARCH FILTER
    const filteredData = data.filter((item) => {
        const text = search.toLowerCase();

        return (
            item.name?.toLowerCase().includes(text) ||
            item.email?.toLowerCase().includes(text) ||
            item.mobile?.toLowerCase().includes(text) ||
            item.city?.toLowerCase().includes(text) ||
            item.address?.toLowerCase().includes(text)
        );
    });

    return (
        <>
            <TopHeader />

            <section className="py-4 px-3 md:px-6">
                <div className="container mx-auto">
                    <SectionTilte title="Register Customer" />

                    {/* 🔍 SEARCH */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by name, email, mobile..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border rounded px-3 py-2 w-full md:w-[300px]"
                        />
                    </div>

                    {/* 🔹 DESKTOP TABLE */}
                    <div className="hidden md:block overflow-x-auto">
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
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-gray-500">
                                            No customers found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((itm) => (
                                        <tr key={itm._id} className="bg-white shadow text-sm">
                                            <td className="p-3">{itm.name}</td>
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

                    {/* 🔹 MOBILE CARD VIEW */}
                    <div className="md:hidden space-y-4">
                        {filteredData.length === 0 ? (
                            <p className="text-center text-gray-500">
                                No customers found
                            </p>
                        ) : (
                            filteredData.map((itm) => (
                                <div key={itm._id} className="bg-white rounded-xl shadow p-4">

                                    <p className="font-semibold">{itm.name}</p>

                                    <div className="text-sm text-gray-600 mt-2 space-y-1">
                                        <p><b>Phone:</b> {itm.mobile}</p>
                                        <p><b>Email:</b> {itm.email}</p>
                                        <p><b>City:</b> {itm.city}</p>
                                        <p><b>Address:</b> {itm.address}</p>
                                    </div>

                                </div>
                            ))
                        )}
                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
};

export default RegisterCoustomer;