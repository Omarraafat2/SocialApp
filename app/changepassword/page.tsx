"use client";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useChangepasswordMutation } from "../_slice/apiSlice";

export default function ChangePassword() {
  const router = useRouter();
  const [changepassword, { isLoading, error }] = useChangepasswordMutation();

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      newPassword: Yup.string()
        .required("New Password is required")
        .min(8, "New Password must be at least 8 characters long"),
    }),
    onSubmit: async (value) => {
      
        const response = await changepassword(value).unwrap();
        console.log(response);
        router.push("/");  
     
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
          Change Password
        </h2>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Current Password
          </label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter current password"
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-5">
          <label
            htmlFor="newPassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            New Password
          </label>
          <input
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="newPassword"
            name="newPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="text-red-500">{formik.errors.newPassword}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
