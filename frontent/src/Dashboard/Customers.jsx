import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FiFilter } from "react-icons/fi";
import { MdOutlineSearch } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, fetchCustomers } from "../redux/Slices/customerSlice";
import CustomerTableSkeleton from "./CustomerTableSkeleton";

const Customers = () => {
  const dispatch = useDispatch();
  const { list, error, loading } = useSelector((state) => state.customers);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  const handleOpenDialog = (customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCustomer(null);
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedCustomer) {
      dispatch(deleteCustomer(selectedCustomer.customerName));
      dispatch(fetchCustomers());
    }
    handleCloseDialog();
  };

  const filteredList = list.filter((c) =>
    c.customerName?.toLowerCase().includes(search)
  );

  return (
    <div className="p-5">
      {/* Top Filter & Search */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="outlined" startIcon={<FiFilter />}>
          Filter
        </Button>
        <div className="flex items-center gap-2">
          <MdOutlineSearch className="text-gray-500" />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search customer..."
            //value={search}
            // onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* /Error */}

      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      {!loading && filteredList.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>Customer</TableCell>

                <TableCell>Address</TableCell>
                <TableCell>Orders</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <CustomerTableSkeleton rows={6} />
            ) : (
              <TableBody>
                {filteredList.map((customer, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://i.pravatar.cc/150?img=${index + 1}`}
                          alt={customer.customerName}
                          className="w-8 h-8 rounded-full"
                        />
                        {customer.customerName}
                      </div>
                    </TableCell>
                    <TableCell>{customer.customerAddress}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>
                      ₹{customer.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      ₹{customer.balanceAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => handleOpenDialog(customer)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    {/* <IconButton>
                    <IoIosArrowDown />
                  </IconButton> */}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}

      {!loading && filteredList.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <p>No customers found.</p>
        </div>
      )}

      {/* Confirmation Dialog */}

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Delete Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{selectedCustomer?.customerName}</strong> and all their
            invoices? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Customers;
