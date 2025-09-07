import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

function CheckAuth({ isAuthenticated, user, children, isLoading }) {
  const location = useLocation();

  console.log("CheckAuth - Location:", location.pathname);
  console.log("CheckAuth - isAuthenticated:", isAuthenticated);
  console.log("CheckAuth - user:", user);
  console.log("CheckAuth - isLoading:", isLoading);

  // Show loading skeleton while checking authentication
  if (isLoading) {
    return <Skeleton className="w-full h-screen" />;
  }

  // If not authenticated and trying to access protected routes
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/auth/login") ||
      location.pathname.includes("/auth/register") ||
      location.pathname === "/"
    )
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  // If authenticated and trying to access auth pages, redirect to admin
  if (
    isAuthenticated &&
    (
      location.pathname.includes("/auth/login") ||
      location.pathname.includes("/auth/register")
    )
  ) {
    return <Navigate to="/admin/home" replace />;
  }

  // If authenticated but trying to access admin routes without proper role
  if (
    isAuthenticated &&
    location.pathname.includes("/admin") &&
    user?.role !== "user"
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}

export default CheckAuth;
