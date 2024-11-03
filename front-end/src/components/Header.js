import { SignOutButton, useAuth } from "@clerk/clerk-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LocationSelector from "../pages/User/LocationSelector";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function Header() {
  const { isSignedIn } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElInfo, setAnchorElInfo] = useState(null);
  const [anchorElForecast, setAnchorElForecast] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Dropdown handlers
  const handleInfoMenuOpen = (event) => setAnchorElInfo(event.currentTarget);
  const handleInfoMenuClose = () => setAnchorElInfo(null);

  const handleForecastMenuOpen = (event) =>
    setAnchorElForecast(event.currentTarget);
  const handleForecastMenuClose = () => setAnchorElForecast(null);

  // Grouped Menu Items
  const yourInfoItems = [
    { text: "Profile", path: "/dashboard/profile" },
    { text: "Other Details", path: "/dashboard/user-form" },
    { text: "Volunteering", path: "/dashboard/Volunteering" },
  ];

  const forecastItems = [
    { text: "Flood Maps", path: "/dashboard/flood-map" },
    { text: "Current Weather", path: "/dashboard/weather" },
    { text: "Weather History", path: "/dashboard/weather-history" },
    { text: "Alerts", path: "/dashboard/alerts" },
    { text: "Blog Posts", path: "/dashboard/blog-post" },
  ];

  const authLinks = isSignedIn ? (
    <>
      <SignOutButton>
        <Button color="inherit">Sign Out</Button>
      </SignOutButton>
      <LocationSelector />
    </>
  ) : (
    <>
      <Button color="inherit" component={Link} to="/sign-in">
        Sign In
      </Button>
      <Button color="inherit" component={Link} to="/sign-up">
        Sign Up
      </Button>
    </>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "primary.main",
          minHeight: "50px",
          maxWidth: "550px",
          margin: "0 auto",
          left: 0,
          right: 0,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          {isMobile && (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, textAlign: "center" }}
              >
                Dashboard
              </Typography>
            </>
          )}

          {!isMobile && (
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              {/* Dropdown for Your Info */}
              <Button
                color="inherit"
                onClick={handleInfoMenuOpen}
                sx={{
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "white",
                  },
                }}
              >
                Your Info
              </Button>
              <Menu
                anchorEl={anchorElInfo}
                open={Boolean(anchorElInfo)}
                onClose={handleInfoMenuClose}
              >
                {yourInfoItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    component={Link}
                    to={item.path}
                    onClick={handleInfoMenuClose}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>

              {/* Dropdown for Forecast */}
              <Button
                color="inherit"
                onClick={handleForecastMenuOpen}
                sx={{
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "white",
                  },
                }}
              >
                Forecast
              </Button>
              <Menu
                anchorEl={anchorElForecast}
                open={Boolean(anchorElForecast)}
                onClose={handleForecastMenuClose}
              >
                {forecastItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    component={Link}
                    to={item.path}
                    onClick={handleForecastMenuClose}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>


              {/* Updates*/}
              <Button
                color="inherit"
                component={Link}  // Use Link to navigate to /dashboard/updates
                to="/dashboard/updates"
                sx={{
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "white",
                  },
                }}
              >
                Updates
              </Button>


              {authLinks}
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          <ListItem>
            <ListItemText primary="Your Info" />
          </ListItem>
          {yourInfoItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem>
            <ListItemText primary="Forecast" />
          </ListItem>
          {forecastItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem>{authLinks}</ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Header;
