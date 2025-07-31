import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/invoices");
      setInvoices(res.data);
    } catch (error) {
      alert("Error loading invoices");
    }
  };
  //console.log(invoices);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        await axios.delete(`http://localhost:4000/api/invoices/${id}`);
        toast.success("Invoice deleted");
        fetchInvoices();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        All Invoices
      </h2>
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="min-w-[700px] w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs sticky top-0">
            <tr>
              <th className="p-3 border">Invoice</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Paid</th>
              <th className="p-3 border">Balance</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice._id}
                className="border-b hover:bg-gray-50 transition duration-200">
                <td className="p-3 border">{invoice.invoiceNumber}</td>
                <td className="p-3 border">{invoice.customerName}</td>
                <td className="p-3 border">{invoice.phone}</td>
                <td className="p-3 border text-green-600 font-semibold">
                  ₹{invoice.totalAmount}
                </td>
                <td className="p-3 border text-blue-600 font-medium">
                  ₹{invoice.paidAmount}
                </td>
                <td className="p-3 border text-red-600 font-medium">
                  ₹{invoice.balanceAmount}
                </td>
                <td className="p-3 border">
                  {new Date(invoice.invoiceDate).toLocaleDateString()}
                </td>
                <td className="p-3 border text-center space-x-5">
                  <button
                    onClick={() => navigate(`/new/${invoice._id}`)}
                    className="text-blue-600 border px-5 py-1 hover:bg-blue-50">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(invoice._id)}
                    className="text-red-600 border px-5 py-1 hover:bg-red-50">
                    Delete
                  </button>
                  <Link
                    to={`/invoice/${invoice._id}`}
                    className="text-indigo-600 font-medium hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesList;
