// src/app/ratings/page.tsx
"use client";

import Navbar from "@/components/navbar";
import MobileNavbar from "@/components/mobileNavbar";
import Footer from "@/components/footer";
import UserRatings from "@/components/userRatings";
import React from "react";

export default function Ratings() {
	return (
		<div>
			<div className="hidden lg:block">
				<Navbar />
			</div>
			<div className="block lg:hidden">
				<MobileNavbar />
			</div>
			<UserRatings />
			<Footer />
		</div>
	);
}
