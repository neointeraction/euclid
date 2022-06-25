import React from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography, Checkbox, FormControlLabel } from "@mui/material";

import { Box } from "assets/styles/main.styles";
import Logo from "assets/images/logo.svg";

import { Button, Input } from "components";

import {
  FullPageContainer,
  ImageLogoLogin,
  RememberForgotFlex,
} from "assets/styles/main.styles";

const Login = () => {
  const navigate = useNavigate();
  // using formik for form handling
  const { handleChange, handleSubmit, values, errors, handleBlur } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Please enter your username"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: (values) => {
      // TODO: Implement login logic here
      console.log("Trying to login with --- ", values);
    },
  });
  return (
    <FullPageContainer>
      <Box noPadding>
        <form
          style={{
            width: "400px",
            display: "flex",
            gap: 22,
            flexDirection: "column",
            padding: "40px 40px",
          }}
          onSubmit={handleSubmit}
        >
          <ImageLogoLogin>
            <img src={Logo} alt="Logo" />
          </ImageLogoLogin>

          <Typography
            variant="h6"
            style={{ marginTop: "", marginBottom: "6px", textAlign: "center" }}
          >
            Welcome to Euclid
          </Typography>
          <Input
            value={values.username}
            name="username"
            placeholder="Enter your username"
            label="Username"
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.username}
          />
          <Input
            value={values.password}
            name="password"
            placeholder="Enter your password"
            label="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.password}
          />
          <RememberForgotFlex>
            <FormControlLabel
              className="custom-checkbox"
              control={<Checkbox />}
              label="Remember Me"
            />
            <Button
              btnText="Forgot Password ?"
              variant="text"
              onClick={() => console.log("clicked")}
            />
          </RememberForgotFlex>
          <Button
            style={{ width: "100%" }}
            variant="contained"
            btnText="Submit"
            type="submit"
            onClick={() => navigate("/contributor-dashboard")}
          />
        </form>
      </Box>
    </FullPageContainer>
  );
};

export default Login;
