"use client";

import { useState } from "react";
import MyIcon from "../atoms/my-icon";

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("PT - BR");

  const languages = [
    "PT - BR",
    "ENGLISH",
    "ESPAÑOL",
    "COREAN",
    "日本語",
    "中文",
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const selectLanguage = (language: string) => {
    setSelectedLanguage(language);
    closeMenu();
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleMenu}
        className="flex items-center font-semibold gap-1 px-2 py-1 text-[0.6rem] md:text-[0.9rem] bg-gray-200 rounded-full shadow-md hover:bg-gray-200"
      >
        {selectedLanguage}
        <MyIcon name="world"/>
      </button>

      {isOpen && (
        <ul
          className="absolute -left-2 z-10 mt-2 min-w-[150px] rounded-md bg-white shadow-lg"
          onMouseLeave={closeMenu}
        >
          {languages.map((lang) => (
            <li
              key={lang}
              onClick={() => selectLanguage(lang)}
              className="cursor-pointer p-2 text-sm hover:bg-gray-100"
            >
              {lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;
