// ./component/user/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user_id = Cookies.get('user_id');
    const user_name = Cookies.get('user_name');
    const user_email = Cookies.get('user_email');
    const levelpoint = Cookies.get('levelpoint');

    if (user_id && user_name && user_email && levelpoint) {
      setUser({
        user_id,
        user_name,
        user_email,
        levelpoint,
      });
    } else {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/users');
          if (response.data.code === 200) {
            setUser(response.data.result);
            Cookies.set('user_id', response.data.result.user_id, { expires: 7 });
            Cookies.set('user_name', response.data.result.user_name, { expires: 7 });
            Cookies.set('user_email', response.data.result.user_email, { expires: 7 });
            Cookies.set('levelpoint', response.data.result.levelpoint, { expires: 7 });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
