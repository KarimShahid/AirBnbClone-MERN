import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // useEffect(() => {
  //   if (!user) {
  //     axios
  //       .get("http://localhost:4000/api/profile", {
  //         // withCredentials: true,
  //       })
  //       .then(({ data }) => {
  //         setUser(data);
  //         setReady(true);
  //       });
  //   }
  // }, []);

  const profileData = () => {
    // API Calls
    fetch("http://localhost:4000/api/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setUser(data);
        setReady(true);
      });
  };

  useEffect(() => {
    profileData();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, ready }}>
        {children};
      </UserContext.Provider>
    </>
  );
};
