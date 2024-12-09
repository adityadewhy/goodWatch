"use client";

import Navbar from "@/components/navbar";
import MobileNavbar from "@/components/mobileNavbar";
import Footer from "@/components/footer";
import ParentSearchTitles from "@/components/parentsearchtitles";
import React, {useState} from "react";

export default function Home() {
	const [searchTerm, setSearchTerm] = useState("");
	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};
	return (
		<div>
			<div className="hidden lg:block">
				<Navbar onSearch={handleSearch} />
			</div>
			<div className="block lg:hidden">
				<MobileNavbar onSearch={handleSearch} />
			</div>
			<ParentSearchTitles searchTerm={searchTerm} />
			<Footer />
		</div>
	);
}
