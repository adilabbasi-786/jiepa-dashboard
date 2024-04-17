import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
// import { AuthProvider, useAuth } from "../context/AuthContext";
import { AuthProvider } from "../context/AuthContext";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* <Layout> */}
      <Component {...pageProps} />
      {/* </Layout> */}
    </AuthProvider>
  );
}
