import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false); // New state for show password

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

	return (
		<div className="flex flex-col items-center justify-center min-w-96 mx-auto">
			<div className="w-full p-6 rounded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80">
				<h1 className="text-3xl font-semibold text-center text-white">
					Login
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className="label p-2">
							<span className="text-base label-text text-white">Email</span>
						</label>
						<input
							type="text"
							placeholder="Enter email"
							className="w-full input input-bordered h-10 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div>
						<label className="label">
							<span className="text-base label-text text-white">Password</span>
						</label>
						<input
							type={showPassword ? "text" : "password"} // Toggle input type based on showPassword
							placeholder="Enter Password"
							className="w-full input input-bordered h-10 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="flex items-center mt-2">
						<input
							type="checkbox"
							id="showPassword"
							checked={showPassword}
							onChange={() => setShowPassword(!showPassword)} // Toggle showPassword state
							className="mr-2"
						/>
						<label htmlFor="showPassword" className="text-sm text-gray-300">
							Show Password
						</label>
					</div>

					<div className="flex justify-between mt-2">
						<Link to="/signup" className="text-sm text-gray-300 hover:underline hover:text-blue-500">
							{"Don't"} have an account?
						</Link>
						<Link to="/forgot" className="text-sm text-gray-300 hover:underline hover:text-blue-500">
							Forgot Password?
						</Link>
					</div>

					<div>
						<button className="btn btn-block btn-sm mt-2 bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>
							{loading ? <span className="loading loading-spinner"></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
