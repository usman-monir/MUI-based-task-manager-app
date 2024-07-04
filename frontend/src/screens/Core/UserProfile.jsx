import { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  IconButton,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AuthService from "../../services/authService";
import defaultProfilePhoto from "../../assets/images/defaultProfilePic.png";
import { BASE_URL } from "../../constants";
import UserContext from "../../context/UserContext";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [userFormData, setUserFormData] = useState(user);
  const [message, setMessage] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (!userFormData.name || !userFormData.email) {
      setMessage("All fields are required");
      return;
    } else if (userFormData.password != userFormData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    const response = await AuthService.updateProfile(
      userFormData.name,
      userFormData.email,
      userFormData.password,
      userFormData.imageUrl
    );
    if (response?.success) setUser(response?.data);
    setMessage(response?.message);
    setIsEditing(false);
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profilePic", file);
    if (!formData || !file) {
      setMessage("Please select a valid file.");
      return;
    }
    const response = await AuthService.uploadProfilePicture(formData);
    if (response?.success) {
      setUser({ ...user, imageUrl: response?.data.imageUrl });
      setUserFormData({ ...userFormData, imageUrl: response?.data.imageUrl });
    }
    setMessage(response?.message);
  };

  return (
    <Box sx={{ p: 3 }}>
      {message && (
        <Alert sx={{ mb: 3 }} severity="info">
          {message}
        </Alert>
      )}
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt="Profile Picture"
          src={
            user.imageUrl ? `${BASE_URL}${user.imageUrl}` : defaultProfilePhoto
          }
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <IconButton component="label">
          <EditIcon />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleProfilePicChange}
          />
        </IconButton>
      </Box>
      <Box sx={{ mt: 3 }}>
        {!isEditing ? (
          <>
            <Typography variant="h6">Name: {user.name}</Typography>
            <Typography variant="h6">Email: {user.email}</Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              startIcon={<EditIcon />}
              onClick={handleEditClick}
            >
              Edit Profile
            </Button>
          </>
        ) : (
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Name"
              variant="outlined"
              value={userFormData.name}
              onChange={(e) =>
                setUserFormData({ ...userFormData, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              variant="outlined"
              value={userFormData.email}
              onChange={(e) =>
                setUserFormData({ ...userFormData, email: e.target.value })
              }
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={userFormData.password}
              onChange={(e) =>
                setUserFormData({ ...userFormData, password: e.target.value })
              }
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={userFormData.confirmPassword}
              onChange={(e) =>
                setUserFormData({
                  ...userFormData,
                  confirmPassword: e.target.value,
                })
              }
            />
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveClick}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
