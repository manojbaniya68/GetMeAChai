"use client";
import React,{useEffect} from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Dashboard from "../../components/Dashboard";

const dashboard = () => {
  return (
     <Dashboard/>
  );
};

export default dashboard;
