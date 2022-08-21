import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

import Header from "components/Header";
import Footer from "components/Footer";

import { Layout, LayoutMain } from "./layout.styles";
import { createContext, useEffect, useState } from "react";
import { webAuth } from "config/auth-config";

export const UserContext = createContext(null);

export default function MainLayout() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    webAuth.client.userInfo(localStorage.getItem('accessToken'), (err, result) => {
      if (err) {
        console.log(err);
      } else {
        setUserDetails(result)
        localStorage.setItem("userId", result.sub);
      }
    })
  }, [])

  
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
