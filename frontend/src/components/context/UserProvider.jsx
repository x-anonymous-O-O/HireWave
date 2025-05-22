// UserProvider.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { USER_API_END_POINT } from "@/utils/uri"; // adjust the import path if needed

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
        console.log("No logged in user");
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
