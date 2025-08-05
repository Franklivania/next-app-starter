import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { postData } from "@/config/api";
import { AUTH } from "@/config/API_ENDPOINTS";

/**
 * Custom hook for handling user logout
 * @param {Object} [options] - Configuration options
 * @param {boolean} [options.redirectToLogin=true] - Redirect to login page after logout
 * @param {string} [options.redirectPath="/login"] - Custom redirect path
 * @returns {{ logout: () => Promise<void>, isLoggingOut: boolean }} - Logout function and loading state
 */
const useLogout = ({
  redirectToLogin = true,
  redirectPath = "/login",
} = {}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const getRefreshToken = () => {
    if (typeof window === "undefined") return null;
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("techverve_refresh_token="));
    return cookie ? cookie.split("=")[1] : null;
  };

  const clearAuthCookies = () => {
    const cookies = [
      "techverve_auth_token",
      "techverve_refresh_token",
      "techverve_role",
      "techverve_mentor_role",
    ];
    const expires = "Thu, 01 Jan 1970 00:00:01 GMT";
    cookies.forEach(
      (name) => (document.cookie = `${name}=; Path=/; Expires=${expires};`)
    );
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        await postData(AUTH.LOGOUT, { refresh: refreshToken });
      }
      clearAuthCookies();
      toast.success("Logged out successfully");
      if (redirectToLogin) router.push(redirectPath);
    } catch (error) {
      console.error("Logout error:", error);
      // Only show error if the server error is not a 405 (Method Not Allowed)
      if (error.response?.status !== 405) {
        toast.error("Logout failed, but cookies cleared");
      } else {
        toast.success("Logged out successfully");
      }
      clearAuthCookies();
      if (redirectToLogin) router.push(redirectPath);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { logout, isLoggingOut };
};

export default useLogout;
