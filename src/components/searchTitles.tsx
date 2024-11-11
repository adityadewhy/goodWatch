"use client"

import React, { useState } from "react";

interface SearchTitlesProps {
    onSearch: (term: string) => void;
}

export default function SearchTitles({ onSearch }: SearchTitlesProps) {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onSearch(inputValue);
        }
    };

    return (
        <input
            type="text"
            placeholder="Search-Titles..."
            className="placeholder-gray-900 placeholder:text-base placeholder:font-light rounded p-1 text-gray-900 text-base font-bold"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
        />
    );
}
