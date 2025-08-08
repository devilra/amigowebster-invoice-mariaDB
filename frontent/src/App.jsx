import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import InvoicesList from "./components/InvoicesList";
import NewBill from "./components/NewBill";
import Navbar from "./components/Navbar";
import InvoiceView from "./components/InvoiceView";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./redux/Slices/authSlice";

const App = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const validNavbar = ["/login"];
  const location = useLocation();

  // if (loading) {
  //   return <p>Loading....</p>;
  // }

  return (
    <>
      {!validNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/invoices"
          element={
            <ProtectedRoutes>
              <InvoicesList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoutes>
              <NewBill />
            </ProtectedRoutes>
          }
        />
        <Route path="/invoice/:id" element={<InvoiceView />} />
        <Route path="/new/:invoiceId" element={<NewBill />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
