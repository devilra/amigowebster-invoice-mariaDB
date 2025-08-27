import React, { useEffect, useState } from "react";
import {
  FaFileInvoiceDollar,
  FaUsers,
  FaShoppingCart,
  FaChartLine,
} from "react-icons/fa";
import API from "../api";
import Spinner3 from "../components/Spinner";

const Dashboard = () => {
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [storage, setStorage] = useState({});
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          invoiceRes,
          customerRes,
          amountRes,
          totalPaidAmount,
          balanceAmount,
          storageRes
        ] = await Promise.all([
          API.get("/api/invoices"),
          API.get("/api/invoices/total-customers"),
          API.get("/api/analytics/total-amount"),
          API.get("/api/analytics/total-paid-amount"),
          API.get("/api/analytics/total-balance"),
          API.get('/api/storage-info')
        ]);
        //console.log(invoiceRes.data.length, totalCustomers);
        setLoading(false);
        setInvoiceCount(
          Array.isArray(invoiceRes.data) ? invoiceRes.data.length : 0
        );
        setTotalCustomers(customerRes.data?.totalCustomers || 0);
        setTotalAmount(amountRes.data?.totalAmount || 0);
        setTotalPaidAmount(totalPaidAmount.data?.totalPaid || 0);
        setBalanceAmount(balanceAmount.data?.totalBalanceAmount || 0);
        
        setStorage(storageRes.data)
        const usedPercent = 100 - parseFloat(storageRes.freePercent)
        let start = 0
        const step = () => {
          start += 1;
          if (start <= usedPercent) {
            setProgress(start);
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);

        setLoading(false);

      } catch (error) {
        console.error(error);
      }

      

      // const data = await getInvoices();
      // const customers = await getAllCustomers();

      // console.log(data.length, customers);

      // setTotalCustomers(customers);

      // if (Array.isArray(data)) {
      //   setInvoiceCount(data.length);
      // } else {
      //   setInvoiceCount(0);
      // }
    };
    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Invoices",
      value: invoiceCount,
      icon: <FaFileInvoiceDollar size={20} />,
      color: "bg-blue-500",
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: <FaUsers size={20} />,
      color: "bg-green-500",
    },
    {
      title: "Total Revenue",
      value: totalAmount,
      icon: <FaShoppingCart size={20} />,
      color: "bg-yellow-500",
      isCurrency: true,
    },
    {
      title: "Total Paid",
      value: totalPaidAmount,
      icon: <FaChartLine size={60} className="px-5" />,
      color: "bg-purple-500 text-[15px]",
      isCurrency: true,
    },
    {
      title: "Balance Amount",
      value: balanceAmount,
      icon: <FaChartLine size={60} className="px-5" />,
      color: "bg-orange-500 text-[15px]",
      isCurrency: true,
    },
  ];

  if (loading) return <div className="flex justify-center items-center  text-center mt-20"><Spinner3/></div>;

  return (
    <div className="p-5 mt-10 ">
           <div className="max-w-4xl  p-6 mb-5 bg-gradient-to-r from-indigo-50 to-blue-100 rounded-3xl shadow-xl">
  <h2 className="text-2xl font-bold text-black text-center mb-6 flex items-center justify-center gap-2">
    MongoDB Storage Info
  </h2>

  {/* Info Grid */}
  <div className="grid grid-cols-3 gap-4 text-center text-gray-700 mb-6">
    <div className="bg-white p-3 rounded-xl shadow-sm">
      <p className="text-sm font-semibold text-gray-500">Total</p>
      <p className="text-lg font-bold text-indigo-600">{storage.storageSize}</p>
    </div>
    <div className="bg-white p-3 rounded-xl shadow-sm">
      <p className="text-sm font-semibold text-gray-500">Used</p>
      <p className="text-lg font-bold text-yellow-600">{storage.dataSize}</p>
    </div>
    <div className="bg-white p-3 rounded-xl shadow-sm">
      <p className="text-sm font-semibold text-gray-500">Free</p>
      <p className="text-lg font-bold text-green-600">{storage.freeSpace}</p>
    </div>
  </div>

  {/* Progress Bar */}
  <div className="w-full bg-gray-300 rounded-full  h-4 relative overflow-hidden shadow-inner">
    <div
      className={`
        h-full transition-all py-2 duration-700 ease-in-out flex justify-center items-center   text-white text-sm font-bold
        ${progress <= 50 ? "bg-green-500" : progress <= 80 ? "bg-yellow-500" : "bg-red-500"}
      `}
      style={{ width: `${progress}%` }}
    >
      <p className="">{progress.toFixed(1)}%</p>
    </div>
  </div>

  <p className="text-center text-gray-800 mt-4 font-medium">
    Free Space: <span className="font-bold">{storage.freePercent}</span>
  </p>
</div>
      <h1 className="text-2xl font-bold text-black mb-5">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`text-white  p-5 md:py-12 rounded-xl shadow-lg flex flex-col md:flex md:justify-between md:flex-col items-center justify-center ${stat.color}`}>
            <h2 className="text-lg font-semibold">{stat.title}</h2>
            <p className=" font-extrabold text-xl py-2">
              {" "}
              {stat.isCurrency
                ? `₹${stat.value.toLocaleString("en-IN")}`
                : stat.value.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
      {/* Storage Bar Section */}


    </div>
  );
};

export default Dashboard;
