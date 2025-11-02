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
import PageLoader from './components/pageLoader.jsx'
import { getAuthUser } from './lib/api.js'
import useAuthUser from './hooks/useAuthUser.js'

const App = () => {
  
  const {isLoading, authUser} = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if(isLoading) return ( <PageLoader /> )

  return (
    <div className='' data-theme='sunset'>
      
      <Routes>
      
        <Route path='/' element={isAuthenticated && isOnboarded ? 
          (
            <HomePage />
          ) : (
            <Navigate to= {!isAuthenticated ? "/login" : "/onboarding"} />
          )} 
        />
        
        <Route 
          path='/signup' 
          element={isAuthenticated ? <Navigate to='/onboarding' /> : <SignupPage />} 
        />
        
        <Route 
          path='/login' 
          element={isAuthenticated ? <Navigate to='/' /> : <LoginPage />} 
        />
        
        <Route 
          path='/notifications' 
          element={isAuthenticated ? <NotificationPage /> : <Navigate to='/login' />} 
        />
        
        <Route 
          path='/call' 
          element={isAuthenticated ? <CallPage /> : <Navigate to='/login' />} 
        />
        
        <Route 
          path='/chat' 
          element={isAuthenticated ? <ChatPage /> : <Navigate to='/login' />} 
        />
        
        <Route 
          path='/onboarding' 
          element={isAuthenticated ? <OnboardingPage /> : <Navigate to='/login' />} 
        />

      </Routes>

      <Toaster></Toaster>
    </div>
  )
}

export default App