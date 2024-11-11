"use client";
import React, {useState} from "react";
import Link from "next/link";

export default function AvatarPopover() {
	const [isVisible, setIsVisible] = useState(false);

	function togglePopover() {
		setIsVisible(!isVisible);
	}

	return (
		<div className="relative">
			<button onClick={togglePopover}><strong>username</strong></button>
			<div
				className={`bg-gray-800 p-2 text-base shadow-sm rounded absolute ${
					isVisible ? "block" : "hidden"
				}`}
			>
				<ul className="m-2 space-y-2">
					<li>Profile</li>
					<li>Settings</li>

					<Link href = "/signup"><button className="mt-2">Sign-up</button></Link>
				</ul>
			</div>
		</div>
	);
}
