import "./App.css";
import Layout from "./components/shared/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Posts from "./pages/Posts.js";
import { AuthContextProvider } from "./components/shared/AuthContext";
import InfoJwt from "./pages/InfoJwt";
import ProtectedRoute from "./components/shared/ProtectedRoute";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/login"
              element={
                <ProtectedRoute accessBy="non-authenticated">
                  <Login />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/page-admin"
              element={
                <ProtectedRoute accessBy="authenticated">
                  <Admin />
                </ProtectedRoute>
              }
            ></Route>
             <Route
              path="/info-jwt"
              element={
                <ProtectedRoute accessBy="authenticated">
                  <InfoJwt />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/posts"
              element={
                <ProtectedRoute accessBy="authenticated">
                  <Posts />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default App;
