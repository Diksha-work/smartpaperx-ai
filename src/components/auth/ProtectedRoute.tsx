
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SignupModal } from "@/components/auth/SignupModal";
import { LoginModal } from "@/components/auth/LoginModal";
import { LockIcon } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading, setRedirectPath } = useAuth();
  const location = useLocation();
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // If not loading and no user, show auth alert and set redirect path
    if (!loading && !currentUser) {
      setShowAuthAlert(true);
      // Store the current path for redirect after login
      setRedirectPath(location.pathname);
    }
  }, [currentUser, loading, location.pathname, setRedirectPath]);

  // Handle modal switching
  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  // Handle signup flow
  const handleSignupClick = () => {
    setShowAuthAlert(false);
    setShowSignupModal(true);
  };

  const handleSignupSuccess = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
    // If the user closed the login modal without logging in, redirect to home
    if (!currentUser) {
      // We'll set the auth alert to false to avoid a loop if they're redirected to home
      setShowAuthAlert(false);
    }
  };

  // If still loading, don't render anything yet
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }

  // If user is authenticated, render the protected content
  if (currentUser) {
    return <>{children}</>;
  }

  // If user is not authenticated, show the auth flow
  return (
    <>
      <AlertDialog open={showAuthAlert} onOpenChange={setShowAuthAlert}>
        <AlertDialogContent className="max-w-md">
          <div className="flex items-center justify-center mb-4 text-primary">
            <LockIcon className="h-12 w-12" />
          </div>
          <AlertDialogTitle className="text-center text-xl">Authentication Required</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Please sign up or log in to access this feature.
          </AlertDialogDescription>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Button onClick={handleSignupClick} className="flex-1">
              Sign Up
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowAuthAlert(false);
                setShowLoginModal(true);
              }}
              className="flex-1"
            >
              Log In
            </Button>
          </div>
          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              onClick={() => {
                setShowAuthAlert(false);
              }}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Return to Home
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <SignupModal 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)} 
        onSuccess={handleSignupSuccess}
        onLoginClick={handleSwitchToLogin}
      />
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={handleLoginClose}
        onSignupClick={handleSwitchToSignup}
      />

      {/* Redirect to home while auth alert is shown */}
      {!currentUser && !showAuthAlert && !showSignupModal && !showLoginModal && (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};
