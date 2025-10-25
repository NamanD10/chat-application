import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import OnboardingPage from './pages/OnboardingPage'
import NotificationPage from './pages/NotificationPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import toast, { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios.js'

const App = () => {
  const {data: authData, isLoading, error} = useQuery({
    queryKey: ['authUser'],

    queryFn: async() => {
      const res = await axiosInstance.get("http://localhost:3000/api/auth/me");
      return res.data;
    },
    retry : false
});

  const authUser = authData?.user;



  return (
    <div className='' data-theme='sunset'>
      <button className="btn btn-primary" onClick={ () => toast.success("Hello World")}>Create A Toast</button>
      <Routes>
      
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignupPage />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <LoginPage />} />
        <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />
        <Route path='/call' element={authUser ? <CallPage /> : <Navigate to='/login' />} />
        <Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to='/login' />} />
        <Route path='/onboarding' element={authUser ? <OnboardingPage /> : <Navigate to='/login' />} />

      </Routes>

      <Toaster></Toaster>
    </div>
  )
}

export default App