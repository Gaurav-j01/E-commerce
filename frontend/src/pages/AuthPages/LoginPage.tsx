import React, { useState, useContext } from "react";

import axios from "axios";

import { GoogleLogin } from "@react-oauth/google";

import login_art from "../../assets/login_art.webp";

// Global Context
import { GlobalValue } from "../../context/GlobalValue";
import { AuthContext } from "../../context/AuthContext";

// Styling
import "../../styles/AuthPages_styles/Auth.scss";

interface LoginComponentProps {
  setSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setForgotOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Loginpage: React.FC<LoginComponentProps> = ({
  setSignupOpen,
  setLoginOpen,
  setForgotOpen,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [wrongC, setWrongC] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>(
    "The credentials you entered are incorrect"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const field_state = username.includes("@") && ".com" ? true : false;

  const { passChanged } = useContext(GlobalValue);

  const { setAuthTokens } = useContext(AuthContext);

  const SignupLink = () => {
    setSignupOpen(true);
    setLoginOpen(false);
  };

  const ForgotLink = () => {
    setForgotOpen(true);
    setLoginOpen(false);
  };

  const handleGoogleLogin = (idToken?: string) => {
    axios
      .post("https://shoppy-ly6w.onrender.com/google_login/google/", {
        id_token: idToken,
      })
      .then((response) => {
        setAuthTokens(response.data);
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setLoginOpen(false);
      })
      .catch((error) => {
        console.log(error);
        setWrongC(true);
        setErrorText("Oops! Something went wrong on our end.");
      });
  };

  const postFunction = (field_name: string) => {
    axios
      .post("https://shoppy-ly6w.onrender.com/user_login/api/token/", {
        [field_name]: username.toLowerCase(),
        password: password,
      })
      .then((response) => {
        setIsLoading(false);
        setLoginOpen(false);
        console.log("Response from LoginPage: ", response.data);
        setAuthTokens(response.data);
        localStorage.setItem("authTokens", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        setWrongC(true);
        setIsLoading(false);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (field_state) {
      postFunction("email");
    } else {
      postFunction("username");
    }
  };

  return (
    <div className="login-page">
      <div className="auth-form">
        {passChanged && (
          <div className="login-page__password-changed">
            <span>
              "Password Changed Successfully" &nbsp; <p>✅</p>{" "}
            </span>
          </div>
        )}

        {wrongC && (
          <div className="login-page__password-wrong">
            <span>{errorText}</span>
          </div>
        )}

        <div className="auth-form__text">
          <h4>Welcome back to Shoppy!</h4>
          <h4>Please sign in</h4>

          <div className="auth-form__auth-link">
            <p>New to Shoppy? &nbsp; </p>
            <p onClick={SignupLink}>Create an account</p>
          </div>
        </div>
        <div className="auth-form_google-div">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse.credential);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            type="standard"
            text="signin_with"
            logo_alignment="left"
            width="260px"
            useOneTap
          />
        </div>
        <div className="auth-form__divider">
          <p>or</p>
        </div>
        <div className="auth-form__inputs">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email or Username"
              title="Enter your Email or Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              title="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="auth-form__forgot-password">
              <p onClick={ForgotLink}>Forgot your password?</p>
            </div>

            {isLoading ? (
              <button disabled={true} type="submit">
                <>
                  Signing... &nbsp;
                  <span className="loading-circle"></span>
                </>
              </button>
            ) : (
              <button type="submit">Sign in</button>
            )}
          </form>
        </div>
      </div>

      <div className="auth_bg_img">
        <div className="auth_bg_img_art" style={{ width: "460px" }}>
          <img src={login_art} alt="login_art" />
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
