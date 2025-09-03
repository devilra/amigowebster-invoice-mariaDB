import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrUpdateSetting,
  getMySetting,
} from "../redux/Slices/settingSlice";
import { FiEdit2 } from "react-icons/fi";
import {
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { toast } from "react-toastify";
import { IoCloudUpload } from "react-icons/io5";

const Setting = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    businessName: "",
    phone: "",
    email: "",
    address: "",
    businessNumber: "",
    logo: null,
  });
  const [previewLogo, setPreviewLogo] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [isChanged, setIsChanged] = useState(false); // Track changes
  const [isSubmitting, setIsSubmitting] = useState(false); // Button loading
  const [initialLoading, setInitialLoading] = useState(true);

  const { item, loading, error } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getMySetting()).finally(() => setInitialLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (item) {
      setForm({
        businessName: item.businessName || "",
        phone: item.phone || "",
        email: item.email || "",
        address: item.address || "",
        businessNumber: item.businessNumber || "",
        logo: null,
      });
      if (item.logo) {
        setPreviewLogo(item.logo || null);
      }
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newValue = value;

    console.log(value);

    // Only allow numbers for phone and businessNumber

    if ((name === "phone" || name === "businessNumber") && value) {
      // Remove non-digit characters
      newValue = value.replace(/\D/g, "");
      if (newValue.length > 10) newValue = newValue.slice(0, 10);
    }

    if (name === "logo" && files[0]) {
      newValue = files[0];
      setPreviewLogo(URL.createObjectURL(files[0]));
    }

    setForm((prev) => {
      const updatedForm = { ...prev, [name]: newValue };

      // Detect changes correctly using updatedForm
      if (item) {
        const changed = Object.entries(updatedForm).some(([key, val]) => {
          if (key === "logo") return val instanceof File;
          return val !== item[key];
        });
        setIsChanged(changed);
      }

      return updatedForm;
    });
  };

  const handleEnableEdit = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });
    try {
      const resultAction = await dispatch(createOrUpdateSetting(formData));
      if (createOrUpdateSetting.fulfilled.match(resultAction)) {
        toast.success("Settings updated successfully!");
        if (resultAction.payload) {
          setForm((prev) => ({
            ...prev,
            businessName: resultAction.payload.businessName || "",
            phone: resultAction.payload.phone || "",
            email: resultAction.payload.email || "",
            address: resultAction.payload.address || "",
            businessNumber: resultAction.payload.businessNumber || "",
            logo: null,
          }));
          setPreviewLogo(resultAction.payload.logo || null);
        }
        // ✅ Disable all fields after submit
        setEditableFields({}); // Disable all inputs
        setIsChanged(false); // Reset change tracker
        setIsSubmitting(false);
      } else {
        toast.error(resultAction.payload || "Failed to update settings");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //console.log(isChanged, isSubmitting);

  if (initialLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
          <Skeleton width={200} />
        </h2>
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
          <Skeleton variant="circular" width={96} height={96} />
          {[...Array(5)].map((_, idx) => (
            <Skeleton key={idx} height={56} />
          ))}
          <Skeleton variant="rectangular" height={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
        Settings
      </h2>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg  rounded-xl p-6 space-y-6"
      >
        {/* Logo */}

        <div className="flex items-center gap-4">
          <div>
            {previewLogo ? (
              <img
                src={previewLogo}
                alt="Logo Preview"
                className="w-24 h-24 object-cover  rounded-full p-1 border-2 border-orange-200"
              />
            ) : (
              <p>No Logo</p>
            )}
          </div>
          {/* Upload Button */}
          <div className="flex flex-col">
            <Button
              variant="contained"
              disabled={isSubmitting}
              component="label"
              color="primary"
              sx={{
                fontSize: "12px",
              }}
            >
              <IoCloudUpload size={33} className="px-2" />
              Upload Logo
              <input
                type="file"
                name="logo"
                hidden
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
            <span className="text-gray-600 text-sm mt-1">
              Only image files allowed
            </span>
          </div>
        </div>

        {/* Text Inputs */}

        {["businessName", "phone", "email", "address", "businessNumber"].map(
          (field) => (
            <div key={field} className="flex items-center gap-2">
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="text"
                value={form[field]}
                name={field}
                label={field}
                disabled={!editableFields[field]}
                onChange={handleChange}
                className={`flex-1 p-3 border rounded-md text-gray-800 ${
                  editableFields[field] ? "bg-white" : "bg-gray-100"
                }`}
                placeholder={field}
              />
              <IconButton
                type="button"
                onClick={() => handleEnableEdit(field)}
                className="p-2 text-blue-500 hover:text-blue-700"
              >
                <FiEdit2 size={15} />
              </IconButton>
            </div>
          )
        )}
        <Button
          type="submit"
          variant="outlined"
          disabled={!isChanged || isSubmitting}
          startIcon={
            isSubmitting && <CircularProgress size={20} color="inherit" />
          }
          //className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default Setting;
