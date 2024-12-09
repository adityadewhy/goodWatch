"use client";

import Navbar from "@/components/navbar";
import MobileNavbar from "@/components/mobileNavbar";
import Footer from "@/components/footer";
import UserWatchlist from "@/components/userWatchlist";
import React from "react";

export default function Watchlist() {
	return (
		<div>
			<div className="hidden lg:block">
				<Navbar />
			</div>
			<div className="block lg:hidden">
				<MobileNavbar />
			</div>
			<UserWatchlist />
			<Footer />
		</div>
	);
}
