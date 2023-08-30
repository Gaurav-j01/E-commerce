import React, { useContext } from "react";
import axios from "axios";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GlobalValue } from "../context/GlobalValue";
import { MyUserInterface } from "../components/CommonInterfaces";
// Styling
import "../styles/ProfilePage.scss";

interface ProfilePageInterface {
  setUserData: React.Dispatch<React.SetStateAction<MyUserInterface | null>>;
}

const ProfilePage: React.FC<ProfilePageInterface> = ({setUserData}) => {
  const { authTokens, callLogout } = useContext(AuthContext);
  const { setProfilePage } = useContext(GlobalValue);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    data: UserProfile,
    error
  } = useQuery<MyUserInterface>(["user_profile"], () =>
    axios
      .get<MyUserInterface>("http://127.0.0.1:8000/user_profile/info/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => response.data)
  );

  if (error) {
    navigate("/");
  }

  const logUserOut = () => {
    callLogout();
    navigate("/");
    setProfilePage(false)
    setUserData(null)
    queryClient.removeQueries(["user_profile"]);
  };

  return (
    <>
      <div
        className="profile_page_container"
        onClick={() => setProfilePage(false)}
      />
      <section className="profile_main_container">
        <main>
          <div className="profile_container_picture">
            <img
              src={`http://127.0.0.1:8000${UserProfile?.picture}`}
              alt={UserProfile?.user}
            />
          </div>
          <div className="profile_container_name">
            <p>{UserProfile?.user}</p>
          </div>
        </main>
        <div className="profile_container_logout">
          <button onClick={logUserOut}>Logout User</button>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
