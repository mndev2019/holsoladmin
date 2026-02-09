// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// import { FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
// import TopHeader from "../Layout/TopHeader";
// import Footer from "../Layout/Footer";
// import { Base_Url } from "../API/Base_Url";

// const ProfileDetail = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   if (!state) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         No customer data found
//       </div>
//     );
//   }

//   return (
//     <>
//       <TopHeader />

//       <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#e6f0ff] to-[#d0e4ff] px-6 py-10">
//         <div className="max-w-7xl mx-auto space-y-8">

//           {/* HEADER */}
//           <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8 flex justify-between items-center">
//             <div>
//               <h2 className="text-3xl font-bold text-gray-900">
//                 Customer{" "}
//                 <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#00C6FF] to-[#0047FF]">
//                   Profile
//                 </span>
//               </h2>
//               <p className="text-gray-600 mt-1">
//                 View complete customer information & documents
//               </p>
//             </div>

//             <button
//               onClick={() => navigate(-1)}
//               className="px-5 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
//             >
//               ← Back
//             </button>
//           </div>

//           <div className="grid lg:grid-cols-4 gap-8">

//             {/* PROFILE SUMMARY */}
//             <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
//               <FaUserCircle className="text-7xl text-blue-400 mx-auto" />

//               <h3 className="mt-4 text-xl font-semibold text-gray-800">
//                 {state.full_name}
//               </h3>

//               <p className="text-sm text-gray-500">{state.email}</p>

//               <span className="inline-block mt-4 px-4 py-1 rounded-full text-xs font-medium
//                 bg-blue-100 text-blue-700">
//                 {state.status}
//               </span>

//               <div className="mt-6 space-y-3 text-left">
//                 <MiniInfo label="Phone" value={state.mobile} />
//                 <MiniInfo label="City" value={state.city} />
//                 <MiniInfo label="Solar Capacity" value={state.solarCapacity} />
//                 <MiniInfo label="Installation Address" value={state.installation_address} />
//               </div>
//             </div>

//             {/* DETAILS */}
//             <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
//               <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
//                 <span className="w-1 h-6 bg-gradient-to-b from-[#00C6FF] to-[#0047FF] rounded-full" />
//                 Documents
//               </h3>

//               {/* <div className="grid sm:grid-cols-2 gap-6">
//                 <InfoCard label="Full Name" value={state.full_name} />
//                 <InfoCard label="Email Address" value={state.email} />
//                 <InfoCard label="Mobile Number" value={state.mobile} />
//                 <InfoCard label="City" value={state.city} />
//               </div>

//               <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50
//                 border border-blue-200 rounded-2xl p-5 flex gap-3">
//                 <FaMapMarkerAlt className="text-blue-500 mt-1" />
//                 <div>
//                   <p className="text-xs uppercase text-gray-500">
//                     Installation Address
//                   </p>
//                   <p className="text-sm font-medium text-gray-800 mt-1">
//                     {state.installation_address}
//                   </p>
//                 </div>
//               </div> */}
//               <div className="grid sm:grid-cols-2 gap-6">
//                  <DocImage title="Insurance" image={`${Base_Url}${state.admin_documents[0].file}`} />
//               </div>
//             </div>

//             {/* DOCUMENTS */}
//             <div className="bg-white rounded-3xl shadow-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-5">
//                 Uploaded Documents
//               </h3>

//               <div className="grid gap-5">
//                 <DocImage title="Aadhaar Card" image={`${Base_Url}${state.aadhaar_file}`} />
//                 <DocImage title="PAN Card" image={`${Base_Url}${state.pan_file}`} />
//                 <DocImage title="Electricity Bill" image={`${Base_Url}${state.electricity_bill_file}`} />
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// /* SMALL COMPONENTS */

// const MiniInfo = ({ label, value }) => (
//   <div className="flex justify-between text-sm">
//     <span className="text-gray-500">{label}</span>
//     <span className="font-medium text-gray-800">{value}</span>
//   </div>
// );

// const InfoCard = ({ label, value }) => (
//   <div className="bg-gray-50 rounded-2xl p-5">
//     <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
//     <p className="text-sm font-semibold text-gray-900 mt-1">{value}</p>
//   </div>
// );

// const DocImage = ({ title, image }) => (
//   <div className="group">
//     <p className="text-xs font-medium text-gray-500 mb-2">{title}</p>

//     <div className="relative overflow-hidden rounded-xl border bg-white">
//       <img
//         src={image}
//         alt={title}
//         className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
//       />

//       <div className="absolute inset-0 bg-black/50 opacity-0
//         group-hover:opacity-100 transition flex items-center justify-center">
//         <span className="text-white text-xs font-semibold">
//           View Document
//         </span>
//       </div>
//     </div>
//   </div>
// );

// export default ProfileDetail;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaFilePdf,
  FaFileWord,
  FaFileAlt
} from "react-icons/fa";

import TopHeader from "../Layout/TopHeader";
import Footer from "../Layout/Footer";
import { Base_Url } from "../API/Base_Url";

const ProfileDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No customer data found
      </div>
    );
  }

  return (
    <>
      <TopHeader />

      <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#e6f0ff] to-[#d0e4ff] px-6 py-10">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* HEADER */}
          <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Customer{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#00C6FF] to-[#0047FF]">
                  Profile
                </span>
              </h2>
              <p className="text-gray-600 mt-1">
                View complete customer information & documents
              </p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-100"
            >
              ← Back
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">

            {/* PROFILE SUMMARY */}
            <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
              <FaUserCircle className="text-7xl text-blue-400 mx-auto" />

              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {state.full_name}
              </h3>

              <p className="text-sm text-gray-500">{state.email}</p>

              <span className="inline-block mt-4 px-4 py-1 rounded-full text-xs font-medium
                bg-blue-100 text-blue-700">
                {state.status}
              </span>

              <div className="mt-6 space-y-3 text-left">
                <MiniInfo label="Phone" value={state.mobile} />
                <MiniInfo label="City" value={state.city} />
                <MiniInfo label="Installation Address" value={state.installation_address} />
              </div>
            </div>

            {/* ADMIN DOCUMENTS */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Admin Uploaded Documents
              </h3>

              {state?.admin_documents?.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {state.admin_documents.map((doc) => (
                    <DocumentCard
                      key={doc._id}
                      title={doc.type}
                      file={`${Base_Url}${doc.file}`}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No documents uploaded by admin.
                </p>
              )}
            </div>

            {/* USER DOCUMENTS */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-5">
                User Uploaded Documents
              </h3>

              <div className="grid gap-5">
                <DocumentCard title="Aadhaar Card" file={`${Base_Url}${state.aadhaar_file}`} />
                <DocumentCard title="PAN Card" file={`${Base_Url}${state.pan_file}`} />
                <DocumentCard title="Electricity Bill" file={`${Base_Url}${state.electricity_bill_file}`} />
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

/* 🔹 SMALL COMPONENTS */

const MiniInfo = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

/* 🔹 SMART DOCUMENT CARD */

const DocumentCard = ({ title, file }) => {
  if (!file) return null;

  const ext = file.split(".").pop().toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "webp"].includes(ext);
  const isPdf = ext === "pdf";
  const isDoc = ["doc", "docx"].includes(ext);

  return (
    <div
      onClick={() => window.open(file, "_blank")}
      className="cursor-pointer border rounded-2xl p-4 bg-white hover:shadow-lg transition"
    >
      <div className="flex justify-between mb-3">
        <p className="text-sm font-semibold capitalize">{title}</p>
        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
          Uploaded
        </span>
      </div>

      {isImage && (
        <img
          src={file}
          alt={title}
          className="w-full h-36 object-cover rounded-xl hover:scale-105 transition"
        />
      )}

      {isPdf && (
        <div className="h-36 flex flex-col items-center justify-center bg-red-50 rounded-xl">
          <FaFilePdf className="text-red-600 text-5xl mb-2" />
          <p className="text-sm text-gray-600">View PDF</p>
        </div>
      )}

      {isDoc && (
        <div className="h-36 flex flex-col items-center justify-center bg-blue-50 rounded-xl">
          <FaFileWord className="text-blue-600 text-5xl mb-2" />
          <p className="text-sm text-gray-600">Download Document</p>
        </div>
      )}

      {!isImage && !isPdf && !isDoc && (
        <div className="h-36 flex flex-col items-center justify-center bg-gray-100 rounded-xl">
          <FaFileAlt className="text-gray-600 text-5xl mb-2" />
          <p className="text-sm text-gray-600">Open File</p>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;

