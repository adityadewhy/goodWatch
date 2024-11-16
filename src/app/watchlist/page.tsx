"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import UserWatchlist from "@/components/userWatchlist";
import React from "react";

export default function Watchlist() {
  return (
    <div>
      <Navbar />
      <UserWatchlist />
      <Footer />
    </div>
  );
}