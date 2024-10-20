/* global google */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAuth } from "../../context/AuthContext"; // Import useAuth

const LoginWithGoogle = () => {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = () => {
        google.accounts.id.initialize({
          client_id:
            "398510161977-oihei3hqkrh7u56ifkekmo3rk32nb05p.apps.googleusercontent.com",
          callback: handleCallbackResponse,
        });
        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
          theme: "outline",
          size: "large",
        });
      };
      document.body.appendChild(script);
    };

    loadGoogleScript();
  }, []);

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);

    fetch("https://localhost:7285/api/User/google-login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${response.credential}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.credential),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Server response:", data);
        if (data.token) {
          // Use the login function from AuthContext
          login(data.token, data.user);
          setUserName(data.user.userName);
          setIsLoggedIn(true);
          message.success("Login successful");
          navigate("/"); // Redirect to home page
        }
      })
      .catch((error) => {
        console.error("Error during Google login:", error);
        message.error("Google login failed. Please try again.");
      });
  };

  return (
    <div>
      <h1>Login with Google</h1>
      {isLoggedIn ? (
        <h2>Chào mừng, {userName}!</h2>
      ) : (
        <div id="signInDiv"></div>
      )}
    </div>
  );
};

export default LoginWithGoogle;
