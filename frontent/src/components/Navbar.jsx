import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/Slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="bg-neutral-900 p-8">
      <div className="flex justify-between items-center space-x-5">
        <div>
          <Link
            to="/"
            className="text-slate-50 text-[14px] border font-bold rounded border-neutral-100 px-5 py-3">
            Home
          </Link>
        </div>
        <div>
          <Link
            to="/invoices"
            className="text-neutral-50 text-[14px] border font-bold border-neutral-100 px-5 py-3 mx-2">
            Invoices lIst
          </Link>
          <Link
            to="/new"
            className="text-neutral-50 text-[14px] border font-bold border-neutral-100 px-5 py-3 mx-2">
            New Invoice
          </Link>
          <button
            onClick={() => dispatch(logoutUser())}
            className="text-neutral-50 text-[14px] border font-bold border-neutral-100 px-5 py-3 mx-2">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
