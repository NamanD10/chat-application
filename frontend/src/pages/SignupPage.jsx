import React, { useState } from 'react';
import { ShipWheelIcon } from 'lucide-react';
import { Link, Navigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '../lib/api.js';

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const {
    mutate: signupMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };


  return (
      <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 '>
        
        <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
          {/* Left Side- Signup form */}
          
          <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col '>

           {/*Logo */}
           <div className=' mb-4 flex items-center justify-start gap-2'>
              <ShipWheelIcon className='size-9 text-primary' />

              <span className=' text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary 
              to-secondary tracking-wider '>
                Cine Read
              </span>
           </div>

           {/* Error message if any */}
           {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

           <div className=' w-full'>
              <form onSubmit={handleSignup}>

                  <div className="space-y-4"> 

                    <div>                     
                      <h2 className='text-xl font-semibold'>Create an Account</h2>

                      <p className='text-sm opacity-70'>
                        Join Cine Read and meet other book lovers!
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="form-control w-full">
                        <label className='label'>
                          <span className='label-text'>Full Name</span>
                        </label>

                        <input 
                          type='text' 
                          placeholder='John Doe' 
                          className='input input-bordered w-full' 
                          value={signupData.fullName}
                          onChange= {(e) => setSignupData({...signupData, fullName: e.target.value})}
                          required  
                        />
                      </div>

                      {/* email */}
                      <div className="form-control w-full">
                        <label className='label'>
                          <span className='label-text'>Email</span>
                        </label>

                        <input 
                          type='text' 
                          placeholder='JohnDoe@mail.com' 
                          className='input input-bordered w-full' 
                          value={signupData.email}
                          onChange= {(e) => setSignupData({...signupData, email: e.target.value})}
                          required  
                        />
                      </div>

                      {/* password */}
                      <div className="form-control w-full">
                        <label className='label'>
                          <span className='label-text'>Password</span>
                        </label>

                        <input 
                          type='password' 
                          placeholder='********' 
                          className='input input-bordered w-full' 
                          value={signupData.password}
                          onChange= {(e) => setSignupData({...signupData, password: e.target.value})}
                          required  
                        />

                        <p className='text-xs opacity-70 mt-1'>
                          Password must be at least 8 characters long
                        </p>
                      </div>

                      {/* Checkbox for T&C */}
                      <div className="form-control">

                        <label className='label cursor-pointer justify-start gap-2'>
                        
                          <input type='checkbox' className='chekbox checkbox-sm' required />
                        
                          <span className='rext-sx leading-tight'>
                            I agree to the {" "}
                            <span className='text-primary hover:underline'> terms of service </span> and {" "}
                            <span className='text-primary hover:underline'> privacy policy </span> 
                          </span>
                        
                        </label>
                      
                      </div>

                    </div>

                    <button className='btn btn-primary w-full' type='submit'> 
                      {isPending ? (
                      <>
                      <span className='loading loading-spinner loading-xs'></span>
                      Loading
                      </>
                      ) : (
                      "Create Account"
                      )}
                    </button>

                    <div className='text-center mt-4'>
                      <p className='text-sm'>Already have an account? {" "}
                        <Link className='text-primary hover:underline'> Sign In </Link> 
                      </p>
                    </div>
                  </div>


              </form>
           </div>

          </div>



          {/* Right Side - Signup form */}
          <div className='hidden lg:flex  lg:w-1/2 bg-primary/10 items-center justify-content'>
            <div className="max-w-md p-8">

              {/* Illustration */}
              <div className='relative aspect-square max-w-sm mx-auto'>
                <img src='./Video-call.png' alt='Video call illustration' className='w-full h-full'></img>
              </div>

              <div className='text-center space-y-3 mt-6'>
                <h2 className='text-xl font-semibold'>Connect with book lovers worldwide</h2>
                <p className='opacity-70'>Talk about books and movies you love, make friends and fuck each other</p>
              </div>
            </div>

          </div>

        </div>
      
      </div>
  )
}

export default SignupPage