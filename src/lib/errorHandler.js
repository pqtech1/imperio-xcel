
import toast from "react-hot-toast";

/**
 * Handle API errors and show appropriate toast messages
 * @param {Error} error - The error object from axios
 * @param {Object} options - Configuration options
 * @param {Function} options.setErrors - Optional function to set form errors
 * @param {string} options.defaultMessage - Default error message if none provided
 */
export const handleApiError = (error, options = {}) => {
  const { setErrors, defaultMessage = "Something went wrong" } = options;


  if (error.response?.status === 422) {
    const validationErrors = error.response.data.errors;

    // Show validation errors in toast
    if (validationErrors && typeof validationErrors === "object") {
      // Get all error messages
      const errorMessages = Object.values(validationErrors).flat();

      if (errorMessages.length > 0) {
        // Show first error in toast
        toast.error(errorMessages[0]);

        // If there are multiple errors, show a summary toast
        if (errorMessages.length > 1) {
          toast.error(
            `${errorMessages.length} validation errors found. Please check the form.`,
          );
        }
      }
    }

    // Set errors for form fields if setErrors function is provided
    if (setErrors && validationErrors) {
      setErrors(validationErrors);
    }

    return validationErrors;
  }

  // Handle other error statuses
  switch (error.response?.status) {
    case 401:
      toast.error("Unauthorized. Please login again.");
      break;
    case 403:
      toast.error("You don't have permission to perform this action.");
      break;
    case 404:
      toast.error("Resource not found.");
      break;
    case 500:
      toast.error("Server error. Please try again later.");
      break;
    default:
      toast.error(error.response?.data?.message || defaultMessage);
  }

  return null;
};

/**
 * Extract error message from validation response
 * @param {Object} errors - Validation errors object
 * @returns {string} - First error message
 */
export const getFirstErrorMessage = (errors) => {
  if (!errors) return null;
  const firstErrorKey = Object.keys(errors)[0];
  return errors[firstErrorKey]?.[0] || null;
};

/**
 * Check if field has validation error
 * @param {Object} errors - Validation errors object
 * @param {string} field - Field name
 * @returns {boolean}
 */
export const hasError = (errors, field) => {
  return errors && errors[field] && errors[field].length > 0;
};

/**
 * Get error message for field
 * @param {Object} errors - Validation errors object
 * @param {string} field - Field name
 * @returns {string|null}
 */
export const getFieldError = (errors, field) => {
  return errors && errors[field] ? errors[field][0] : null;
};
