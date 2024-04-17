import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../config/supabaseClient";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("data", data);

      if (error) {
        throw error;
      }

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard on successful login
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Invalid email or password");
    }
  };

  return (
    <>
      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xs mx-auto mt-8 shadow-md p-8 bg-white rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Sign In
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </>
  );
}
