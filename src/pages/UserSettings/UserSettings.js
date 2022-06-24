import React, { useState } from "react";

import { Avatar, Grid, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Input, PageHeader, Dropdown, Button } from "components";
import {
  Section,
  SectionTitle,
  ProfileUpload,
  ProfileRemove,
  Box,
  ActionBox,
} from "assets/styles/main.styles";

const UserSettings = () => {
  const [photo, setPhoto] = useState(null);

  const fileHandler = (e) => {
    setPhoto(e.target.files[0]);
  };
  const clearImage = (e) => {
    e.preventDefault();
    setPhoto("");
  };

  return (
    <div>
      <PageHeader pageTitleText="User Settings" />
      <Box>
        <Section>
          <SectionTitle>Profile</SectionTitle>
          <Grid container spacing={2} alignItems="baseline">
            <Grid item xs={3}>
              <ProfileUpload>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={fileHandler}
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
          </Grid>
          <Grid container spacing={2} alignItems="baseline">
            <Grid item xs={3}>
              <Input label="First Name" name="firstName" />
            </Grid>
            <Grid item xs={3}>
              <Input label="Last Name" name="lastName" />
            </Grid>
            <Grid item xs={3}>
              <Input label="Role" name="role" isDisabled />
            </Grid>
          </Grid>
        </Section>
        <Divider className="divider-margin" />
        <Section>
          <SectionTitle>Personal Information</SectionTitle>
          <Grid container spacing={2} alignItems="baseline">
            <Grid item xs={3}>
              <Input label="Email Address" name="email" />
            </Grid>
            <Grid item xs={3}>
              <Input label="Telephone" name="telephone" />
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
        <Divider className="divider-margin" />
        <Section>
          <SectionTitle>Address</SectionTitle>
          <Grid container spacing={2} alignItems="baseline">
            <Grid item xs={3}>
              <Input label="Address line 1" name="address1" />
            </Grid>
            <Grid item xs={3}>
              <Input label="Address line 2" name="address2" />
            </Grid>
            <Grid item xs={3}>
              <Input label="City" name="city" />
            </Grid>
            <Grid item xs={3}>
              <Input label="Zipcode" name="zipcode" />
            </Grid>
            <Grid item xs={3}>
              <Input label="State" name="state" />
            </Grid>
          </Grid>
        </Section>
        <Divider className="divider-margin" />
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
                <Button btnText="Save" variant="contained" onClick={() => {}} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ActionBox>
    </div>
  );
};

export default UserSettings;
