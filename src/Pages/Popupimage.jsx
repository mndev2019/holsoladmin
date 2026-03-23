import React, { useEffect, useState } from 'react'
import TopHeader from '../Layout/TopHeader'
import Footer from '../Layout/Footer'
import SectionTilte from '../Layout/SectionTitle'
import FormLabel from '../Layout/FormLabel'
import axios from 'axios'
import { Base_Url } from '../API/Base_Url'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'

const Popupimage = () => {
    const [data, setData] = useState([])
    const [image, setImage] = useState(null)
    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleget = async () => {
        try {
            const resp = await axios.get(`${Base_Url}api/popup`)
            if (resp.data.success) {
                setData(resp.data.data)
            } else {
                toast.error(resp.data.message || "Failed to fetch popups")
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch popups")
        }
    }

    useEffect(() => {
        handleget()
    }, [])

    const handleSubmit = async () => {
        if (!image) {
            toast.error("Please select image")
            return
        }

        const formData = new FormData()
        formData.append("image", image)

        try {
            setLoading(true)
            const resp = editId
                ? await axios.put(`${Base_Url}api/popup/${editId}`, formData)
                : await axios.post(`${Base_Url}api/popup`, formData)

            if (resp.data.success) {
                toast.success(resp.data.message)
                setImage(null)
                setEditId(null)
                handleget()
            } else {
                toast.error(resp.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this popup?")) return

        try {
            const resp = await axios.delete(`${Base_Url}api/popup/${id}`)
            if (resp.data.success) {
                toast.success(resp.data.message)
                handleget()
            } else {
                toast.error(resp.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Delete failed")
        }
    }

    const handleEdit = (id) => {
        setEditId(id)
        toast.info("Select a new image and click UPDATE")
    }

    return (
        <>
            <TopHeader />

            <section className="py-4 px-3 md:px-6">
                <div className="container mx-auto">
                    <SectionTilte title="Change Popup" />

                    {/* Upload Form */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                            <FormLabel label="Popup Image" />
                            <input
                                type="file"
                                accept="image/*"
                                className="rounded w-full border p-2"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>

                        <div className="pt-2 md:pt-6">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`w-full md:w-auto text-xs uppercase text-white px-5 rounded py-3 
                                    ${loading ? "bg-gray-400" : "bg-blue-500"}`}
                            >
                                {loading ? "PLEASE WAIT..." : editId ? "UPDATE" : "SUBMIT"}
                            </button>
                        </div>
                    </div>

                    {/* ================= DESKTOP TABLE ================= */}
                    <div className="pt-6 hidden md:block">
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#FAFAFA] text-sm font-bold">
                                    <th className="p-3 text-left">Popup Image</th>
                                    <th className="p-3 text-left">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="2" className="text-center py-4">
                                            No popups found
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((itm) => (
                                        <tr key={itm._id} className="bg-white text-sm shadow rounded">
                                            <td className="p-3">
                                                <img
                                                    src={`${Base_Url}${itm.image}`}
                                                    alt="popup"
                                                    className="rounded-full h-[50px] w-[50px] object-cover"
                                                />
                                            </td>

                                            <td className="p-3">
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleEdit(itm._id)}
                                                        className="shadow p-2 rounded"
                                                    >
                                                        <FaRegEdit className="text-blue-500 text-xl" />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(itm._id)}
                                                        className="shadow p-2 rounded"
                                                    >
                                                        <AiOutlineDelete className="text-red-500 text-xl" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ================= MOBILE CARD VIEW ================= */}
                    <div className="pt-6 md:hidden space-y-4">
                        {data.length === 0 ? (
                            <p className="text-center">No popups found</p>
                        ) : (
                            data.map((itm) => (
                                <div key={itm._id} className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                                    
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`${Base_Url}${itm.image}`}
                                            alt="popup"
                                            className="h-[60px] w-[60px] rounded-full object-cover"
                                        />
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleEdit(itm._id)}
                                            className="bg-blue-100 p-2 rounded"
                                        >
                                            <FaRegEdit className="text-blue-600 text-lg" />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(itm._id)}
                                            className="bg-red-100 p-2 rounded"
                                        >
                                            <AiOutlineDelete className="text-red-600 text-lg" />
                                        </button>
                                    </div>

                                </div>
                            ))
                        )}
                    </div>

                </div>
            </section>

            <Footer />
        </>
    )
}

export default Popupimage