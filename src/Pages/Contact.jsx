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

    /* ================= FETCH ================= */
    const fetchContact = async () => {
        try {
            const resp = await axios.get(`${Base_Url}api/contact`)
            if (resp.data.success && resp.data.data) {
                setData([resp.data.data]) // single record
            } else {
                setData([])
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch contact")
        }
    }

    useEffect(() => {
        fetchContact()
    }, [])

    /* ================= SUBMIT ================= */
    const handleSubmit = async () => {
        if (!phone.trim()) {
            toast.error("Phone number is required")
            return
        }

        if (!whatsapp.trim()) {
            toast.error("WhatsApp number is required")
            return
        }

        if (!email.trim()) {
            toast.error("Email is required")
            return
        }

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
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    /* ================= EDIT ================= */
    const handleEdit = (item) => {
        setphone(item.phone)
        setwhatsapp(item.whatsapp)
        setemail(item.email)
        setEditId(item._id)
    }

    /* ================= DELETE ================= */
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
        } catch (error) {
            console.log(error)
            toast.error("Delete failed")
        }
    }

    return (
        <>
            <TopHeader />

            <section className="py-2 px-4">
                <div className="container">
                    <SectionTilte title="Contact" />

                    <div className="grid grid-cols-3 gap-4 items-end">
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

                        <div className="pt-2">
                            <button
                                disabled={loading}
                                onClick={handleSubmit}
                                className="text-xs uppercase text-white px-6 py-2 rounded bg-blue-500 disabled:opacity-60"
                            >
                                {loading
                                    ? "Please wait..."
                                    : editId
                                    ? "UPDATE"
                                    : "SUBMIT"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= TABLE ================= */}
                <div className="pt-6">
                    <table className="w-full border-separate border-spacing-y-1">
                        <thead>
                            <tr className="bg-[#FAFAFA] text-sm font-bold">
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">WhatsApp</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        No contact found
                                    </td>
                                </tr>
                            ) : (
                                data.map((itm) => (
                                    <tr key={itm._id} className="bg-white text-sm">
                                        <td className="p-3">{itm.phone}</td>
                                        <td className="p-3">{itm.whatsapp}</td>
                                        <td className="p-3">{itm.email}</td>
                                        <td className="p-3">
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleEdit(itm)}
                                                    className="shadow p-2 rounded"
                                                >
                                                    <FaRegEdit className="text-blue-500 text-lg" />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(itm._id)}
                                                    className="shadow p-2 rounded"
                                                >
                                                    <AiOutlineDelete className="text-red-500 text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Contact
