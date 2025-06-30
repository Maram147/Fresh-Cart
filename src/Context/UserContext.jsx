import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(() => localStorage.getItem("userToken"));
  const [userProfile, setUserProfile] = useState(() => {
    const profile = localStorage.getItem("userProfile");
    return profile ? JSON.parse(profile) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const profile = localStorage.getItem("userProfile");

    if (token) {
      setUserLogin(token);
    }

    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin, userProfile, setUserProfile }}>
      {props.children}
    </UserContext.Provider>
  );
}
