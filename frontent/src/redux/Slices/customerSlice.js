import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api";

export const fetchCustomers = createAsyncThunk(
  "customers/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await API.get("/api/customers");
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching customers"
      );
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (customerId, thunkAPI) => {
    try {
      const { data } = await API.delete(`/api/customers/${customerId}`);
      return { customerId, message: data.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error deleting customer"
      );
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (c) => c.customerName !== action.payload.customerId
        );
      });
  },
});

export default customerSlice.reducer;
