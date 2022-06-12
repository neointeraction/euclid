import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

import Header from "components/Header";
import Footer from "components/Footer";

import { Layout, LayoutMain } from "./layout.styles";

export default function MainLayout() {
  return (
    <Layout>
      <Header />
      <Container maxWidth="xl">
        <LayoutMain>
          <Outlet />
        </LayoutMain>
      </Container>
      <Footer />
    </Layout>
  );
}
