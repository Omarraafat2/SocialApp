"use client";
import { useState } from "react";
import { useUserDataQuery } from "../_slice/apiSlice";
import { useRouter } from "next/navigation";
import friends1 from "@/app/profile/_images/02.jpg";
import friends2 from "@/app/profile/_images/03.jpg";
import friends3 from "@/app/profile/_images/04.jpg";
import Image from "next/image";
import AddPost from "../_Component/_addPost/addpost";
import Myposts from "../_Component/myPosts/Myposts";
import { PostProfile } from "../_interfaces/_interfaces";
import Sidebar from "../_Component/_sidebar/Sidebar";
export default function Profile() {
  const router = useRouter();
  const { data, error, isLoading } = useUserDataQuery();

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostProfile[]>([]);
  const [newPost, setNewPost] = useState<string>("");

  // Example friend data
  const friends = [
    { id: 1, name: "John Doe", job: "Software Engineer", photo: friends1 },
    { id: 2, name: "Jane Smith", job: "Product Manager", photo: friends2 },
    { id: 3, name: "Alice Johnson", job: "UI/UX Designer", photo: friends3 },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab === activeTab ? null : tab);
  };

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      const post: PostProfile = {
        id: posts.length + 1,
        content: newPost,
        timestamp: new Date().toLocaleString(),
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data.</p>;

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />

      <main className="flex-1 p-4 lg:mx-44 bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
          <div className="flex items-center mb-4 lg:mb-0">
            <img
              src={data?.user?.photo || "/default-profile.jpg"}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div className="ml-4">
              <h2 className="text-lg text-gray-700 font-semibold">{data?.user?.name || "User Name"}</h2>
              <p className="text-sm text-gray-500">Cairo, Front-end Developer</p>
            </div>
          </div>
          <button className="text-blue-600 font-semibold">Edit Profile</button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-around border-b pb-2 mb-4">
          <button
            onClick={() => handleTabClick("about")}
            className="text-gray-600 hover:text-blue-600"
          >
            About
          </button>
          <button
            onClick={() => handleTabClick("friends")}
            className="text-gray-600 hover:text-blue-600"
          >
            Friends
          </button>
          <button
            onClick={() => handleTabClick("photos")}
            className="text-gray-600 hover:text-blue-600"
          >
            Photos
          </button>
          <button
            onClick={() => handleTabClick("more")}
            className="text-gray-600 hover:text-blue-600"
          >
            More
          </button>
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          {/* About Section */}
          {activeTab === "about" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700">
                Hi, I'm Omar Raafat, a passionate Front-End Developer based in
                Cairo, Egypt. I'm always looking to create engaging, user-friendly
                interfaces and am currently seeking job opportunities where I can
                contribute to dynamic projects and grow as a developer.
              </p>
            </div>
          )}

          {/* Friends Section */}
          {activeTab === "friends" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex flex-col items-center bg-white p-4 rounded-lg shadow"
                  >
                    <Image className="rounded-full" src={friend.photo} alt={friend.name} width={80} height={80} />
                    <h3 className="text-lg text-gray-700 font-semibold">{friend.name}</h3>
                    <p className="text-sm text-gray-500">{friend.job}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photos Section */}
          {activeTab === "photos" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700">Photo gallery will be displayed here.</p>
            </div>
          )}

          {/* More Section */}
          {activeTab === "more" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700">More content will be displayed here.</p>
            </div>
          )}
        </div>

        {/* Post Input Section */}
        <div className="my-4">
          <AddPost />
        </div>

        {/* Display Posts */}
        <div className="my-4">
          <Myposts />
        </div>
      </main>
    </div>
  );
}
