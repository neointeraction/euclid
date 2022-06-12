import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

import { Layout } from "./layout.styles";

export default function MinimalLayout() {
  return (
    <Layout>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </Layout>
  );
}
