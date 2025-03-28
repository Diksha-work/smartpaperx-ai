
import { toast } from "sonner";

// EmailJS API details
const EMAILJS_SERVICE_ID = "service_aptorax";
const EMAILJS_TEMPLATE_ID = "template_welcome_aptorax";
const EMAILJS_USER_ID = "XUU5qNyFTZEkbdH0s";

/**
 * Sends a welcome email to the user after successful signup
 * @param email - The user's email address
 * @param fullName - The user's full name
 */
export const sendWelcomeEmail = async (email: string, fullName: string) => {
  try {
    // Using the emailjs-com API directly with fetch
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_USER_ID,
        template_params: {
          user_email: email,
          user_name: fullName,
          subject: "Welcome to AptoraX AI 🎉",
        },
      }),
    });

    if (response.ok) {
      console.log("Welcome email sent successfully");
    } else {
      console.error("Failed to send welcome email:", await response.text());
    }
  } catch (error) {
    console.error("Error sending welcome email:", error);
    toast.error("We couldn't send you a welcome email, but your account was created successfully!");
  }
};
