import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import TopHeader from "../Layout/TopHeader"
import Footer from "../Layout/Footer"
import SectionTilte from "../Layout/SectionTitle"
import FormLabel from "../Layout/FormLabel"
import { FaRegEdit } from "react-icons/fa"
import { AiOutlineDelete } from "react-icons/ai"
import { Base_Url } from "../API/Base_Url"

const Contact = () => {
    const [phone, setphone] = useState("")
    const [whatsapp, setwhatsapp] = useState("")
    const [email, setemail] = useState("")
    const [data, setData] = useState([])
    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchContact = async () => {
        try {
            const resp = await axios.get(`${Base_Url}api/contact`)
            if (resp.data.success && resp.data.data) {
                setData([resp.data.data])
            } else {
                setData([])
            }
        } catch {
            toast.error("Failed to fetch contact")
        }
    }

    useEffect(() => {
        fetchContact()
    }, [])

    const handleSubmit = async () => {
        if (!phone.trim()) return toast.error("Phone required")
        if (!whatsapp.trim()) return toast.error("WhatsApp required")
        if (!email.trim()) return toast.error("Email required")

        const payload = { phone, whatsapp, email }

        try {
            setLoading(true)

            const resp = editId
                ? await axios.put(`${Base_Url}api/contact/${editId}`, payload)
                : await axios.post(`${Base_Url}api/contact`, payload)

            if (resp.data.success) {
                toast.success(resp.data.message)
                setphone("")
                setwhatsapp("")
                setemail("")
                setEditId(null)
                fetchContact()
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
        setphone(item.phone)
        setwhatsapp(item.whatsapp)
        setemail(item.email)
        setEditId(item._id)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return

        try {
            const resp = await axios.delete(`${Base_Url}api/contact/${id}`)
            if (resp.data.success) {
                toast.success(resp.data.message)
                fetchContact()
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
                    <SectionTilte title="Contact" />

                    {/* 🔹 FORM */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <FormLabel label="Phone Number" />
                            <input
                                type="text"
                                className="rounded w-full border p-2"
                                value={phone}
                                onChange={(e) => setphone(e.target.value)}
                            />
                        </div>

                        <div>
                            <FormLabel label="WhatsApp Number" />
                            <input
                                type="text"
                                className="rounded w-full border p-2"
                                value={whatsapp}
                                onChange={(e) => setwhatsapp(e.target.value)}
                            />
                        </div>

                        <div>
                            <FormLabel label="Email ID" />
                            <input
                                type="text"
                                className="rounded w-full border p-2"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>

                        <div className="md:col-span-3 pt-2">
                            <button
                                disabled={loading}
                                onClick={handleSubmit}
                                className="w-full md:w-auto text-xs uppercase text-white px-6 py-3 rounded bg-blue-500 disabled:opacity-60"
                            >
                                {loading
                                    ? "PLEASE WAIT..."
                                    : editId
                                    ? "UPDATE"
                                    : "SUBMIT"}
                            </button>
                        </div>
                    </div>

                    {/* 🔹 DESKTOP TABLE */}
                    <div className="pt-6 hidden md:block">
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#FAFAFA] text-sm font-semibold">
                                    <th className="p-3 text-left">Phone</th>
                                    <th className="p-3 text-left">WhatsApp</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6">
                                            No contact found
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((itm) => (
                                        <tr key={itm._id} className="bg-white shadow text-sm">
                                            <td className="p-3">{itm.phone}</td>
                                            <td className="p-3">{itm.whatsapp}</td>
                                            <td className="p-3">{itm.email}</td>

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
                            <p className="text-center">No contact found</p>
                        ) : (
                            data.map((itm) => (
                                <div key={itm._id} className="bg-white rounded-xl shadow p-4">

                                    <div className="space-y-1">
                                        <p className="text-sm"><b>Phone:</b> {itm.phone}</p>
                                        <p className="text-sm"><b>WhatsApp:</b> {itm.whatsapp}</p>
                                        <p className="text-sm"><b>Email:</b> {itm.email}</p>
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

export default Contact