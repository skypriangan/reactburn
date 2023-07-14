import axios from "axios";
import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api_url from "./config";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem("tokens")) {
      let tokens = JSON.parse(localStorage.getItem("tokens"));
      return jwt_decode(tokens.token);
    }
    return null;
  });

  const navigate = useNavigate();

  const login = async (payload) => {
    const apiResponse = await axios.post(
      api_url+ "v1/login",
      payload
    );
    localStorage.setItem("tokens", JSON.stringify(apiResponse.data));    
    setUser(jwt_decode(apiResponse.data.token));
    // console.log(jwt_decode(apiResponse.data.token))
    navigate("/page-admin");
  };
  const logout = async () => {
    await axios.post(
      "http://siska-dev-api.jakpro.co.id/v1/logout",null,
      {
         headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("tokens")).token}`,
         }
       }
    ).then(function (response) {
      // handle success
      if(response.data.status==='sukses'){
          localStorage.removeItem("tokens");
          setUser(null);
          navigate("/");    
      }      
    }).catch(function (error) {
    // handle error
    console.log(error);
  });
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
