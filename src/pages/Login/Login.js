import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography, Checkbox, FormControlLabel } from "@mui/material";

import { Box } from "assets/styles/main.styles";
import Logo from "assets/images/logo.svg";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

import { Button, Input } from "components";

import {
  FullPageContainer,
  ImageLogoLogin,
  RememberForgotFlex,
} from "assets/styles/main.styles";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const showRegisterForm = () => {
    setIsRegister(true);
  };

  const showLoginForm = () => {
    setIsRegister(false);
  };

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
      {!isRegister ? (
        <Box noPadding>
          <form
            style={{
              width: "340px",
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
              style={{
                marginTop: "",
                marginBottom: "6px",
                textAlign: "center",
              }}
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
              variant="contained"
              btnText="Submit"
              type="submit"
              //  For Demo -  To be removed
              onClick={() => {
                navigate(
                  values.username === "admin"
                    ? "/admin-dashboard"
                    : values.username === "customer"
                    ? "/customer-dashboard"
                    : values.username === "reviewer"
                    ? "/reviewer-dashboard"
                    : "/contributor-dashboard"
                );
                localStorage.setItem(
                  "user",
                  values.username ? values.username : "Contributor"
                );
              }}
              //  For Demo -  To be removed
            />
            <Button
              startIcon={<PersonAddOutlinedIcon />}
              btnText="Register Now"
              variant="text"
              onClick={showRegisterForm}
            />
          </form>
        </Box>
      ) : (
        <Box noPadding>
          <form
            style={{
              width: isRegister ? "450px" : "340px",
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
              style={{
                marginTop: "",
                marginBottom: "6px",
                textAlign: "center",
              }}
            >
              Register to Euclid
            </Typography>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid item xs={6}>
                <Input
                  name="FirstName"
                  placeholder="Enter your First Name"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  name="LastName"
                  placeholder="Enter your Last Name"
                  label="Last Name"
                />
              </Grid>
              <Grid item xs={6}>
                <Input name="Age" placeholder="Enter your Age" label="Age" />
              </Grid>
              <Grid item xs={6}>
                <Input
                  name="Education"
                  placeholder="Enter your Education"
                  label="Education"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  name="Address"
                  placeholder="Enter your Address"
                  label="Address"
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  name="Email"
                  placeholder="Enter your Email"
                  label="Email"
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  name="Password"
                  placeholder="Enter your Password"
                  label="Password"
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              btnText="Submit"
              type="submit"
              onClick={() => {
                console.log("clicked");
              }}
            />
            <Button
              startIcon={<ChevronLeftOutlinedIcon />}
              btnText="Back to Login"
              variant="text"
              onClick={showLoginForm}
            />
          </form>
        </Box>
      )}
    </FullPageContainer>
  );
};

export default Login;
