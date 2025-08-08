// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, Zoom, toast } from "react-toastify";
// import { ImCross } from "react-icons/im";
// import { useNavigate, useParams } from "react-router-dom";
// import API from "../api";

// const NewBill = () => {
//   const navigate = useNavigate();
//   const [invoice, setInvoice] = useState({
//     customerName: "",
//     phone: "",
//     address: "",
//     invoiceDate: "",
//     image: null,
//     products: [
//       {
//         title: "",
//         description: "",
//         rate: 0,
//         quantity: 0,
//         amount: 0,
//       },
//     ],
//     totalAmount: 0,
//     paidAmount: 0,
//     balanceAmount: 0,
//   });

//   console.log(invoice);

//   const { invoiceId } = useParams();

//   useEffect(() => {
//     if (invoiceId) {
//       //console.log(invoiceId);
//       API.get(`/api/invoices/${invoiceId}`)
//         .then((res) =>
//           setInvoice((prev) => ({
//             ...prev,
//             ...res.data,
//             products: res.data.products?.length
//               ? res.data.products
//               : prev.products,
//             paidAmount: res.data.paidAmount ?? 0,
//             balanceAmount: res.data.balanceAmount ?? 0,
//           }))
//         )
//         .catch(() => toast.error("Failed to load invoice"));
//     }
//   }, []);

//   //console.log(invoice);

//   const removeProductRow = (index) => {
//     const updatedProducts = invoice.products.filter((_, i) => i !== index);
//     const total = updatedProducts.reduce((acc, item) => acc + item.amount, 0);

//     setInvoice((prev) => ({
//       ...prev,
//       products:
//         updatedProducts.length > 0
//           ? updatedProducts
//           : [
//               {
//                 title: "",
//                 description: "",
//                 rate: 0,
//                 quantity: 0,
//                 amount: 0,
//               },
//             ],
//       totalAmount: total,
//       balanceAmount: total - parseFloat(prev.paidAmount || 0),
//     }));
//   };

//   const addProductRow = () => {
//     setInvoice((prev) => ({
//       ...prev,
//       products: [
//         ...prev.products,
//         { title: "", description: "", rate: 0, quantity: 0, amount: 0 },
//       ],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (invoiceId) {
//         const res = await API.put(`/api/invoices/${invoiceId}`, invoice);
//         if (res.status === 200) {
//           toast.success("Invoice Updated Successfully");
//           setTimeout(() => {
//             navigate("/invoices");
//           }, 1000);
//         }
//       } else {
//         const res = await API.post("/api/invoices", invoice);
//         if (res.status === 201) {
//           toast.success("Invoice Created Successfully");
//         }
//         setTimeout(() => {
//           navigate("/invoices");
//         }, 1000);
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   const handleProductChange = (index, field, value) => {
//     const updatedProducts = [...invoice.products];
//     console.log(updatedProducts);
//     updatedProducts[index][field] =
//       field === "rate" || field === "quantity" ? parseFloat(value || 0) : value;

//     if (field === "rate" || field === "quantity") {
//       const rate = parseFloat(updatedProducts[index].rate || 0);
//       const qty = parseFloat(updatedProducts[index].quantity || 0);
//       updatedProducts[index].amount = rate * qty;
//     }

//     const total = updatedProducts.reduce((acc, item) => acc + item.amount, 0);

//     setInvoice((prev) => ({
//       ...prev,
//       products: updatedProducts,
//       totalAmount: total,
//       balanceAmount: total - parseFloat(prev.paidAmount || 0),
//     }));

//     //console.log(updatedProducts);
//   };

//   return (
//     <div className="p-4 sm:p-6 max-w-5xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center">Create Invoice</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//           <input
//             type="date"
//             className="border p-2 rounded w-full"
//             value={invoice.invoiceDate}
//             onChange={(e) =>
//               setInvoice({ ...invoice, invoiceDate: e.target.value })
//             }
//             required
//           />
//           <input
//             type="text"
//             placeholder="Customer Name"
//             className="border p-2 rounded w-full"
//             value={invoice.customerName}
//             onChange={(e) =>
//               setInvoice({ ...invoice, customerName: e.target.value })
//             }
//             required
//           />
//           <input
//             type="text"
//             placeholder="Phone Number"
//             className="border p-2 rounded w-full"
//             value={invoice.phone}
//             onChange={(e) => setInvoice({ ...invoice, phone: e.target.value })}
//             required
//           />
//           <textarea
//             placeholder="Address"
//             className="border w-full p-2 col-span-2 rounded"
//             value={invoice.address}
//             onChange={(e) =>
//               setInvoice({ ...invoice, address: e.target.value })
//             }
//             rows={2}
//           />

//           <div className="overflow-x-auto w-full col-span-2 ">
//             <h1 className="font-bold text-2xl underline">Products</h1>
//             <table className="w-full text-sm border">
//               <thead className="bg-gray-100 text-left">
//                 <tr>
//                   {/* <th className="p-2">Product Image</th> */}
//                   <th className="p-2">Title</th>
//                   <th className="p-2">Description</th>
//                   <th className="p-2">Rate</th>
//                   <th className="p-2">Qty</th>
//                   <th className="p-2">Amount</th>
//                   <th className="p-2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {invoice.products.map((item, index) => (
//                   <tr key={index} className="border-t">
//                     {/* <td>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={async (e) => {
//                           const file = e.target.files[0];
//                           if (!file) return;

//                           const formData = new FormData();
//                           formData.append("image", file);

//                           try {
//                             const res = await API.post(
//                               "/api/upload",
//                               formData,
//                               {
//                                 headers: {
//                                   "Content-Type": "multipart/form-data",
//                                 },
//                               }
//                             );
//                             handleProductChange(index, "image", res.data.url);
//                           } catch {
//                             toast.error("Image upload failed");
//                           }
//                         }}
//                       />
//                       {item.image && (
//                         <img
//                           src={item.image}
//                           alt="product"
//                           className="w-10 h-10 object-cover rounded border mx-auto"
//                         />
//                       )}
//                     </td> */}
//                     <td>
//                       <input
//                         value={item.title}
//                         required
//                         onChange={(e) =>
//                           handleProductChange(index, "title", e.target.value)
//                         }
//                         className="p-1 border w-full"
//                       />
//                     </td>
//                     <td>
//                       <input
//                         value={item.description}
//                         onChange={(e) =>
//                           handleProductChange(
//                             index,
//                             "description",
//                             e.target.value
//                           )
//                         }
//                         required
//                         className="p-1 border w-full"
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         value={item.rate}
//                         required
//                         onChange={(e) =>
//                           handleProductChange(index, "rate", e.target.value)
//                         }
//                         className="p-1 border w-full"
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         value={item.quantity}
//                         required
//                         onChange={(e) =>
//                           handleProductChange(index, "quantity", e.target.value)
//                         }
//                         className="p-1 border w-full"
//                       />
//                     </td>
//                     <td className="text-center border">{item.amount}</td>
//                     <td className="text-center">
//                       <button
//                         onClick={() => removeProductRow(index)}
//                         type="button">
//                         <ImCross className="text-red-600 hover:text-red-400" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <button
//               type="button"
//               onClick={addProductRow}
//               className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
//               + Add Product
//             </button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <input
//               type="number"
//               placeholder="Total"
//               className="border p-2 rounded w-full"
//               value={invoice.totalAmount}
//               readOnly
//             />
//             <input
//               type="number"
//               placeholder="Paid"
//               className="border p-2 rounded w-full"
//               value={invoice.paidAmount}
//               onChange={(e) => {
//                 const paid = parseFloat(e.target.value) || 0;
//                 setInvoice((prev) => ({
//                   ...prev,
//                   paidAmount: paid,
//                   balanceAmount: prev.totalAmount - paid,
//                 }));
//               }}
//             />
//             <input
//               type="number"
//               placeholder="Balance"
//               className="border p-2 rounded w-full"
//               value={invoice.balanceAmount}
//               readOnly
//             />
//           </div>
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
//               {invoiceId ? "Update Invoice" : "Save Invoice"}
//             </button>
//           </div>
//         </div>
//       </form>
//       <ToastContainer
//         position="top-right"
//         autoClose={1000}
//         limit={1}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Zoom}
//       />
//     </div>
//   );
// };

// export default NewBill;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

const NewBill = () => {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({
    customerName: "",
    phone: "",
    address: "",
    invoiceDate: "",
    image: null,
    products: [
      {
        title: "",
        description: "",
        rate: 0,
        quantity: 0,
        amount: 0,
        image: null, // ensure product has image field
        _uploading: false, // local flag per product (not saved to server)
      },
    ],
    totalAmount: 0,
    paidAmount: 0,
    balanceAmount: 0,
  });

  const { invoiceId } = useParams();

  useEffect(() => {
    if (invoiceId) {
      API.get(`/api/invoices/${invoiceId}`)
        .then((res) =>
          setInvoice((prev) => ({
            ...prev,
            ...res.data,
            products: res.data.products?.length
              ? res.data.products
              : prev.products,
            paidAmount: res.data.paidAmount ?? 0,
            balanceAmount: res.data.balanceAmount ?? 0,
          }))
        )
        .catch(() => toast.error("Failed to load invoice"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeProductRow = (index) => {
    const updatedProducts = invoice.products.filter((_, i) => i !== index);
    const total = updatedProducts.reduce(
      (acc, item) => acc + (item.amount || 0),
      0
    );

    setInvoice((prev) => ({
      ...prev,
      products:
        updatedProducts.length > 0
          ? updatedProducts
          : [
              {
                title: "",
                description: "",
                rate: 0,
                quantity: 0,
                amount: 0,
                image: null,
                _uploading: false,
              },
            ],
      totalAmount: total,
      balanceAmount: total - parseFloat(prev.paidAmount || 0),
    }));
  };

  const addProductRow = () => {
    setInvoice((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          title: "",
          description: "",
          rate: 0,
          quantity: 0,
          amount: 0,
          image: null,
          _uploading: false,
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Remove local-only flags before sending
      const payload = {
        ...invoice,
        products: invoice.products.map(({ _uploading, ...rest }) => rest),
      };

      if (invoiceId) {
        const res = await API.put(`/api/invoices/${invoiceId}`, payload);
        if (res.status === 200) {
          toast.success("Invoice Updated Successfully");
          setTimeout(() => navigate("/invoices"), 1000);
        }
      } else {
        const res = await API.post("/api/invoices", payload);
        if (res.status === 201) {
          toast.success("Invoice Created Successfully");
        }
        setTimeout(() => navigate("/invoices"), 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...invoice.products];
    updatedProducts[index][field] =
      field === "rate" || field === "quantity" ? parseFloat(value || 0) : value;

    if (field === "rate" || field === "quantity") {
      const rate = parseFloat(updatedProducts[index].rate || 0);
      const qty = parseFloat(updatedProducts[index].quantity || 0);
      updatedProducts[index].amount = rate * qty;
    }

    const total = updatedProducts.reduce(
      (acc, item) => acc + (item.amount || 0),
      0
    );

    setInvoice((prev) => ({
      ...prev,
      products: updatedProducts,
      totalAmount: total,
      balanceAmount: total - parseFloat(prev.paidAmount || 0),
    }));
  };

  // ----- NEW: upload handler per product row -----
  const handleImageSelect = async (index, file) => {
    if (!file) return;

    // Show instant preview using object URL
    const previewUrl = URL.createObjectURL(file);
    handleProductChange(index, "image", previewUrl);

    // set uploading flag
    setInvoice((prev) => {
      const p = [...prev.products];
      p[index] = { ...p[index], _uploading: true };
      return { ...prev, products: p };
    });

    const formData = new FormData();
    formData.append("image", file);

    try {
      // POST to your upload endpoint (make sure backend returns { url: "<cloudinary-url>" })
      const res = await API.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        // withCredentials: true // if your upload needs cookies
      });

      // Support different possible response keys
      const uploadedUrl =
        (res.data && (res.data.url || res.data.path || res.data.secure_url)) ||
        null;

      if (!uploadedUrl) throw new Error("Upload response missing URL");

      // replace preview with uploaded url
      handleProductChange(index, "image", uploadedUrl);
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Image upload failed");
      // revert image preview (optional) - here we clear it
      handleProductChange(index, "image", null);
    } finally {
      // clear uploading flag
      setInvoice((prev) => {
        const p = [...prev.products];
        p[index] = { ...p[index], _uploading: false };
        return { ...prev, products: p };
      });
      // revoke preview url if it's a blob URL to avoid memory leak
      if (previewUrl && previewUrl.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch {}
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={invoice.invoiceDate}
            onChange={(e) =>
              setInvoice({ ...invoice, invoiceDate: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Customer Name"
            className="border p-2 rounded w-full"
            value={invoice.customerName}
            onChange={(e) =>
              setInvoice({ ...invoice, customerName: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="border p-2 rounded w-full"
            value={invoice.phone}
            onChange={(e) => setInvoice({ ...invoice, phone: e.target.value })}
            required
          />
          <textarea
            placeholder="Address"
            className="border w-full p-2 col-span-2 rounded"
            value={invoice.address}
            onChange={(e) =>
              setInvoice({ ...invoice, address: e.target.value })
            }
            rows={2}
          />

          <div className="overflow-x-auto w-full col-span-2 ">
            <h1 className="font-bold text-2xl underline">Products</h1>
            <table className="w-full text-sm border">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2">Image</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Rate</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoice.products.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">
                      <div className="flex items-center">
                        <input
                          type="file"
                          accept="image/*"
                          id={`fileInput-${index}`}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageSelect(index, file);
                          }}
                          className="text-xs hidden border"
                        />
                        <label
                          className="cursor-pointer text-[12px]"
                          htmlFor={`fileInput-${index}`}>
                          choose file
                        </label>

                        <div className="mt-2">
                          {item._uploading ? (
                            <span className="text-xs text-gray-500">
                              Uploading...
                            </span>
                          ) : item.image ? (
                            <img
                              src={item.image}
                              alt="product"
                              className="w-10 h-10 object-cover rounded border"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-400">
                              No
                              <br />
                              Img
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td>
                      <input
                        value={item.title}
                        required
                        onChange={(e) =>
                          handleProductChange(index, "title", e.target.value)
                        }
                        className="p-1 border w-full"
                      />
                    </td>
                    <td>
                      <input
                        value={item.description}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        required
                        className="p-1 border w-full"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.rate}
                        required
                        onChange={(e) =>
                          handleProductChange(index, "rate", e.target.value)
                        }
                        className="p-1 border w-full"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        required
                        onChange={(e) =>
                          handleProductChange(index, "quantity", e.target.value)
                        }
                        className="p-1 border w-full"
                      />
                    </td>
                    <td className="text-center border">{item.amount}</td>
                    <td className="text-center">
                      <button
                        onClick={() => removeProductRow(index)}
                        type="button">
                        <ImCross className="text-red-600 hover:text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="button"
              onClick={addProductRow}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              + Add Product
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Total"
              className="border p-2 rounded w-full"
              value={invoice.totalAmount}
              readOnly
            />
            <input
              type="number"
              placeholder="Paid"
              className="border p-2 rounded w-full"
              value={invoice.paidAmount}
              onChange={(e) => {
                const paid = parseFloat(e.target.value) || 0;
                setInvoice((prev) => ({
                  ...prev,
                  paidAmount: paid,
                  balanceAmount: prev.totalAmount - paid,
                }));
              }}
            />
            <input
              type="number"
              placeholder="Balance"
              className="border p-2 rounded w-full"
              value={invoice.balanceAmount}
              readOnly
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
              {invoiceId ? "Update Invoice" : "Save Invoice"}
            </button>
          </div>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </div>
  );
};

export default NewBill;
