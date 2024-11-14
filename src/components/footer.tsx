import React from "react";
import Link from "next/link";

export default function Footer() {
	return (
		<a
			href="https://github.com/adityadewhy/goodWatch"
			target="_blank"
			className="m-2 bg-gray-900 border-t-2 py-4 pr-2 flex items-center justify-end text-2xl underline"
		>
			source code available on github
		</a>
	);
}
