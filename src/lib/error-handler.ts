/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generic error handler for API responses.
 * Handles various error shapes, network issues, and edge cases.
 * Returns a user-friendly error message.
 *
 * @param error - The error object thrown by API calls (Axios, fetch, etc.)
 * @returns {string} - A user-friendly error message
 */
export function handleGenericError(error: any): string {
  // Axios error with response
  if (error?.response) {
    const status = error.response?.status;
    const data = error.response?.data;

    // If data is a string, return it
    if (typeof data === "string" && data.trim()) {
      return data;
    }

    // If data is an object, check for common message fields
    if (typeof data === "object" && data !== null) {
      // message or detail at top level
      if (typeof data?.message === "string" && data.message.trim()) {
        return data.message;
      }
      if (typeof data?.detail === "string" && data.detail.trim()) {
        return data.detail;
      }
      // message or detail as array
      if (Array.isArray(data?.message) && data.message.length > 0) {
        return typeof data.message[0] === "string" ? data.message[0] : JSON.stringify(data.message[0]);
      }
      if (Array.isArray(data?.detail) && data.detail.length > 0) {
        return typeof data.detail[0] === "string" ? data.detail[0] : JSON.stringify(data.detail[0]);
      }
      // Field errors (Django/DRF, etc.)
      const fieldError = Object.values(data)
        .flat()
        .find((v) => typeof v === "string" && v.trim());
      if (fieldError) {
        return fieldError as string;
      }
    }

    // Fallback for known status codes
    if (status === 401) return "Unauthorized. Please log in again.";
    if (status === 403) return "You do not have permission to perform this action.";
    if (status === 404) return "Resource not found.";
    if (status === 500) return "A server error occurred. Please try again later.";

    // Generic fallback
    return "An error occurred. Please try again.";
  }

  // Axios error with request but no response (network error, CORS, etc.)
  if (error?.request && !error?.response) {
    return "No response from server. Please check your internet connection.";
  }

  // Fetch API error (TypeError for network issues)
  if (error instanceof TypeError && error?.message === "Failed to fetch") {
    return "Network error. Please check your connection.";
  }

  // Error as string
  if (typeof error === "string" && error.trim()) {
    return error;
  }

  // Error with message property
  if (typeof error?.message === "string" && error.message.trim()) {
    return error.message;
  }

  // Error as array of messages
  if (Array.isArray(error) && error.length > 0) {
    if (typeof error[0] === "string" && error[0].trim()) {
      return error[0];
    }
    if (typeof error[0]?.message === "string" && error[0].message.trim()) {
      return error[0].message;
    }
  }

  // Unknown error
  return "An unexpected error occurred. Please try again.";
}

