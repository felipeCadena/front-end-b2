"use client";

import React, { useState } from "react";
import MyButton from "../atoms/my-button";
import MyTextInput from "../atoms/my-text-input";
import MyIcon from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";
import { cn } from "@/utils/cn";

const languages = [
    { id: "pt-br", label: "Português (Brasileiro)" },
    { id: "en", label: "Inglês" },
    { id: "es", label: "Espanhol" },
    { id: "fr", label: "Francês" },
    { id: "it", label: "Italiano" },
    { id: "gr", label: "Alemão" },
    { id: "cn", label: "Mandarim (Chinês)" },
];

export default function LanguageSelector() {
    const [selected, setSelected] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(true);

    const toggleLanguage = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((lang) => lang !== id) : [...prev, id]
        );
    };

    return (
        <div className="relative">

            <div>

            <MyTypography variant="subtitle4" weight="bold" className="mb-2">
                Idiomas falados:
            </MyTypography>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between border-t border-l border-r border-gray-300 rounded-t w-full p-4 cursor-pointer bg-gray-100"
            >

                <div className="flex items-center gap-2">

                <span className="text-gray-500">
                    <MyIcon name='world' />
                </span>
                <span className="text-sm">
                    {selected.length > 0
                        ? selected
                            .map((id) => languages.find((l) => l.id === id)?.label)
                            .join(", ").slice(0,30).concat("...")
                        : "Selecione os idiomas"}
                </span>
                </div>

                <span className="text-gray-500">
                    <MyIcon className={cn(`transform transition-transform duration-200`, isOpen ? "rotate-180" : "rotate-0")} name='chevron-down' />
                </span>

            </div>

            </div>

            {/* Collapse dropdown */}
            {isOpen && (
                <div className="z-10 w-full bg-white rounded-b shadow">

                    {languages.map((lang) => (
                        <label
                            key={lang.id}
                            className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(lang.id)}
                                onChange={() => toggleLanguage(lang.id)}
                                className="hidden"
                            />
                            <span
                                className={`w-5 h-5 mr-2 flex items-center justify-center border-2 rounded 
                                    ${selected.includes(lang.id)
                                        ? "bg-primary-600 border-primary-600 text-white"
                                        : "bg-white border-primary-600"
                                    }`}
                            >
                                {selected.includes(lang.id) && "✓"}
                            </span>
                            <span>{lang.label}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
