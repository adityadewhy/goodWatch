// src/app/ratings/page.tsx
"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import UserRatings from "@/components/userRatings";
import React from "react";

export default function Ratings() {
  return (
    <div>
      <Navbar />
      <UserRatings />
      <Footer />
    </div>
  );
}