import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../config/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await supabase.auth.session;
        if (session) {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Error fetching session:", error.message);
      }
    };

    fetchSession();
  }, []);

  supabase.auth.onAuthStateChange((event, session) => {
    setUser(session?.user ?? null);
  });

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
