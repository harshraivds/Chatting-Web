import { useState } from "react";
import toast from "react-hot-toast";

const useForgotPassword = () => {
	const [loading, setLoading] = useState(false);

	const sendResetLink = async (email) => {
		if (!email) {
			toast.error("Please provide an email address");
			return;
		}

		setLoading(true);
		try {
			const res = await fetch("/api/auth/forgot", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			toast.success("Reset password link has been sent to your email");
		} catch (error) {
			toast.error(error.message || "An error occurred, please try again");
		} finally {
			setLoading(false);
		}
	};

	return { loading, sendResetLink };
};

export default useForgotPassword;
