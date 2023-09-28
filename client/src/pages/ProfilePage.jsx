import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../Components/UserContext";
import AccountNav from "./AccountNav";
import PlacesPage from "./PlacesPage";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  // console.log(subpage);

  if (!ready) {
    return "Loading..";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  const logout = async () => {
    localStorage.removeItem("token");
    const response = await fetch("http://localhost:4000/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    setRedirect("/");
    setUser(null);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <div>Account Page for {user.name}</div>
      <div>
        <AccountNav />

        {subpage === "profile" && (
          <div className="text-center max-w-xl mx-auto">
            Logged in as {user.name} ({user.email}) <br />
            <button className="primary max-w-xs mt-2" onClick={logout}>
              Logout
            </button>
          </div>
        )}

        {subpage === "places" && <PlacesPage />}
      </div>
    </>
  );
};

export default ProfilePage;
