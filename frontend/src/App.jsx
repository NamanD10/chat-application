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
import PageLoader from './components/PageLoader.jsx'
import { getAuthUser } from './lib/api.js'
import useAuthUser from './hooks/useAuthUser.js'
import { Home } from 'lucide-react'
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
  
  const {isLoading, authUser} = useAuthUser();
  const {theme} = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if(isLoading) return <PageLoader />

  return (
    <div className='' data-theme={theme}>
      
      <Routes>
      
        <Route path='/' element={isAuthenticated && isOnboarded ? 
          (
            <Layout showSidebar={true}>
              
              <HomePage />

            </Layout>
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
          element={isAuthenticated ? 
          <Navigate to={isOnboarded ? "/" : "/onboarding"}/> 
          : <LoginPage />} 
        />
        
        <Route 
          path='/notifications' 
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <NotificationPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )} 
        />
        
        <Route 
          path='/call/:id' 
          element={
            isAuthenticated && isOnboarded ? (
            <CallPage />
          ) : (
          <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
          )
          }
        />
        
        <Route 
          path= '/chat/:id' 
          element={
            isAuthenticated && isOnboarded ? (
            <ChatPage />
          ) : (
          <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
          )
          } 
        />
        
       <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>

      <Toaster></Toaster>
    </div>
  )
}

export default App