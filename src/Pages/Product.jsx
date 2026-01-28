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

    // 🔹 Get products
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

    // 🔹 Create / Update product
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

    // 🔹 Edit product
    const handleEdit = (item) => {
        setEditId(item._id)
        setTitle(item.title)
        toast.info("Update title/image and click UPDATE")
    }

    // 🔹 Delete product
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

            <section className="py-2 px-4">
                <div className="container">
                    <SectionTilte title="Add Product" />

                    {/* 🔹 Form */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="col-span-1">
                            <FormLabel label="Product Title" />
                            <input
                                type="text"
                                placeholder="Enter product title"
                                className="rounded w-full border p-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="col-span-1">
                            <FormLabel label="Product Image" />
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
                                {editId ? "UPDATE" : "SUBMIT"}
                            </button>
                        </div>
                    </div>

                    {/* 🔹 Product List */}
                    <div className="pt-5">
                        <table className="w-full border-separate border-spacing-y-1">
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
                                        <tr key={itm._id} className="bg-white text-sm">
                                            <td className="p-3">{itm.title}</td>

                                            <td className="p-3">
                                                <img
                                                    src={`${Base_Url}${itm.image}`}
                                                    alt="product"
                                                    className="rounded-full h-[40px] w-[40px] object-cover"
                                                />
                                            </td>

                                            <td className="p-3">
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleEdit(itm)}
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

export default Product
