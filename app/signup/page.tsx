"use client"
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import img from "../../public/image.svg";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useSignupMutation } from '../_slice/apiSlice';



export default function Signup() {

  const [signup, { isLoading, isError, error }] = useSignupMutation();
  const router = useRouter();


  const formik = useFormik({
    initialValues: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        dateOfBirth: '',
        gender: '',
    },
    validationSchema: Yup.object({



      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number'),
      rePassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
      dateOfBirth: Yup.date().required('Date of birth is required'),
      gender: Yup.string().required('Gender is required'),

    }),
    onSubmit: async (value)=>{
      const response = await signup(value).unwrap(); 
      if (response.message === "success") {
        router.push("/");
      } else {
        console.log(response.message);
      }
      
    }
})



  return (
    <>
      

      <div  className=" flex flex-row justify-center align-middle items-center h-screen">


    <div className='w-1/2'>
      

      <form onSubmit={formik.handleSubmit}  className="max-w-md p-8 rounded-lg bg-white mx-auto">
            
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500">{formik.errors.name}</div>
                ) : null}
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
              {formik.touched.email && formik.errors.email ? (
               <div className="text-red-500">{formik.errors.email}</div>
               ) : null}
            
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        
                          {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
              

            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}  type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
            
              
                            {formik.touched.rePassword && formik.errors.rePassword ? (
                <div className="text-red-500">{formik.errors.rePassword}</div>
              ) : null}
            
            </div>
  
            <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
  <input
    type="date"
    name="dateOfBirth"
    id="dateOfBirth"
    value={formik.values.dateOfBirth}  
    onChange={formik.handleChange} 
    onBlur={formik.handleBlur} 
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                
                            {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
              <div className="text-red-500">{formik.errors.dateOfBirth}</div>
            ) : null}
</div>
              <div className="relative z-0 w-full mb-5 group">
          
  
            <div>
            <select
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="gender"
                    id="gender"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
            </div>
  
  
  
                          </div>
              </div>
              <button type="submit" className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </div>

      

    <div className="w-1/2 h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white p-6 rounded-l-lg shadow-lg">
        
        <div className="pb-8">
        <h1 className="text-3xl font-bold text-center mb-4">
         Join the conversation!
        </h1>
          <p className="text-lg text-center">
            Sign in to connect, share, and exchange ideas with a community that inspires.
          </p>
        </div>


    <Image src={img} alt="description" width={700} height={700} />
      </div>

      </div>

   </>
  )
}
