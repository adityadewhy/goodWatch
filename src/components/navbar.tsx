import React from "react";
import SearchTitles from "./searchTitles";
import SearchUsers from "./searchUsers";
import AvatarPopover from "./avatarPopover";
import Link from "next/link";

interface NavbarProps {
	onSearch: (term: string) => void;
}

export default function Navbar({onSearch}: NavbarProps) {
	return (
		<div className="m-2 bg-gray-900 border-b-2 py-4 flex items-center justify-around text-2xl text-white">
			
			<Link className="flex items-center" href="/">
				<img
					src="https://flowbite.com/docs/images/logo.svg"
					className="h-8"
					alt="Goodwatch Logo"
				/>
				<span className="text-2xl px-2 font-extrabold">GoodWatch</span>
			</Link>

			<div>
				<strong>Watchlist</strong>
			</div>

			<div>
				<strong>Ratings</strong>
			</div>

			<div>
				<SearchTitles onSearch={onSearch} />
			</div>

			<div>
				<SearchUsers />
			</div>

			<AvatarPopover />
		</div>
	);
}
