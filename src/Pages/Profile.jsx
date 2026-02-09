import React, { useState } from "react";
import TopHeader from "../Layout/TopHeader";
import Footer from "../Layout/Footer";
import SectionTilte from "../Layout/SectionTitle";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../API/Base_Url";
import { toast } from "react-toastify";


const Profile = () => {
    // for document upload    
    const [docType, setDocType] = useState("");
    const [docFile, setDocFile] = useState(null);
    const [uploadingId, setUploadingId] = useState(null);
    const uploadDocument = async (profileId) => {
        if (!docType || !docFile) {
            toast.error("Select document type & file");
            return;
        }

        const formData = new FormData();
        formData.append("type", docType);
        formData.append("document", docFile);

        try {
            setUploadingId(profileId);

            const resp = await axios.put(
                `${Base_Url}api/admin/profile/${profileId}/document`,
                formData
            );

            if (resp.data.success) {
                toast.success("Document uploaded");
                setDocType("");
                setDocFile(null);
            }
        } catch (error) {
            console.log(error)
            toast.error("Upload failed");
        } finally {
            setUploadingId(null);
        }
    };



    const navigate = useNavigate();




    // 🔹 Status list
    const STATUS_OPTIONS = [
        "Solar Order Received",
        "Technician Assigned",
        "Installation In Progress",
        "Installation Completed",
        "Delivered",
    ];

    const [data, setData] = useState([]);

    // 🔹 Get customer
    const fetchCustomer = async () => {
        try {
            const resp = await axios.get(`${Base_Url}api/admin/profiles`)
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



    // 🔹 Update status locally + on server
    const handleStatusChange = async (id, newStatus) => {
        try {
            // Call the API to update status
            const resp = await axios.put(`${Base_Url}api/admin/profile/${id}/status/`, {
                status: newStatus,
            });

            if (resp.data.success) {
                // Update local state only if API update was successful
                const updatedData = data.map((item) =>
                    item._id === id ? { ...item, status: newStatus } : item
                );
                setData(updatedData);
                toast.success("Status updated successfully");
            } else {
                toast.error(resp.data.message || "Failed to update status");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error updating status");
        }
    };


    // 🔹 Status badge color
    const getStatusColor = (status) => {
        switch (status) {
            case "Solar Order Received":
                return "bg-blue-100 text-blue-700";
            case "Technician Assigned":
                return "bg-purple-100 text-purple-700";
            case "Installation In Progress":
                return "bg-yellow-100 text-yellow-700";
            case "Installation Completed":
                return "bg-green-100 text-green-700";
            case "Delivered":
                return "bg-emerald-100 text-emerald-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <>
            <TopHeader />

            <section className="py-4 px-4">
                <div className="container mx-auto">
                    <SectionTilte title="Customer Profile" />

                    <div className="pt-6 overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#FAFAFA] text-sm font-semibold">
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Phone</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">City</th>
                                    {/* <th className="p-3 text-left">Installation Address</th> */}
                                    <th className="p-3 text-left">Info</th>
                                    {/* for upload document */}
                                    <th className="p-3 text-left">Upload Document</th>

                                </tr>
                            </thead>

                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td className="text-center py-6 text-gray-500">
                                            No profile found
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((itm) => (
                                        <tr
                                            key={itm._id}
                                            className="bg-white shadow-sm rounded"
                                        >
                                            {/* STATUS */}
                                            <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                            itm.status
                                                        )}`}
                                                    >
                                                        {itm.status}
                                                    </span>

                                                    <select
                                                        value={itm.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(itm._id, e.target.value)
                                                        }
                                                        className="border rounded px-2 py-1 text-xs"
                                                    >
                                                        {STATUS_OPTIONS.map((status, index) => (
                                                            <option key={index} value={status}>
                                                                {status}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </td>

                                            {/* NAME */}
                                            <td className="p-3">{itm.full_name}</td>

                                            {/* PHONE */}
                                            <td className="p-3">{itm.mobile}</td>
                                            <td className="p-3">{itm.email}</td>
                                            <td className="p-3">{itm.city}</td>

                                            {/* SOLAR */}
                                            {/* <td className="p-3">{itm.installation_address}</td> */}
                                            <td className="p-3">
                                                <BsFillInfoCircleFill
                                                    size={25}
                                                    onClick={() => navigate("/profile-detail", { state: itm })}
                                                    className="text-green-400 transition-all duration-300 
                                                   hover:scale-125 hover:text-green-500 drop-shadow-md cursor-pointer"
                                                />
                                            </td>

                                            {/* for upload document */}

                                            <td className="p-3">
                                                <select
                                                    className="border text-xs rounded p-1 mb-1 w-full"
                                                    onChange={(e) => setDocType(e.target.value)}
                                                >
                                                    <option value="">Doc Type</option>
                                                    <option value="insurance">Insurance</option>
                                                    <option value="loyalty_card">Loyalty Card</option>
                                                    <option value="warranty">Warranty</option>
                                                    <option value="bill">Bill</option>
                                                    <option value="subsidy">Subsidy</option>
                                                    <option value="certification">Certification</option>
                                                </select>

                                                <input
                                                    type="file"
                                                    className="text-xs mb-1"
                                                    onChange={(e) => setDocFile(e.target.files[0])}
                                                />

                                                <button
                                                    onClick={() => uploadDocument(itm._id)}
                                                    disabled={uploadingId === itm._id}
                                                    className="bg-blue-600 text-white text-xs px-3 py-1 rounded w-full"
                                                >
                                                    {uploadingId === itm._id ? "Uploading..." : "Upload"}
                                                </button>
                                            </td>


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

export default Profile;
