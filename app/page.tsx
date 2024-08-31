"use client";
import Image from "next/image";
import img from "../public/image.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, usePathname } from "next/navigation";
import Signup from "./signup/page";
import axios from "axios";
import Cookies from "js-cookie";
import Signin from "./signin/page";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

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
    const token = Cookies.get("token");
    if (token) {
      router.push("/posts");
    }
  }, [router]);

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen justify-center items-center">
        {/* Image Section */}
        <div className="order-1 md:order-2 md:w-1/2 w-full h-1/2 md:h-full flex items-center justify-center bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white p-6 md:rounded-l-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Join the conversation!</h1>
            <p className="text-lg">
              Sign in to connect, share, and exchange ideas with a community
              that inspires.
            </p>
            <div className="mt-4">
              <Image src={img} alt="description" width={300} height={300} />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="order-2 md:order-1 md:w-1/2 w-full p-4 flex justify-center">
          {pathname === "/signup" ? <Signup /> : <Signin />}
        </div>
      </div>
    </>
  );
}
