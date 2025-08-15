"use client";

import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import AvatarPopover from "./avatarPopover";
import SearchTitles from "./searchTitles";
import SearchUsers from "./searchUsers";
import {FiMenu, FiX} from "react-icons/fi"; // Import icons for hamburger and close

interface NavbarProps {
	onSearch?: (term: string) => void;
}

export default function MobileNavbar({onSearch}: NavbarProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div>
			{/* Navbar */}
			<div className="m-2 bg-gray-900 border-b-2 py-4 flex items-center justify-between text-2xl text-white">
				{/* Hamburger Icon */}
				<button
					className="text-white pl-4"
					onClick={toggleSidebar}
					aria-label="Toggle Sidebar"
				>
					{isSidebarOpen ? <FiX size={28} /> : <FiMenu size={28} />}
				</button>

				{/* Logo */}
				<div className="flex items-center justify-center flex-1">
					<Link className="flex items-center" href="/">
						<Image
							src="/flowbiteLogo.svg"
							width={25}
							height={0}
							alt="Goodwatch Logo"
						/>
					</Link>
				</div>

				<div className="pr-4">
					<AvatarPopover />
				</div>
			</div>

			{/* Sidebar */}
			<div
				className={`fixed top-0 left-0 h-full bg-gray-800 z-50 transform ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-300 ease-in-out`}
				style={{width: "250px"}}
			>
				<div className="p-4 text-white">
					{/* Close Button */}
					<button
						className="text-white mb-4"
						onClick={toggleSidebar}
						aria-label="Close Sidebar"
					>
						<FiX size={28} />
					</button>

					{/* Links */}
					<ul className="space-y-4 text-lg">
						<li>
							<Link href="/watchlist" onClick={toggleSidebar}>
								<strong>Watchlist</strong>
							</Link>
						</li>
						<li>
							<Link href="/ratings" onClick={toggleSidebar}>
								<strong>Ratings</strong>
							</Link>
						</li>
						<li>
							{onSearch && (
								<div>
									<SearchTitles onSearch={onSearch} />
								</div>
							)}
						</li>
						<li>
							<SearchUsers />
						</li>
					</ul>
				</div>
			</div>

			{/* Overlay */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black opacity-50 z-40"
					onClick={toggleSidebar}
				></div>
			)}
		</div>
	);
}
