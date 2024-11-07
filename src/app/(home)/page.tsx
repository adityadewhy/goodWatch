"use client"

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ParentSearchTitles from "@/components/parentsearchtitles";
import React,{useState} from "react";

export default function Home() {

	const [searchTerm,setSearchTerm] = useState("")
	const handleSearch = (term:string) =>{
		setSearchTerm(term)
	}
	return (
		<div>
			<Navbar onSearch={handleSearch}/>
			<ParentSearchTitles searchTerm={searchTerm}/>
			<Footer />
		</div>
	);
}
