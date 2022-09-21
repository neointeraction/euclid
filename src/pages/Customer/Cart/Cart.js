import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, PageHeader } from "components";
import CartTable from "./components/CartTable";

import { Section, Box } from "assets/styles/main.styles";

const Cart = () => {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState([]);
  console.log(selectedRow);
  return (
    <div>
      <PageHeader
        pageTitleText="Cart"
        rightSideContent={
          <Button
            btnText="Buy Triple"
            variant="contained"
            disabled={true}
            onClick={() => navigate("/search-result")}
          />
        }
      />
      <Section>
        <Box>
          <CartTable hideFilter setSelectedRow={setSelectedRow} />
        </Box>
      </Section>
    </div>
  );
};

export default Cart;
