import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }

  return (

    <div className="flex items-center justify-center w-full bg-gray-100">
      <div className="w-full max-w-lg bg-gray-100 p-6 ">
        <h2 className="text-center text-4xl font-bold">Welcome Back</h2>
        <p className="text-center text-black mb-4 mt-2">
          Sign in to get your order fast
        </p>
        <form onSubmit={onSubmit}>
          <div className="mb-4 mt-4">
            <label className="block text-1xl font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="youremail@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-1xl font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-1 bg-[#d0a77e] text-white py-2 rounded-md hover:bg-[#b68c5c] transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?
          <Link
            to="/auth/register"
            className="ml-1 text-[#d0a77e] hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;
