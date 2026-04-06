import React, { useState } from 'react'
import TopHeader from '../Layout/TopHeader'
import Footer from '../Layout/Footer'
import { Base_Url } from '../API/Base_Url'
import axios from 'axios'
import { toast } from 'react-toastify'
import SectionTilte from '../Layout/SectionTitle'
import moment from 'moment'

const EnquiryCustomer = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [dateFilter, setDateFilter] = useState("")
    const [page, setPage] = useState(1)

    // 🔹 Fetch Data
    const fetchCustomer = async (pageNumber = 1) => {
        try {
            const resp = await axios.get(`${Base_Url}api/enquiry?page=${pageNumber}`)

            if (resp.data.success) {
                setData(resp.data.data) // ✅ replace (pagination)
            } else {
                toast.error(resp.data.message)
            }
        } catch {
            toast.error("Failed to fetch customer")
        }
    }

    React.useEffect(() => {
        fetchCustomer(page)
    }, [page])

    // 🔍 FILTER LOGIC
    const filteredData = data.filter(item => {
        const searchText = search.toLowerCase()

        const matchesSearch =
            item.name?.toLowerCase().includes(searchText) ||
            item.mobile?.toLowerCase().includes(searchText)

        const matchesDate = dateFilter
            ? moment(item.createdAt).format("YYYY-MM-DD") === dateFilter
            : true

        return matchesSearch && matchesDate
    })

    return (
        <>
            <TopHeader />

            <section className="py-4 px-3 md:px-6">
                <div className="container mx-auto">
                    <SectionTilte title="Customer Management" />

                    {/* 🔍 FILTER */}
                    <div className="flex flex-col md:flex-row gap-3 mb-4">

                        <input
                            type="text"
                            placeholder="Search by name or mobile..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border rounded px-3 py-2 w-full md:w-[300px]"
                        />

                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="border rounded px-3 py-2 w-full md:w-[200px]"
                        />

                        <button
                            onClick={() => {
                                setSearch("")
                                setDateFilter("")
                            }}
                            className="bg-gray-200 px-4 py-2 rounded text-sm"
                        >
                            Clear
                        </button>
                    </div>

                    {/* 🔹 TABLE */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#FAFAFA] text-sm font-semibold">
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Phone</th>
                                    <th className="p-3 text-left">State</th>
                                    <th className="p-3 text-left">City</th>
                                    <th className="p-3 text-left">Pincode</th>
                                    <th className="p-3 text-left">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-6 text-gray-500">
                                            No customers found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((itm) => (
                                        <tr key={itm._id} className="bg-white shadow text-sm">
                                            <td className="p-3">{itm.name}</td>
                                            <td className="p-3">{itm.mobile}</td>
                                            <td className="p-3">{itm.state}</td>
                                            <td className="p-3">{itm.city}</td>
                                            <td className="p-3">{itm.pincode}</td>
                                            <td className="p-3">
                                                {moment(itm.createdAt).format("DD MMM YYYY")}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* 🔹 MOBILE */}
                    <div className="md:hidden space-y-4">
                        {filteredData.length === 0 ? (
                            <p className="text-center text-gray-500">
                                No customers found
                            </p>
                        ) : (
                            filteredData.map((itm) => (
                                <div key={itm._id} className="bg-white rounded-xl shadow p-4">
                                    <p className="font-semibold">{itm.name}</p>

                                    <div className="text-sm text-gray-600 mt-2 space-y-1">
                                        <p><b>Phone:</b> {itm.mobile}</p>
                                        <p><b>State:</b> {itm.state}</p>
                                        <p><b>City:</b> {itm.city}</p>
                                        <p><b>Pincode:</b> {itm.pincode}</p>
                                        <p>
                                            <b>Date:</b>{" "}
                                            {moment(itm.createdAt).format("DD MMM YYYY")}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* 🔥 PAGINATION BUTTONS */}
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className={`px-4 py-2 rounded ${
                                page === 1
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-500 text-white"
                            }`}
                        >
                            Previous
                        </button>

                        <span className="px-3 py-2 font-semibold">
                            Page {page}
                        </span>

                        <button
                            onClick={() => setPage(page + 1)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Next
                        </button>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    )
}

export default EnquiryCustomer