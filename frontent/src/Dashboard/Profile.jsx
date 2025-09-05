import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import {
  changePassword,
  clearMessage,
  getMe,
  updateProfile,
} from "../redux/Slices/authSlice";
import { useState } from "react";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Profile = () => {
  const dispatch = useDispatch();
  const { loading, user, success, error, actionLoading } = useSelector(
    (state) => state.auth
  );
  const [form, setForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [originalForm, setOriginalForm] = useState({ name: "", email: "" }); // store original values

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...showPassword, [field]: !prev[field] }));
  };

  useEffect(() => {
    if (!user) {
      dispatch(getMe()); // first time load la user details fetch pannum
    } else {
      setForm({ name: user.name || "", email: user.email || "" });
      setOriginalForm({ name: user.name || "", email: user.email || "" });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearMessage());
      setIsEditing({ name: false, email: false });
      setOriginalForm(form); // after saving, update original values
    }

    if (error) {
      toast.error(error);
      dispatch(clearMessage());
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleProfileChange = (e) => {
    e.preventDefault();
    dispatch(updateProfile(form));
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    dispatch(changePassword(passwordForm));
    setPasswordForm({ currentPassword: "", newPassword: "" });
  };

  const isChanged =
    form.name !== originalForm.name || form.email !== originalForm.email;

  //console.log(user);
  return (
    <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {loading && <p>Loading...</p>}
      <form onSubmit={handleProfileChange} className="space-y-4">
        <div className="flex items-center gap-2">
          <TextField
            type="text"
            name="name"
            value={form.name}
            id="name"
            label="Name"
            variant="outlined"
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            disabled={!isEditing.name}
          />
          <IconButton
            onClick={() =>
              setIsEditing({ ...isEditing, name: !isEditing.name })
            }
          >
            <EditIcon />
          </IconButton>
        </div>
        <div className="flex items-center gap-2">
          <TextField
            type="email"
            name="email"
            value={form.email}
            id="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            disabled={!isEditing.email}
          />
          <IconButton
            onClick={() =>
              setIsEditing({ ...isEditing, email: !isEditing.email })
            }
          >
            <EditIcon />
          </IconButton>
        </div>
        <Button
          disabled={loading || !isChanged}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
          variant="outlined"
          type="submit"
        >
          {loading ? "Saving..." : "Save Profile"}
        </Button>
      </form>
      <div className="mt-6">
        <Button
          onClick={() => setShowPasswordFields(!showPasswordFields)}
          variant="contained"
        >
          Change Password
        </Button>

        {showPasswordFields && (
          <form onSubmit={handlePasswordSave} className="mt-4 space-y-4">
            <div className="relative">
              <TextField
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                id="current-password"
                value={passwordForm.currentPassword}
                variant="outlined"
                onChange={handlePasswordChange}
                required
                label="Current Password"
                className="w-full border rounded-md p-2"
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
              />
              {passwordForm.currentPassword && (
                <button
                  onClick={() => togglePassword("current")}
                  type="button"
                  className="absolute top-3 right-3 "
                >
                  {showPassword.current ? <Visibility /> : <VisibilityOff />}
                </button>
              )}
            </div>
            <div className="relative">
              <TextField
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                variant="outlined"
                id="new-password"
                onChange={handlePasswordChange}
                value={passwordForm.newPassword}
                required
                label="New Password"
                className="w-full border rounded-md p-2"
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
              />
              {passwordForm.newPassword && (
                <button
                  onClick={() => togglePassword("new")}
                  type="button"
                  className="absolute top-3 right-3 "
                >
                  {showPassword.new ? <Visibility /> : <VisibilityOff />}
                </button>
              )}
            </div>
            <Button
              disabled={
                loading ||
                !passwordForm.currentPassword.trim() ||
                !passwordForm.newPassword.trim()
              }
              startIcon={
                loading && <CircularProgress size={20} color="inherit" />
              }
              type="submit"
              variant="contained"
              color="secondary"
            >
              {loading ? "Saving..." : "Save Password"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
