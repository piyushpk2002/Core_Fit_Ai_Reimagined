import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { registerUser } from "../store/features/authSlice";

let initialformData = {
	name: "",
	email: "",
	password: "",
}

const Signup = () => {
	const [formData, setFormData] = useState(initialformData);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Add your form submission logic here
		dispatch(registerUser(formData)).then((res) => {
			console.log(res?.payload);
			alert(res?.payload?.message);
			if(res?.payload?.success){
				navigate("/auth/login")
			}
		})
	};

	return (
		<div className="bg-lime-50 flex items-center justify-center min-h-screen">
			<div className="bg-white shadow-md rounded-lg p-8 w-96">
				<h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
					Register
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Name Input */}
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<input
							type="text"
							name="name"
							placeholder="Enter your name"
							value={formData.name}
							onChange={handleChange}
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
							autoComplete="off"
							required
						/>
					</div>
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
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
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
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
							required
						/>
					</div>
					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
					>
						Register
					</button>
				</form>
				<p className="text-sm text-gray-600 text-center mt-4">
					Already have an account?{" "}
					<Link to="/auth/login" className="text-blue-500 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
