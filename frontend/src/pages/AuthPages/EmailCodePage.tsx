import React, { useState, useContext } from "react";

import axios from "axios";

import { MdMarkEmailUnread } from "react-icons/md";

import code_art from "../../assets/code_art.webp";

interface EmailCodeComponentProps {
  setNewPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailCode: React.Dispatch<React.SetStateAction<boolean>>;
}

// Global Context
import { GlobalValue } from "../../context/GlobalValue";

// Styling
import "../../styles/AuthPages_styles/EmailCodePage.scss";

const RecoverCodePage: React.FC<EmailCodeComponentProps> = ({
  setNewPassword,
  setEmailCode,
}) => {
  const [noCode, setNoCode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  const { userCode, userId, setUserCode, userEmail } = useContext(GlobalValue);

  const handleCodeSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("https://shoppy-ly6w.onrender.com/user_login/reset_code/", {
        user_id: userId,
        user_code: userCode,
      })
      .then((response) => {
        if (response.status == 200) {
          setEmailCode(false);
          setNewPassword(true);
          setIsLoading(false);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorText(error.response.data.error);
        setNoCode(true);
        setIsLoading(false);
      });
  };

  return (
    <div className="email-code">
      {/* Form Container */}
      <div className="email-code__recover-form">
        {noCode && (
          <div className="email-code__recover-match">
            <span>"{errorText}"</span>
          </div>
        )}
        <div className="email-code__container-text">
          <p>
            <MdMarkEmailUnread />
          </p>
          <h3>Password Recovery</h3>
          <p>
            Please check your email <b>{userEmail}</b> for a verification code
            and enter it below to recover your account.
          </p>
        </div>
        <form onSubmit={handleCodeSubmission}>
          <input
            type="number"
            placeholder="Enter Recovery Code"
            title="Enter your Code"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            required
          />

          {isLoading ? (
            <button disabled={true} type="submit">
              Submitting... &nbsp;
              <span></span>
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </form>
      </div>

      {/* Image Container */}
      <div className="auth_bg_img">
        <div className="auth_bg_img_logo"></div>
        <div className="auth_bg_img_art" style={{ width: "460px" }}>
          <img src={code_art} alt="code_art" />
        </div>
      </div>
    </div>
  );
};

export default RecoverCodePage;
