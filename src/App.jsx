
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Popupimage from './Pages/Popupimage'
import { ToastContainer } from 'react-toastify'
import Product from './Pages/Product'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
import Login from './Auth/Login'
import CompanyOverview from './Pages/CompanyOverview'

import EnquiryCustomer from './Pages/EnquiryCustomer'
import RegisterCoustomer from './Pages/RegisterCoustomer'
import ProfileDetail from './Pages/ProfileDetail'
import Profile from './Pages/Profile'





function App() {
  const ThemeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route path='/customer-profile' element={<Profile />} />
          <Route path='/profile-detail' element={<ProfileDetail/>}/>
          <Route path='/enquiry-customer' element={<EnquiryCustomer />} />
          <Route path='/popup-content' element={<Popupimage />} />
          <Route path='/product' element={<Product />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/companyoverview' element={<CompanyOverview />} />
          <Route path='/register-customer' element={<RegisterCoustomer />} />
          {/* <Route path='/popup' element={<Popupimage/>}/> */}

          {/* <Route index element={<Createcategory />} /> */}



        </Route>


      </>
    )
  )

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <RouterProvider router={ThemeRoutes} />
    </>
  )
}

export default App
