import React, { useContext, useEffect, useState } from "react";

import { Avatar, Grid, IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

import { Input, PageHeader, Dropdown, Button } from "components";
import {
  Section,
  SectionTitle,
  ProfileUpload,
  ProfileRemove,
  Box,
  ActionBox,
} from "assets/styles/main.styles";
import { webAuth } from "config/auth-config";
import axios from "axios";
import { getHeaders } from "config/api.service";
import auth0 from 'auth0-js';
import { UserContext } from "layout/MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import { ADMIN, appUrl, CONTRIBUTOR, CUSTOMER } from "config/constants";


const UserSettings = () => {
  const fileInput = React.useRef();
  const [photo, setPhoto] = useState(null);
  const [files, setFiles] = useState([]);
  const [userData, setUserData] = useState({});
  const { userDetails } = useContext(UserContext);
  const navigate = useNavigate();


  const photoHandler = (e) => {
    setPhoto(e.target.files[0]);
  };

  const clearImage = (e) => {
    e.preventDefault();
    setPhoto("");
  };

  const fileHandler = (e) => {
    setFiles(Array.from(e.target.files));
    console.log(files);
  };

  const onUpdate = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    if (userDetails) {
      webAuth.checkSession({
        audience: `https://dev-qurience.eu.auth0.com/api/v2/`,
        scope: 'read:current_user',
        responseType: "token",
        redirectUri: appUrl,
      }, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          var auth0Manage = new auth0.Management({
            domain: 'dev-qurience.eu.auth0.com',
            token: result.accessToken
          });
          auth0Manage.getUser(userDetails?.sub, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              setUserData(result.user_metadata);
            }
          })
        }
      })
    }
  }, [userDetails]);

  const onSave = () => {
    webAuth.checkSession({
      audience: `https://dev-qurience.eu.auth0.com/api/v2/`,
      redirectUri: appUrl,
      responseType: "token",
      scope: "update:current_user_metadata",
    }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        var auth0Manage = new auth0.Management({
          domain: 'dev-qurience.eu.auth0.com',
          token: result.accessToken
        });
        auth0Manage.patchUserMetadata(userDetails?.sub, userData, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            if (userDetails.userRoles.includes(ADMIN)) {
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

  return (
    <div>
      <PageHeader pageTitleText="User Settings" />
      <Box>
        <Section>
          <SectionTitle>Profile</SectionTitle>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3} textAlign={"center"}>
              <ProfileUpload>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={photoHandler}
                />
                <label htmlFor="contained-button-file">
                  <Avatar
                    src={photo ? URL.createObjectURL(photo) : null}
                    className="avatar"
                  />
                  {photo && (
                    <ProfileRemove>
                      <IconButton aria-label="close" onClick={clearImage}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </ProfileRemove>
                  )}
                </label>
              </ProfileUpload>
            </Grid>
            <Grid item xs={3}>
              <Input label="First Name" name="firstName" value={userData?.firstName} onChange={onUpdate} />
            </Grid>
            <Grid item xs={3}>
              <Input label="Last Name" name="lastName" value={userData?.lastName} onChange={onUpdate} />
            </Grid>
            <Grid item xs={3}>
              <Input label="Role" name="role" isDisabled value={userDetails?.userRoles[0].length ? userDetails?.userRoles[0] : ""} />
            </Grid>
          </Grid>
        </Section>
        {/* <Divider className="divider-margin" /> */}
        <Section>
          <SectionTitle>Personal Information</SectionTitle>
          <Grid container spacing={2} alignItems="baseline">
            <Grid item xs={3}>
              <Input label="Email Address" name="email" value={userData?.email} onChange={onUpdate} />
            </Grid>
            <Grid item xs={3}>
              <Input label="Telephone" name="telephone" value={userData?.telephone} onChange={onUpdate} />
            </Grid>
            <Grid item xs={3}>
              <Dropdown
                label="Country"
                name="country"
                options={[
                  {
                    id: "option a",
                    optionText: "Option A",
                  },
                  {
                    id: "option b",
                    optionText: "Option B",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={3}>
              <Dropdown
                label="Language"
                name="language"
                options={[
                  {
                    id: "option a",
                    optionText: "Option A",
                  },
                  {
                    id: "option b",
                    optionText: "Option B",
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Section>
        {/* <Divider className="divider-margin" /> */}
        <Section>
          <SectionTitle>Address</SectionTitle>
          <Grid container spacing={2} alignItems="baseline">
            <Grid item xs={3}>
              <Input label="Address line 1" name="address" value={userData?.address} onChange={onUpdate} />
            </Grid>
            <Grid item xs={3}>
              <Input label="Address line 2" name="address2" value={userData?.address2} onChange={onUpdate} />
            </Grid>
            <Grid item xs={3}>
              <Input label="City" name="city" value={userData?.city} onChange={onUpdate} />
            </Grid>
            <Grid item xs={3}>
              <Input label="Zipcode" name="zipcode" value={userData?.zipcode} onChange={onUpdate} />
            </Grid>
            <Grid item xs={3}>
              <Input label="State" name="state" onChange={onUpdate} value={userData?.state} />
            </Grid>
          </Grid>
        </Section>
        {/* <Divider className="divider-margin" /> */}
        <Section>
          <SectionTitle>Password Management</SectionTitle>
          <Grid container spacing={2} alignItems="baseline">
            <Grid item xs={3}>
              <Input label="New Password" name="newPwd" />
            </Grid>
            <Grid item xs={3}>
              <Input label="Confirm Password" name="confirmPwd" />
            </Grid>
          </Grid>
        </Section>
        <Section>
          <SectionTitle>Attachments</SectionTitle>
          <Grid container spacing={2} alignItems="baseline">
            <Grid item xs={2}>
              <div>
                <Button
                  startIcon={<InsertDriveFileOutlinedIcon fontSize="small" />}
                  btnText="Upload your Document"
                  variant="secondary"
                  onClick={() => fileInput.current.click()}
                >
                  upload file
                </Button>

                <input
                  onChange={fileHandler}
                  ref={fileInput}
                  type="file"
                  multiple
                  style={{ display: "none" }}
                />
              </div>
            </Grid>
            {files?.map((item) => (
              <Grid item>
                <Chip
                  className="upload-chip"
                  icon={<InsertDriveFileOutlinedIcon fontSize="small" />}
                  label={item?.name}
                  variant="outlined"
                  onDelete={() => { }}
                />
              </Grid>
            ))}
          </Grid>
        </Section>
      </Box>
      <ActionBox>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Grid item xs={6} textAlign="left"></Grid>
          <Grid item xs={6} textAlign="right">
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item xs={3} textAlign="right">
                <Button
                  btnText="Cancel"
                  variant="outlined"
                  onClick={() => console.log("clicked")}
                />
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Button btnText="Save" variant="contained" onClick={() => { onSave() }} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ActionBox>
    </div>
  );
};

export default UserSettings;
