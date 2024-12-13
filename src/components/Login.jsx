import React, { useState } from "react";
import { loginUser } from "../utilities/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast.success("Login Successful!", { position: "top-center" });
      navigate("/users?page=1");
    } catch (err) {
      toast.error("Invalid email or password!", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center overflow-hidden h-[100vh] md:h-screen">
      <ToastContainer />
      <div className="w-full md:w-1/2 h-1/2 md:h-full mb-6 sm:mb-0">
        <img src="/general.jpg" alt="" className="w-full h-full" />
      </div>
      <div className="w-full md:w-1/2 h-full bg-blue-50 shadow-md flex items-center justify-center">
        <div className="w-[85%] sm:w-[70%] py-4 md:py-0">
          <h1 className="text-28 sm:text-34 flex items-center justify-center gap-2 font-bold font-poppins animate-fade-in mb-6">
            User Login
            <img src="/login_admin.png" alt="" className="h-10 w-10" />
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="pl-3 font-semibold">
                Email
              </label>
              <input
                id="email"
                className="w-full lowercase px-4 py-3 border shadow-md border-gray-400 rounded-full outline-none text-gray-600"
                type="email"
                placeholder="varun.uwork@gmail.com"
                value={email}
                autoComplete="email-address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="pl-3 font-semibold">
                Password
              </label>
              <input
                id="password"
                className="w-full px-4 py-3 border shadow-md border-gray-400 rounded-full outline-none text-gray-600"
                type="password"
                placeholder="*********"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className={`bg-blue-600 hover:bg-blue-700 font-semibold outline-none mt-2 md:mt-8 px-4 py-3 text-white capitalize rounded-full flex items-center justify-center transition-all w-full duration-300 ${
                loading && "opacity-75 pointer-events-none"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.962 7.962 0 014 12H2c0 3.314 2.686 6 6 6v-2.709z"
                  ></path>
                </svg>
              )}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 font-light text-sm text-slate-600 text-center">
            Don&apos;t have an account?{" "}
            <Link
              to="#"
              className="text-red-600 hover:underline hover:underline-offset-4"
              onClick={() => toast.info("Contact admin")}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
