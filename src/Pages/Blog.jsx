import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
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
        if (!text) return "";
        const words = text.split(" ");
        return words.length > limit
            ? words.slice(0, limit).join(" ") + "..."
            : text;
    };


    return (
        <>
            <TopHeader />

            <section className="py-2 px-4">
                <div className="container">
                    <SectionTilte title={editId ? "Edit Blog" : "Add Blog"} />

                    {/* FORM */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-3 gap-4">

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

                            <div className="col-span-3">
                                <FormLabel label="Description" />
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="border p-2 w-full rounded"
                                />
                            </div>

                            <div className="flex gap-2">
                                <button className="bg-blue-400 text-xs uppercase text-white px-5 rounded py-3">
                                    {editId ? "UPDATE" : "SUBMIT"}
                                </button>

                                {editId && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="bg-gray-400 text-xs uppercase text-white px-5 rounded py-3"
                                    >
                                        CANCEL
                                    </button>
                                )}
                            </div>

                        </div>
                    </form>

                    {/* LIST */}
                    <div className="pt-5 overflow-x-auto">
                        <table className="w-full table-fixed border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#FAFAFA] text-sm font-semibold text-gray-700">
                                    <th className="p-3 w-[15%] text-left">Title</th>
                                    <th className="p-3 w-[10%] text-center">Image</th>
                                    <th className="p-3 w-[25%] text-left">Short Desc</th>
                                    <th className="p-3 w-[30%] text-left">Description</th>
                                    <th className="p-3 w-[10%] text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data?.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-gray-500">
                                            No blog found
                                        </td>
                                    </tr>
                                ) : (
                                    data?.map(blog => (
                                        <tr
                                            key={blog._id}
                                            className="bg-white text-sm shadow-sm rounded"
                                        >
                                            {/* Title */}
                                            <td className="p-3 font-medium break-words">
                                                {blog.title}
                                            </td>

                                            {/* Image */}
                                            <td className="p-3">
                                                <img
                                                    src={`${Base_Url}${blog.image}`}
                                                    alt="blog"
                                                    className="h-10 w-10 rounded-full object-cover mx-auto"
                                                />
                                            </td>

                                            {/* Short Description */}
                                            <td className="p-3 break-words">
                                                <div className="line-clamp-3">
                                                    {limitWords(blog.shortDescription, 30)}
                                                </div>
                                            </td>

                                            {/* Description */}
                                            <td className="p-3 break-words">
                                                <div className="line-clamp-4">
                                                    {limitWords(blog.description, 40)}
                                                </div>
                                            </td>

                                            {/* Action */}
                                            <td className="p-3">
                                                <div className="flex gap-3 justify-center">
                                                    <button onClick={() => handleEdit(blog)}>
                                                        <FaRegEdit className="text-blue-500 text-xl hover:scale-110 transition" />
                                                    </button>

                                                    <button onClick={() => handleDelete(blog._id)}>
                                                        <AiOutlineDelete className="text-red-500 text-xl hover:scale-110 transition" />
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

export default Blog
