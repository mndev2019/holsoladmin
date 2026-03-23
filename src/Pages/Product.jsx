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

const Product = () => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState(null)
    const [data, setData] = useState([])
    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchProducts = async () => {
        try {
            const resp = await axios.get(`${Base_Url}api/product`)
            if (resp.data.success) {
                setData(resp.data.data)
            } else {
                toast.error(resp.data.message)
            }
        } catch (error) {
             console.log(error)
            toast.error("Failed to fetch products")
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleSubmit = async () => {
        if (!title.trim()) {
            toast.error("Title is required")
            return
        }

        if (!image && !editId) {
            toast.error("Image is required")
            return
        }

        const formData = new FormData()
        formData.append("title", title)
        if (image) formData.append("image", image)

        try {
            setLoading(true)
            const resp = editId
                ? await axios.put(`${Base_Url}api/product/${editId}`, formData)
                : await axios.post(`${Base_Url}api/product`, formData)

            if (resp.data.success) {
                toast.success(resp.data.message)
                setTitle("")
                setImage(null)
                setEditId(null)
                fetchProducts()
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

    const handleEdit = (item) => {
        setEditId(item._id)
        setTitle(item.title)
        toast.info("Update title/image and click UPDATE")
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return

        try {
            const resp = await axios.delete(`${Base_Url}api/product/${id}`)
            if (resp.data.success) {
                toast.success(resp.data.message)
                fetchProducts()
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

            <section className="py-4 px-3 md:px-6">
                <div className="container mx-auto">
                    <SectionTilte title="Add Product" />

                    {/* 🔹 Responsive Form */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                            <FormLabel label="Product Title" />
                            <input
                                type="text"
                                placeholder="Enter product title"
                                className="rounded w-full border p-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <FormLabel label="Product Image" />
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
                                <tr className="bg-[#FAFAFA] text-sm font-bold">
                                    <th className="p-3 text-left">Title</th>
                                    <th className="p-3 text-left">Image</th>
                                    <th className="p-3 text-left">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4">
                                            No product found
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((itm) => (
                                        <tr key={itm._id} className="bg-white text-sm shadow">
                                            <td className="p-3">{itm.title}</td>

                                            <td className="p-3">
                                                <img
                                                    src={`${Base_Url}${itm.image}`}
                                                    alt="product"
                                                    className="h-[50px] w-[50px] rounded-full object-cover"
                                                />
                                            </td>

                                            <td className="p-3">
                                                <div className="flex gap-3">
                                                    <button onClick={() => handleEdit(itm)} className="shadow p-2 rounded">
                                                        <FaRegEdit className="text-blue-500 text-xl" />
                                                    </button>

                                                    <button onClick={() => handleDelete(itm._id)} className="shadow p-2 rounded">
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

                    {/* 🔹 MOBILE CARD VIEW */}
                    <div className="pt-6 md:hidden space-y-4">
                        {data.length === 0 ? (
                            <p className="text-center">No product found</p>
                        ) : (
                            data.map((itm) => (
                                <div key={itm._id} className="bg-white rounded-xl shadow p-4">
                                    
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={`${Base_Url}${itm.image}`}
                                            alt="product"
                                            className="h-[60px] w-[60px] rounded-full object-cover"
                                        />

                                        <div>
                                            <p className="font-semibold text-sm">{itm.title}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => handleEdit(itm)}
                                            className="flex-1 bg-blue-100 p-2 rounded text-blue-600"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(itm._id)}
                                            className="flex-1 bg-red-100 p-2 rounded text-red-600"
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

export default Product