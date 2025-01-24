import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axois from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axois.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmitHandle} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5ESE] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state} </span>Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
        </div>
        <button className="text-center bg-primary w-full py-2 rounded-sm text-base text-white">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            {" "}
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-primary underline cursor-pointer font-semibold"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            {" "}
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-primary underline cursor-pointer font-semibold"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
