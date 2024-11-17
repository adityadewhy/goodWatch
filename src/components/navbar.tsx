import React from "react";
import SearchTitles from "./searchTitles";
import SearchUsers from "./searchUsers";
import AvatarPopover from "./avatarPopover";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
	onSearch: (term: string) => void;
}

export default function Navbar({onSearch}: NavbarProps) {
	return (
		<div className="m-2 bg-gray-900 border-b-2 py-4 flex items-center justify-around text-2xl text-white">
			<Link className="flex items-center" href="/">
				<Image
					src="/flowbiteLogo.svg"
					// layout="intrinsic" // Ensures the image preserves its original aspect ratio
					width={25} // You can specify either width or height (Next.js calculates the other)
					height={0} // Height can be omitted; Next.js will auto-calculate it
					
					alt="Goodwatch Logo"
				/>
				<span className="text-2xl px-2 font-extrabold">GoodWatch</span>
			</Link>

			<div>
				<Link href="/watchlist">
					<strong>Watchlist</strong>{" "}
				</Link>
			</div>

			<div>
				<strong>Ratings</strong>
			</div>
			
			{onSearch && (
				<div>
					<SearchTitles onSearch={onSearch} />
				</div>
			)}

			<div>
				<SearchUsers />
			</div>

			<AvatarPopover />
		</div>
	);
}
