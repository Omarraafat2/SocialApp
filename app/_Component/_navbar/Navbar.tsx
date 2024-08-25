"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUserDataQuery } from "@/app/_slice/apiSlice";
import { useDispatch } from "react-redux";
import { apiSlice } from "@/app/_slice/apiSlice"; // Adjust path as needed

const DropdownMenu: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg">
    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200">
      Profile
    </Link>
    <Link href="/changepassword" className="block px-4 py-2 hover:bg-gray-200">
      Change Password
    </Link>
    <button
      onClick={onLogout}
      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
    >
      Logout
    </button>
  </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data, isSuccess, isLoading, isError } = useUserDataQuery();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      // Redirect to sign in page if user is not authenticated
      router.replace("/");
    }
  }, [isError, router]);

  function handleLogout() {
    Cookies.remove("token");
    dispatch(apiSlice.util.resetApiState()); // Reset the state, clearing the cached user data
    router.replace("/"); // Redirect to the home page
  }

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link href="/" className="text-2xl font-bold tracking-wider">
          SocialApp
        </Link>
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-gray-200 border-gray-600 hover:text-white hover:border-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <div
        className={`md:flex md:items-center md:space-x-6 ${isOpen ? "block" : "hidden"}`}
      >
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          {isSuccess ? (
            <>
              <li>
                <Link
                  href="/posts"
                  className="flex items-center hover:text-yellow-300"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v2.5l7 7V21H5V12.5l7-7V3zm0-1.5c-1.6 0-3.2.5-4.5 1.5L1 11c-.8.8-1 1.8-1 2.7V22c0 1.7 1.3 3 3 3h18c1.7 0 3-1.3 3-3v-7.3c0-.9-.3-1.8-1-2.7l-6.5-6.5c-1.3-1-2.9-1.5-4.5-1.5z" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="flex items-center hover:text-yellow-300"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4.5C6.5 4.5 2 8.7 2 13.5 2 17.3 6.5 21.5 12 21.5s10-4.2 10-8-4.5-8-10-8zM12 18.5c-3.2 0-5.9-2.5-5.9-5.5 0-3.1 2.7-5.5 5.9-5.5 3.2 0 5.9 2.4 5.9 5.5 0 3.1-2.7 5.5-5.9 5.5zM12 10.5c-1.5 0-2.7 1.2-2.7 2.7 0 1.5 1.2 2.7 2.7 2.7 1.5 0 2.7-1.2 2.7-2.7 0-1.5-1.2-2.7-2.7-2.7z" />
                  </svg>
                  Profile
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => router.push("/")}
                  className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-300"
                >
                  Sign In
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/signup")}
                  className="bg-blue-400 text-gray-800 px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300"
                >
                  Sign Up
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {isSuccess && (
        <div className="hidden md:flex space-x-4 relative">
          <img
            src={data?.user?.photo || "/default-avatar.png"} // Fallback to default avatar
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && <DropdownMenu onLogout={handleLogout} />}
        </div>
      )}
    </nav>
  );
}
