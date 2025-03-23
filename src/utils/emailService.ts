
import { toast } from "sonner";

// EmailJS dependencies
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");

/**
 * Sends a welcome email to newly registered users
 * @param email Email address of the recipient
 * @param name Name of the recipient
 */
export const sendWelcomeEmail = async (email: string, name: string = ""): Promise<boolean> => {
  try {
    // Use a first name if full name is provided
    const firstName = name.split(' ')[0] || "there";
    
    const templateParams = {
      to_email: email,
      to_name: firstName,
      subject: "Welcome to AptoraX AI 🎉",
      message: `Hi ${firstName}, welcome to AptoraX AI!

You've just unlocked an AI-powered learning experience tailored to your needs. Start exploring quizzes, flashcards, content generators, and more — all designed to help you learn smarter, faster, and with confidence.

Get started by exploring our features:
- Content Generator: Create custom learning materials
- Quiz Generator: Test your knowledge
- Flashcard Generator: Study efficiently
- Learning Assistant: Get personalized help

If you have any questions, just reply to this email. We're here to help!

Happy learning,
The AptoraX AI Team`
    };

    // Send email using EmailJS
    await emailjs.send(
      'YOUR_EMAILJS_SERVICE_ID',
      'YOUR_EMAILJS_TEMPLATE_ID',
      templateParams
    );
    
    console.log("Welcome email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    toast.error("We couldn't send your welcome email, but your account was created successfully!");
    return false;
  }
};
