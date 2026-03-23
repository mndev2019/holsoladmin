import React, { useState } from 'react'
import TopHeader from '../Layout/TopHeader'
import Footer from '../Layout/Footer'
import SectionTilte from '../Layout/SectionTitle'
import FormLabel from '../Layout/FormLabel'
import { Base_Url } from '../API/Base_Url'
import axios from 'axios'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'

const Blog = () => {
    const [data, setData] = useState([])
    const [title, setTitle] = useState("")
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [editId, setEditId] = useState(null)

    // 🔹 GET BLOGS
    const getBlogs = async () => {
        try {
            const res = await axios.get(`${Base_Url}api/blog`)
            if (res.data.success) {
                setData(res.data.data)
            }
        } catch {
            toast.error("Failed to fetch blogs")
        }
    }

    React.useEffect(() => {
        getBlogs()
    }, [])

    // 🔹 FILE
    const handleFile = (e) => {
        setImage(e.target.files[0])
    }

    // 🔹 CREATE / UPDATE
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !shortDescription || !description) {
            toast.error("All fields required")
            return
        }

        const formData = new FormData()
        formData.append("title", title)
        formData.append("shortDescription", shortDescription)
        formData.append("description", description)
        if (image) formData.append("image", image)

        try {
            const res = editId
                ? await axios.put(`${Base_Url}api/blog/${editId}`, formData)
                : await axios.post(`${Base_Url}api/blog`, formData)

            if (res.data.success) {
                toast.success(res.data.message)
                resetForm()
                getBlogs()
            } else {
                toast.error(res.data.message)
            }
        } catch {
            toast.error("Something went wrong")
        }
    }

    // 🔹 EDIT
    const handleEdit = (blog) => {
        setEditId(blog._id)
        setTitle(blog.title)
        setShortDescription(blog.shortDescription)
        setDescription(blog.description)
        setImage(null)
        toast.info("Edit mode enabled")
    }

    // 🔹 DELETE
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return

        try {
            const res = await axios.delete(`${Base_Url}api/blog/${id}`)
            if (res.data.success) {
                toast.success(res.data.message)
                getBlogs()
            } else {
                toast.error(res.data.message)
            }
        } catch {
            toast.error("Delete failed")
        }
    }

    const resetForm = () => {
        setEditId(null)
        setTitle("")
        setShortDescription("")
        setDescription("")
        setImage(null)
    }

    const limitWords = (text, limit) => {
        if (!text) return ""
        const words = text.split(" ")
        return words.length > limit
            ? words.slice(0, limit).join(" ") + "..."
            : text
    }

    return (
        <>
            <TopHeader />

            <section className="py-4 px-3 md:px-6">
                <div className="container mx-auto">
                    <SectionTilte title={editId ? "Edit Blog" : "Add Blog"} />

                    {/* 🔹 FORM */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <FormLabel label="Blog Title" />
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="border p-2 w-full rounded"
                                />
                            </div>

                            <div>
                                <FormLabel label="Blog Image" />
                                <input
                                    type="file"
                                    onChange={handleFile}
                                    className="border p-2 w-full rounded"
                                />
                            </div>

                            <div>
                                <FormLabel label="Short Description" />
                                <input
                                    value={shortDescription}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    className="border p-2 w-full rounded"
                                />
                            </div>

                            <div className="md:col-span-3">
                                <FormLabel label="Description" />
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="border p-2 w-full rounded"
                                    rows={4}
                                />
                            </div>

                            <div className="flex gap-2">
                                <button className="w-full md:w-auto bg-blue-500 text-xs uppercase text-white px-5 rounded py-3">
                                    {editId ? "UPDATE" : "SUBMIT"}
                                </button>

                                {editId && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="w-full md:w-auto bg-gray-400 text-xs uppercase text-white px-5 rounded py-3"
                                    >
                                        CANCEL
                                    </button>
                                )}
                            </div>

                        </div>
                    </form>

                    {/* 🔹 DESKTOP TABLE */}
                    <div className="pt-6 hidden md:block overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#FAFAFA] text-sm font-semibold">
                                    <th className="p-3 text-left">Title</th>
                                    <th className="p-3 text-center">Image</th>
                                    <th className="p-3 text-left">Short Desc</th>
                                    <th className="p-3 text-left">Description</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6">
                                            No blog found
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((blog) => (
                                        <tr key={blog._id} className="bg-white shadow text-sm">
                                            <td className="p-3">{blog.title}</td>

                                            <td className="p-3">
                                                <img
                                                    src={`${Base_Url}${blog.image}`}
                                                    className="h-10 w-10 rounded-full mx-auto"
                                                />
                                            </td>

                                            <td className="p-3">
                                                {limitWords(blog.shortDescription, 20)}
                                            </td>

                                            <td className="p-3">
                                                {limitWords(blog.description, 30)}
                                            </td>

                                            <td className="p-3">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(blog)}
                                                        className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full"
                                                    >
                                                        <FaRegEdit className="text-blue-600" />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(blog._id)}
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
                            <p className="text-center">No blog found</p>
                        ) : (
                            data.map((blog) => (
                                <div key={blog._id} className="bg-white rounded-xl shadow p-4">

                                    <div className="flex gap-4">
                                        <img
                                            src={`${Base_Url}${blog.image}`}
                                            className="h-16 w-16 rounded-lg object-cover"
                                        />

                                        <div>
                                            <p className="font-semibold text-sm">{blog.title}</p>
                                            <p className="text-xs text-gray-500">
                                                {limitWords(blog.shortDescription, 10)}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-sm mt-3 text-gray-600">
                                        {limitWords(blog.description, 20)}
                                    </p>

                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="flex-1 bg-blue-100 text-blue-600 py-2 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(blog._id)}
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

export default Blog