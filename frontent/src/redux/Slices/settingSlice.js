import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

export const createOrUpdateSetting = createAsyncThunk(
  "settings/createOrUpdate",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/api/settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data.setting);
      return res.data.setting;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to save setting"
      );
    }
  }
);

export const getMySetting = createAsyncThunk(
  "settings/getMySetting",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/api/settings");
      console.log(res.data.setting);
      return res.data.setting;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch setting"
      );
    }
  }
);

const settingSlice = createSlice({
  name: "settings",
  initialState: {
    item: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrUpdateSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrUpdateSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;

        state.error = null;
      })
      .addCase(createOrUpdateSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get my setting
      .addCase(getMySetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMySetting.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(getMySetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.item = null;
      });
  },
});

//console.log(settingSlice);

export default settingSlice.reducer;
