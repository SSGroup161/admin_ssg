"use client";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function SkillInput({ skills, setSkills }) {
    const [input, setInput] = useState("");
    const [showSuggestion, setShowSuggestion] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        setShowSuggestion(!!value.trim());
    };

    const addSkill = (value) => {
        const skill = value.trim();

        // Validasi
        if (!skill) {
            toast.error("Skill tidak boleh kosong.");
            return;
        }

        if (skills.includes(skill)) {
            toast.warning("Skill sudah ditambahkan.");
            return;
        }

        if (/[^a-zA-Z0-9\s\.\-]/.test(skill)) {
            toast.error("Skill mengandung karakter tidak valid.");
            return;
        }

        setSkills([...skills, skill]);
        setInput("");
        setShowSuggestion(false);
        toast.success(`Skill "${skill}" ditambahkan.`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill(input);
        }
    };

    const removeSkill = (skill) => {
        setSkills(skills.filter((s) => s !== skill));
        toast.success(`Skill "${skill}" dihapus.`);
    };

    return (
        <div className="w-full flex flex-wrap relative">
            <Toaster richColors />

            <input
                type="text"
                placeholder="Type skill and press Enter..."
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="min-w-1/3 h-8 px-3 border rounded-md focus:outline-none focus:border-blue-400 border-gray-300 text-sm py-1 mr-4"
            />

            {showSuggestion && (
                <ul className="absolute left-0 -bottom-12 right-0 mt-1 bg-white border border-gray-400 rounded-md shadow-md z-10 w-1/3">
                    <li
                        onClick={() => addSkill(input)}
                        className="px-3 py-2 hover:bg-primary hover:text-white cursor-pointer"
                    >
                        Add: <strong>{input}</strong>
                    </li>
                </ul>
            )}
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                    <span
                        key={idx}
                        className="bg-primary text-white px-3 py-1 rounded-full flex items-center gap-1"
                    >
                        {skill}
                        <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-white hover:text-red-600 cursor-pointer"
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}
