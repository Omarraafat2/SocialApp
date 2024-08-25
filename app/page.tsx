"use client";
import Image from "next/image";
import img from "../public/image.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter,usePathname } from "next/navigation";
import Signup from "./signup/page";
import axios from "axios";
import Cookies from "js-cookie";
import Signin from "./signin/page";
import { useEffect } from "react";


export default function Home() {
  const router = useRouter();
  const  pathname  = usePathname();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    }),
    onSubmit: async (value) => {
      try {
        const response = await axios.post(
          `https://linked-posts.routemisr.com/users/signin`,
          value
        );
        console.log(response);
        const token = response.data.token;

        localStorage.setItem("token", token);
        // Cookies.set('token', token, { expires: 7, secure: true })
        router.push("/posts");
      } catch {
        console.log("error");
      }
    },
  });
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      router.push('/posts');
    }
  }, [router]);
  

  return (
    <>
      <div className=" flex flex-row justify-center align-middle items-center h-screen ">
        {/*  Form sgn in   */}

        <div className="w-1/2  ">
        {pathname === '/signup' ? <Signup /> : <Signin />}
        </div>

        {/*  Image   */}
        <div className="w-1/2 h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white p-6 rounded-l-lg shadow-lg">
          <div className="pb-8">
            <h1 className="text-3xl font-bold text-center mb-4">
              Join the conversation!
            </h1>
            <p className="text-lg text-center">
              Sign in to connect, share, and exchange ideas with a community
              that inspires.
            </p>
          </div>

          <Image src={img} alt="description" width={700} height={700} />
        </div>
      </div>
    </>
  );
}
