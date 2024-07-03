import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";
import defaultProfilePhoto from "../assets/images/defaultProfilePic.png"
import { BASE_URL } from "../constants";
import UserContext from "../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const pages = [
    {
      register: "Create New Account",
      profile: "Profile",
      dashboard: "Dashboard",
      logout: "Logout",
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Task Manager App
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user.imageUrl ? `${BASE_URL}${user.imageUrl}` : defaultProfilePhoto} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {pages.map((page, i) => (
                <MenuItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                  key={i}
                  onClick={handleCloseUserMenu}
                >
                  {Object.entries(page).map(([url, title]) => (
                    <Button fullWidth sx={{ justifyContent: 'flex-start'}} key={url} onClick={() => navigate(url)}>
                      {title}
                    </Button>
                  ))}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
