"use client"
import React from "react";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUserData,updateUser } from "@/app/actions/useractions";


const Dashboard = () => {
  const { data: session, status,update } = useSession();
  const router = useRouter();
  const [form, setform] = useState({
  name: "",
  email: "",
  username: "",
  profilePicture: "",
  coverPicture: "",
  esewa_merchant_code: "",
  esewa_secret_key: ""
});

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if(status === "authenticated"){
      getData();
    }

  }, [status, router]);

  if (status === "loading") {
    return <p className="text-white text-center">Loading...</p>;
  }

  async function getData()
  {
    setform(await getUserData(session.user.username))
  }
  
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  async function updateProfile()
  {
    await updateUser(form.email, form);
    //updata the session data
    await update({username: form.username, name: form.name});    
    alert("Profile Updated Successfully");
  }

  return (
    <div className="container my-5 rounded-lg  mx-auto text-white w-[45vw] flex flex-col justify-center items-center p-6 pb-10">
      <h1 className="text-3xl font-bold py-5">Welcome to your Dashboard</h1>
      {/* input for name */}
      <div className="w-full mb-4">
        <label
          htmlFor="name"
          className="w-full block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="name"
          name="name"
          value={form.name ?? ""}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {/* input for email */}
      <div className="w-full mb-4">
        <label
          htmlFor="email"
          className="w-full block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
         onChange={handleChange}
          type="email"
          id="email"
          name="email"
          value={form.email ?? ""}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {/* input for username */}
      <div className="w-full mb-4">
        <label
          htmlFor="username"
          className="w-full block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="username"
          name="username"
          value={form.username ?? ""}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {/* input for profile picture */}
      <div className="w-full mb-4">
        <label
          htmlFor="profilePicture"
          className="w-full block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          Profile Picture URL
        </label>
        <input
         onChange={handleChange}
          type="text"
          id="profilePicture"
          name="profilePicture"
          value={form.profilePicture ?? ""}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {/* input for cover picture */}
      <div className="w-full mb-4">
        <label
          htmlFor="coverPicture"
          className="w-full block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          Cover Picture URL
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="coverPicture"
          name="coverPicture"
          value={form.coverPicture ?? ""}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {/* input for payment gateway id */}
      <div className="w-full mb-4">
        <label
          htmlFor="esewa_merchant_code"
          className="w-full block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          Merchant Code
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="esewa_merchant_code"
          name="esewa_merchant_code"
          value={form.esewa_merchant_code ?? ""}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {/* input for payment gateway secret */}
      <div className="w-full mb-4">
        <label
          htmlFor="esewa_secret_key"
          className="w-full block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          Payment Gateway Secret Key
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="esewa_secret_key"
          name="esewa_secret_key"
          value={form.esewa_secret_key ?? ""}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="button w-full">
        <button onClick={()=>updateProfile()} className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
