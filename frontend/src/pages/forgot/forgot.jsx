import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import useForgotPassword from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, sendResetLink } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendResetLink(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80">
        <h1 className="text-3xl font-semibold text-center text-white">Forgot Password</h1>
        <p className="text-sm text-gray-400 text-center mt-2">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full input input-bordered h-10 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-block btn-sm bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        </form>

        {/* Link to navigate to Home */}
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
