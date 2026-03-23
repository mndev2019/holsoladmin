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

const CompanyOverview = () => {
    const [name, setname] = useState("")
    const [designation, setdesignation] = useState("")
    const [image, setImage] = useState(null)
    const [data, setData] = useState([])
    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchteam = async () => {
        try {
            const resp = await axios.get(`${Base_Url}api/team`)
            if (resp.data.success) {
                setData(resp.data.data)
            } else {
                toast.error(resp.data.message)
            }
        } catch {
            toast.error("Failed to fetch team")
        }
    }

    useEffect(() => {
        fetchteam()
    }, [])

    const handleSubmit = async () => {
        if (!name.trim()) return toast.error("Name is required")
        if (!designation.trim()) return toast.error("Designation is required")
        if (!image && !editId) return toast.error("Image is required")

        const formData = new FormData()
        formData.append("name", name)
        formData.append("designation", designation)
        if (image) formData.append("image", image)

        try {
            setLoading(true)
            const resp = editId
                ? await axios.put(`${Base_Url}api/team/${editId}`, formData)
                : await axios.post(`${Base_Url}api/team`, formData)

            if (resp.data.success) {
                toast.success(resp.data.message)
                setname("")
                setdesignation("")
                setImage(null)
                setEditId(null)
                fetchteam()
            } else {
                toast.error(resp.data.message)
            }
        } catch {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (item) => {
        setEditId(item._id)
        setname(item.name)
        setdesignation(item.designation)
        toast.info("Update and click UPDATE")
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return

        try {
            const resp = await axios.delete(`${Base_Url}api/team/${id}`)
            if (resp.data.success) {
                toast.success(resp.data.message)
                fetchteam()
            } else {
                toast.error(resp.data.message)
            }
        } catch {
            toast.error("Delete failed")
        }
    }

    return (
        <>
            <TopHeader />

            <section className="py-4 px-3 md:px-6">
                <div className="container mx-auto">
                    <SectionTilte title="Team Management" />

                    {/* 🔹 FORM */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                            <FormLabel label="Name" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                className="rounded w-full border p-2"
                                placeholder="Enter name"
                            />
                        </div>

                        <div>
                            <FormLabel label="Designation" />
                            <input
                                type="text"
                                value={designation}
                                onChange={(e) => setdesignation(e.target.value)}
                                className="rounded w-full border p-2"
                                placeholder="Enter designation"
                            />
                        </div>

                        <div>
                            <FormLabel label="Team Image" />
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

                    {/* 🔹 DESKTOP TABLE */}
                    <div className="pt-6 hidden md:block">
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#FAFAFA] text-sm font-semibold">
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Designation</th>
                                    <th className="p-3 text-center">Image</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6">
                                            No team found
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((itm) => (
                                        <tr key={itm._id} className="bg-white shadow text-sm">
                                            <td className="p-3">{itm.name}</td>
                                            <td className="p-3">{itm.designation}</td>

                                            <td className="p-3 text-center">
                                                <img
                                                    src={`${Base_Url}${itm.image}`}
                                                    className="h-10 w-10 rounded-full mx-auto object-cover"
                                                />
                                            </td>

                                            <td className="p-3">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(itm)}
                                                        className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full"
                                                    >
                                                        <FaRegEdit className="text-blue-600" />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(itm._id)}
                                                        className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
                                                    >
                                                        <AiOutlineDelete className="text-red-600" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* 🔹 MOBILE CARD VIEW */}
                    <div className="md:hidden pt-6 space-y-4">
                        {data.length === 0 ? (
                            <p className="text-center">No team found</p>
                        ) : (
                            data.map((itm) => (
                                <div key={itm._id} className="bg-white rounded-xl shadow p-4">

                                    <div className="flex items-center gap-4">
                                        <img
                                            src={`${Base_Url}${itm.image}`}
                                            className="h-16 w-16 rounded-full object-cover"
                                        />

                                        <div>
                                            <p className="font-semibold">{itm.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {itm.designation}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => handleEdit(itm)}
                                            className="flex-1 bg-blue-100 text-blue-600 py-2 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(itm._id)}
                                            className="flex-1 bg-red-100 text-red-600 py-2 rounded"
                                        >
                                            Delete
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

export default CompanyOverview