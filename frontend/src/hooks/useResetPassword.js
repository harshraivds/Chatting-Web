import { useState } from "react";
import toast from "react-hot-toast";

const useResetPassword = () => {
	const [loading, setLoading] = useState(false);

	const resetPassword = async (token, password, confirmPassword) => {
		if (!password || !confirmPassword) {
			toast.error("Please fill in all fields");
			return;
		}

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		setLoading(true);
		try {
			const res = await fetch(`/api/auth/password/reset/${token}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token, password }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			toast.success("Password reset successful. Please log in.");
		} catch (error) {
			toast.error(error.message || "An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return { loading, resetPassword };
};

export default useResetPassword;
