import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/features/authSlice";

let initialformData = {
    email: "",
    password: "",
}

const Login = () => {
  const [formData, setFormData] = useState(initialformData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your form submission logic here
    dispatch(loginUser(formData)).then((res) => {
      console.log(res?.payload);
      alert(res?.payload?.message);
      if(res?.payload?.success){
        navigate("/")
      }
    })
  };

  return (
    <div className="bg-lime-50 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Do not have any Account?{" "}
          <Link to="/auth/signup" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
