import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "assets/images/logo.svg";
import { ReactComponent as Home } from "assets/images/icons/home.svg";
import Logout from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Arrow from "assets/images/icons/menu-down.svg";
import ListItemIcon from "@mui/material/ListItemIcon";

import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth0 } from "@auth0/auth0-react";

import {
  contributorRoutes,
  customerRoutes,
  reviewerRoutes,
  adminRoutes,
} from "./routes/routes.config";

import {
  HeaderContainer,
  LogoContainer,
  LeftMenuBlock,
  MenuItemList,
  RightMenuBlock,
  LastLoginText,
  ProfileBlock,
  ProfileSection,
  NameTag,
  MenuArrow,
} from "./header.styles";
import { webAuth } from "config/auth-config";
import { UserContext } from "layout/MainLayout/MainLayout";
import { appUrl, monthNames } from "config/constants";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { userDetails } = useContext(UserContext);
  const url = pathname.split("/");

  const checkActive = (menu) => {
    if (
      ((url[1] === "contributor-dashboard" ||
        url[1] === "customer-dashboard" ||
        url[1] === "admin-dashboard" ||
        url[1] === "reviewer-dashboard") &&
        menu === "Dashboard") ||
      (url[1] === "add-triple" && menu === "Add Triple") ||
      ((url[1] === "triple-history" || url[1] === "view-triple") &&
        menu === "Triple History") ||
      (url[1] === "query-triple" && menu === "Query Triple")
    ) {
      return true;
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Menu func
  const [userType, setUseType] = useState("");
  const [menuRoutes, setMenuRoutes] = useState([]);
  const [lastLogin, setLastLogin] = useState("");

  // Demo code -  can be removed during implementation
  let data = localStorage.user;
  useEffect(() => {
    data && setUseType(data); // Demo code -  can be removed during implementation
  }, [userType, data]);

  useEffect(() => {
    if (userDetails) {
      const date = new Date(userDetails.updated_at);
      setLastLogin(
        `${date.getDay()} ${
          monthNames[date.getMonth() + 1]
        }  ${date.getHours()}:${date.getMinutes()}`
      );
      userDetails.userRoles[0] === "Customer"
        ? setMenuRoutes(customerRoutes)
        : userDetails.userRoles[0] === "Reviewer"
        ? setMenuRoutes(reviewerRoutes)
        : userDetails.userRoles[0] === "Admin"
        ? setMenuRoutes(adminRoutes)
        : setMenuRoutes(contributorRoutes);
    }
  }, [userDetails]);

  const logOut = () => {
    localStorage.clear();
    webAuth.logout(
      {
        redirectUri: appUrl,
        realm: "Username-Password-Authentication",
        returnTo: appUrl,
      },
      (err, result) => {
        if (err) {
          console.log("failed to logout");
          return;
        }
        navigate("/");
      }
    );
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <img src={Logo} alt="Logo" />
      </LogoContainer>
      <LeftMenuBlock>
        {menuRoutes.map((item) => (
          <Link key={item.menu} to={item.link} className="link">
            <MenuItemList isActive={checkActive(item.menu) ? true : false}>
              {item.menu === "Dashboard" ? (
                <Home className="home-icon" />
              ) : (
                item.menu
              )}
            </MenuItemList>
          </Link>
        ))}
      </LeftMenuBlock>
      <RightMenuBlock>
        <LastLoginText>Last Login : {lastLogin}</LastLoginText>
        <ProfileBlock>
          <ProfileSection onClick={handleClick}>
            <Avatar src={userDetails?.picture} />
            <NameTag>
              <span className="p-user-name">{userDetails?.name}</span>
              <Chip
                label={userDetails?.userRoles[0]}
                size="small"
                className="custom-chip"
              />
            </NameTag>
            <MenuArrow>
              <img src={Arrow} alt="Arrow" />
            </MenuArrow>
          </ProfileSection>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            disableRipple
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.10))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => navigate("/user-settings")}>
              <ListItemIcon>
                <SettingsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              User Settings
            </MenuItem>
            <MenuItem onClick={() => logOut()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </ProfileBlock>
      </RightMenuBlock>
    </HeaderContainer>
  );
};

export default Header;
