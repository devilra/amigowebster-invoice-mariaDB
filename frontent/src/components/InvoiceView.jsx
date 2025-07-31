import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const InvoiceView = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(
          `https://mern-invoice-create.onrender.com/api/invoices/${id}`
        );
        setInvoice(res.data);
      } catch (error) {
        alert("Invoice not found");
      }
    };
    fetchInvoice();
  }, [id]);

  console.log(invoice);

  if (!invoice) {
    return (
      <div className="p-4 flex justify-center items-center h-[80vh] text-2xl">
        Loading...
      </div>
    );
  }

  const handlePrint = () => {
    const content = printRef.current;
    const pri = window.open("", "", "width=900, height=650");
    const htmlContent = content?.outerHTML || "";

    if (pri) {
      pri.document.open();
      pri.document.write(`
        <!DOCTYPE html>

        <html>
        <head>
        <title>Invoice</title>
        <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #eee;
        }
         body { font-family: sans-serif; padding: 20px; }
         table, th, td { border: 1px solid black; border-collapse: collapse; padding: 8px; }
         th { background-color: #eee; }
        </style>
        
        </head>
        <body>
            ${htmlContent}
        </body>
        </html>
        
        `);
      pri.document.close();
      pri.onload = () => {
        pri.focus();
        pri.print();
        pri.close();
      };
    }

    //console.log(pri);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* {Header} */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Invoice #{invoice.invoiceNumber}
        </h2>
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Print Invoice
        </button>
      </div>
      {/* Invoice Content */}

      <div
        ref={printRef}
        className="bg-white p-6 shadow rounded-md border overflow-x-auto">
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">
            Customer Info
          </h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>
              <strong>Name:</strong>
              {invoice.customerName}
            </p>
            <p>
              <strong>Phone:</strong> {invoice.phone}
            </p>
            <p>
              <strong>Address:</strong> {invoice.address}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(invoice.invoiceDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        {/* Products Table */}
        <h3 className="font-semibold text-lg text-gray-700 mb-2">Products</h3>
        <div className="overflow-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Rate</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.products.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">{item.title}</td>
                  <td className="p-2 border">{item.description}</td>
                  <td className="p-2 border">₹{item.rate}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">₹{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Summary */}
        <div className="text-right mt-6 space-y-1 text-gray-700 text-sm sm:text-base">
          <p>
            <strong>Total:</strong> ₹{invoice.totalAmount}
          </p>
          <p>
            <strong>Paid:</strong> ₹{invoice.paidAmount}
          </p>
          <p>
            <strong>Balance:</strong> ₹{invoice.balanceAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
