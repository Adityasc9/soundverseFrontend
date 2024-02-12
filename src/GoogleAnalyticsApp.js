import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button, Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './cssFiles/GoogleAnalyticsApp.css';
//import { PROPERTY_ID, CLIENT_ID } from "../from_somewhere";

const GoogleAnalyticsApp = () => {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    clientId:
      process.env.CLIENT_ID,
    responseType: "token",
    scope:
      ["https://www.googleapis.com/auth/analytics.readonly", 
      "https://www.googleapis.com/auth/analytics"].join(" "),
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse?.access_token;
      if (accessToken) {
        navigate("/result", { state: { accessToken } });
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });



  return (
    <div className="App">
      <h1>Google Analytics Report</h1>
      <Button className="button-1" onClick={googleLogin}>
        Check Analytics
      </Button>
    </div>
  );
};

export default GoogleAnalyticsApp;
