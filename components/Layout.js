import React from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { user } = useAuth();
  return (
    <div className="flex">
      <Sidebar>
        <main className="ml-20 w-full">{children}</main>
      </Sidebar>
    </div>
  );
};

export default Layout;
