import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { webAuth } from "config/auth-config";
import { ADMIN, appUrl, CONTRIBUTOR, CUSTOMER } from "config/constants";
import { LocalStorageCache, useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [regValues, setRegValues] = useState({});
  const location = useLocation();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

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
      onSubmit(values.username, values.password);
    },
  });

  const getToken = async () => {
    var data = await webAuth.currentSession();
    return data.idToken.jwtToken;
  };

  async function storeToken() {
    getToken().then((data) => {
      localStorage.setItem("token", data);
      // dispatch(getAccount());
    });
  }

  const onSubmit = (email, password) => {
    // setProgress(true);
    webAuth.login({
      username: email,
      password: password,
      redirectUri: appUrl,
      responseType: "token id_token",
      realm: "Username-Password-Authentication",
      scope: "openid profile email offline_access"
    }, (err, result) => {
      if (err) {
        console.log("failed to login");
        return
      }
      storeToken();
      console.log("result", result)
    })
  };

  const onRegister = () => {
    webAuth.signup({
      connection: 'Username-Password-Authentication',
      email: regValues.email,
      password: regValues.password,
      username: regValues.email,
      userMetadata: regValues,
    }, () => {
      storeToken();
      navigate("/customer-dashboard");
    })
  };

  const handleRegisterChange = (e) => {
    setRegValues({ ...regValues, [e.target.name]: e.target.value })
  }

  const processHash = (hash) => {
    webAuth.parseHash({ hash }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const tempKeys = Object.keys(result);
        for (let element of tempKeys) {
          localStorage.setItem([element], result[element]);
        }
        webAuth.client.userInfo(localStorage.getItem('accessToken'), (err, result) => {
          if (err) {
            console.log(err);
          } else {
            localStorage.setItem("roles", result.userRoles);
            if (result.userRoles.includes(ADMIN)) {
              navigate("/admin-dashboard");
            } else if (result.userRoles.includes(CUSTOMER)) {
              navigate("/customer-dashboard");
            } else if (result.userRoles.includes(CONTRIBUTOR)) {
              navigate("/contributor-dashboard");
            } else {
              navigate("/reviewer-dashboard")
            }
          }
        })
      }
    })
  }

  const forgotPassword = (email) => {
    webAuth.changePassword({
      connection: 'Username-Password-Authentication',
      email
    }, (err, result) => {
      if (err) {
        console.log("failed to login");
        return
      }
      console.log("result", result);
    })
  }

  useEffect(() => {
    if (location.hash) {
      processHash(location.hash);
    }
  }, [location]);

  const handleForgotPassword = () => {
    webAuth.changePassword({
      connection: 'Username-Password-Authentication',
      email: resetEmail
    }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    })
  }

  return (
    <FullPageContainer>
      {!!isForgotPassword ?
        (<Box noPadding>
          <form
            style={{
              width: "340px",
              display: "flex",
              gap: 22,
              flexDirection: "column",
              padding: "40px 40px",
            }}
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
              Reset Password
            </Typography>
            <Input
              value={resetEmail}
              name="email"
              placeholder="Enter your email"
              label="Email"
              onChange={(e) => setResetEmail(e.target.value)}
              errorText={errors.username}
            />
            <Button
              variant="contained"
              btnText="Submit"
              onClick={() => handleForgotPassword()}
            />
            <Button
              startIcon={<PersonAddOutlinedIcon />}
              btnText="Login Now"
              variant="text"
              onClick={() => setIsForgotPassword(false)}
            />
          </form>
        </Box>)
        :
        (
          <>
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
                    type="password"
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
                      onClick={() => setIsForgotPassword(true)}
                    />
                  </RememberForgotFlex>
                  <Button
                    variant="contained"
                    btnText="Submit"
                    type="submit"
                  //  For Demo -  To be removed
                  // onClick={() => {
                  //   navigate(
                  //     values.username === "admin"
                  //       ? "/admin-dashboard"
                  //       : values.username === "customer"
                  //       ? "/customer-dashboard"
                  //       : values.username === "reviewer"
                  //       ? "/reviewer-dashboard"
                  //       : "/contributor-dashboard"
                  //   );
                  //   localStorage.setItem(
                  //     "user",
                  //     values.username ? values.username : "Contributor"
                  //   );
                  // }}
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
                        name="firstName"
                        placeholder="Enter your First Name"
                        label="First Name"
                        value={regValues.firstName}
                        onChange={handleRegisterChange}
                      // onBlur={handleBlur}
                      // errorText={errors.password}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Input
                        name="lastName"
                        placeholder="Enter your Last Name"
                        label="Last Name"
                        value={regValues.lastName}
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Input name="Age" placeholder="Enter your Age" label="Age" />
                    </Grid>
                    <Grid item xs={6}>
                      <Input
                        name="education"
                        placeholder="Enter your Education"
                        label="Education"
                        value={regValues.education}
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        name="address"
                        placeholder="Enter your Address"
                        label="Address"
                        value={regValues.address}
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Input
                        name="email"
                        placeholder="Enter your Email"
                        label="Email"
                        value={regValues.email}
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Input
                        name="password"
                        placeholder="Enter your password"
                        label="Password"
                        value={regValues.password}
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    variant="contained"
                    btnText="Submit"
                    onClick={() => {
                      onRegister()
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
          </>
        )
      }
    </FullPageContainer>
  );
};

export default Login;
