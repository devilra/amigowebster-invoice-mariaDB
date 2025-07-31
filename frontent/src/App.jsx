import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import InvoicesList from "./components/InvoicesList";
import NewBill from "./components/NewBill";
import Navbar from "./components/Navbar";
import InvoiceView from "./components/InvoiceView";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/invoices" element={<InvoicesList />} />
        <Route path="/new" element={<NewBill />} />
        <Route path="/invoice/:id" element={<InvoiceView />} />
        <Route path="/new/:invoiceId" element={<NewBill />} />
      </Routes>
    </>
  );
};

export default App;
