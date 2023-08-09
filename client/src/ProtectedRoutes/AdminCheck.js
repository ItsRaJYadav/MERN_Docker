import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contextApi/auth";
import axios from "axios";
import Spinner from "./Spinner";
import AccessDeniedPage from "./AccessDenied";

export default function AdminCheck() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/admin-auth");
        setOk(res.data.ok);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setOk(false);
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;
  if (!ok) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return <AccessDeniedPage />;

  }

  return <Outlet />;
}
