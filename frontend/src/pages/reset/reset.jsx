import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import useResetPassword from "../../hooks/useResetPassword";

const ResetPassword = () => {
  const { token } = useParams(); // Token from the reset link
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility
  const { loading, resetPassword } = useResetPassword();
  const [success, setSuccess] = useState(false); // State to handle success message
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await resetPassword(token, password, confirmPassword);
    if (success) {
      setSuccess(true); // Set success message after reset
      // Trigger page reload and navigate to the home page
      setTimeout(() => {
        window.location.reload(); // Optional: If you want to reload the page
        navigate("/"); // Navigate to the home page
      }, 0); // Wait for a second before navigating to allow time for success message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80">
        <h1 className="text-3xl font-semibold text-center text-white">Reset Password</h1>
        <p className="text-sm text-gray-400 text-center mt-2">
          Enter your new password below.
        </p>

        {success && (
          <div className="text-green-500 text-center mt-4">
            <p>Password has been successfully reset!</p>
            <p>You will be redirected to the <strong>Home Page</strong> shortly.</p>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="mt-4">
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">New Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                placeholder="Enter new password"
                className="w-full input input-bordered h-10 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-sm text-gray-300">
                  Show Password
                </label>
              </div>
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Confirm Password</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"} // Toggle input type
                placeholder="Confirm new password"
                className="w-full input input-bordered h-10 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="showConfirmPassword"
                  checked={showConfirmPassword}
                  onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="mr-2"
                />
                <label htmlFor="showConfirmPassword" className="text-sm text-gray-300">
                  Show Confirm Password
                </label>
              </div>
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
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
