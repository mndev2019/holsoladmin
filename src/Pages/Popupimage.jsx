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

    // ✅ Get all popups
    const handleget = async () => {
        try {
            const resp = await axios.get(`${Base_Url}api/popup`)
            if (resp.data.success) {
                setData(resp.data.data)
            } else {
                toast.error(resp.data.message || "Failed to fetch popups")
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to fetch popups")
        }
    }

    useEffect(() => {
        handleget()
    }, [])

    // ✅ Create / Update popup
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
            console.error(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    // ✅ Delete popup
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
            console.error(error)
            toast.error("Delete failed")
        }
    }

    // ✅ Edit popup
    const handleEdit = (id) => {
        setEditId(id)
        toast.info("Select a new image and click UPDATE")
    }

    return (
        <>
            <TopHeader />

            <section className="py-2 px-4">
                <div className="container">
                    <SectionTilte title="Change Popup" />

                    {/* Upload Form */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="col-span-1">
                            <FormLabel label="Popup Image" />
                            <input
                                type="file"
                                accept="image/*"
                                className="rounded w-full border p-2"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>

                        <div className="col-span-1 pt-4">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`text-xs uppercase text-white px-5 rounded py-3 
                                    ${loading ? "bg-gray-400" : "bg-blue-400"}`}
                            >
                                {loading ? "PLEASE WAIT..." : editId ? "UPDATE" : "SUBMIT"}
                            </button>
                        </div>
                    </div>

                    {/* Popup List */}
                    <div className="pt-5">
                        <table className="w-full border-separate border-spacing-y-1">
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
                                        <tr key={itm._id} className="bg-white text-sm">
                                            <td className="p-3">
                                                <img
                                                    src={`${Base_Url}${itm.image}`}
                                                    alt="popup"
                                                    className="rounded-full h-[40px] w-[40px] object-cover"
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

                </div>
            </section>

            <Footer />
        </>
    )
}

export default Popupimage
