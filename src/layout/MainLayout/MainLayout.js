import { Outlet, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";

import Header from "components/Header";
import Footer from "components/Footer";

import { Layout, LayoutMain } from "./layout.styles";
import { createContext, useEffect, useState } from "react";
import { webAuth } from "config/auth-config";
import { appUrl } from "config/constants";

export const UserContext = createContext(null);

export default function MainLayout() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    webAuth.client.userInfo(localStorage.getItem('accessToken'), (err, result) => {
      if (err) {
        console.log(err);
        logOut();
      } else {
        setUserDetails(result)
        localStorage.setItem("userId", result.sub);
      }
    })
  }, [])

  const logOut = () => {
    localStorage.clear();
    webAuth.logout({
      redirectUri: appUrl,
      realm: "Username-Password-Authentication"
    }, (err, result) => {
      if (err) {
        console.log("failed to logout");
        return
      }
      navigate("/")
    })
  };

  
  return (
    <Layout>
      <UserContext.Provider value={{ userDetails }}>
        <Header />
        <Container maxWidth={false}>
          <LayoutMain>
            <Outlet />
          </LayoutMain>
        </Container>
        <Footer />
      </UserContext.Provider>
    </Layout>
  );
}
