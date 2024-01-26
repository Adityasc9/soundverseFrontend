import GoogleAnalyticsApp from './GoogleAnalyticsApp';
import Result from './Result'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider
        clientId={"333337715220-27gt2o4as3qdlh3pgufmua1u51n5u7n1.apps.googleusercontent.com"}>
        <Routes>
          <Route path="/" element={<GoogleAnalyticsApp />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
