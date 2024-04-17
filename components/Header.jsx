import React from "react";
import { supabase } from "../config/supabaseClient";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="flex justify-between px-4 pt-4">
      <h2>Dashboard</h2>
      <button
        onClick={handleLogout}
        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
