"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/Sidebar";
import {
    IconLayoutDashboard,
    IconFilePlus,
    IconBriefcase,
    IconUsers,
    IconLogout,
} from "@tabler/icons-react";
import { cn } from "../lib/utils";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "sonner";

export default function SidebarLayout({ children }) {
    const links = [
        {
            label: "Dashboard",
            href: "/",
            icon: <IconLayoutDashboard className="h-5 w-5 shrink-0" />,
        },
        {
            label: "Add Vacancy",
            href: "/add-vacancy",
            icon: <IconFilePlus className="h-5 w-5 shrink-0" />,
        },
        {
            label: "Vacancy",
            href: "/vacancy",
            icon: <IconBriefcase className="h-5 w-5 shrink-0" />,
        },
        {
            label: "Candidates",
            href: "/candidates",
            icon: <IconUsers className="h-5 w-5 shrink-0" />,
        },
        {
            label: "Logout",
            href: "#",
            icon: <IconLogout className="h-5 w-5 shrink-0" />,
            action: "logout",
        },
    ];

    const [open, setOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState({ name: "" });

    useEffect(() => {
        const storedUser = localStorage.getItem("ssg_user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser({ name: parsed.name || "" });
        }
    }, []);

    const getInitials = (name = "") => {
        const words = name.trim().split(" ");
        if (words.length === 1) return words[0][0];
        return words[0][0] + words[1][0];
    };

    const handleLogout = async () => {
        setLoading(true);

        try {
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
            const session_id = localStorage.getItem("ssg_session_id");

            if (session_id) {
                await axios.put(`${BASE_URL}/api/v1/auth/logout-session`, {
                    session_id,
                });

                localStorage.removeItem("ssg_session_id");
            }

            await signOut({ redirect: false });
            router.push("/auth/login");
        } catch (error) {
            console.error("Gagal logout:", error);
            toast.error("Terjadi kesalahan saat logout");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text">
                    <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-sm text-center">
                        <h2 className="text-xl font-semibold text-primary mb-4">
                            Logout Confirmation
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to log out of this account?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ${
                                    loading ? "cursor-wait" : "cursor-pointer"
                                }`}
                            >
                                {loading ? "Logouting..." : "Yes, sure"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div
                className={cn(
                    "mx-auto flex w-full flex-1 flex-col overflow-hidden border border-neutral-200 bg-gray-100 md:flex-row",
                    "h-[100dvh]"
                )}
            >
                <Toaster richColors />
                <Sidebar open={open} setOpen={setOpen}>
                    <SidebarBody className="justify-between gap-10">
                        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out">
                            {open ? <Logo /> : <LogoIcon />}
                            <div className="mt-8 flex flex-col gap-2">
                                {links.map((link, idx) => {
                                    if (link.action === "logout") {
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() =>
                                                    setShowLogoutModal(true)
                                                }
                                                className="flex items-center gap-2 px-1 py-2 rounded-md hover:bg-red-50 hover:text-red-600 text-neutral-700 text-sm font-poppins hover:gap-3 transition-all w-full text-left hitespace-pre cursor-pointer"
                                            >
                                                {link.icon}
                                                {open && (
                                                    <span>{link.label}</span>
                                                )}
                                            </button>
                                        );
                                    }

                                    return (
                                        <SidebarLink key={idx} link={link} />
                                    );
                                })}
                            </div>
                        </div>
                        <div className="">
                            <SidebarLink
                                link={{
                                    label: user.name || "User",
                                    href: "#",
                                    icon: (
                                        <div className="p-2 rounded-full bg-primary text-white font-poppins font-semibold flex items-center justify-center text-xs uppercase">
                                            {getInitials(user.name)}
                                        </div>
                                    ),
                                }}
                            />
                        </div>
                    </SidebarBody>
                </Sidebar>
                <div className="flex flex-1 h-full overflow-y-auto bg-white p-8 2xl:p-14 rounded-tl-2xl border border-neutral-200">
                    {children}
                </div>
            </div>
        </>
    );
}
export const Logo = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <Image
                src="/SSG.svg"
                alt="SS"
                width={0}
                height={0}
                className="w-6 m-auto"
                priority
            />
        </a>
    );
};
export const LogoIcon = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <Image
                src="/SSG.svg"
                alt="SS"
                width={0}
                height={0}
                className="w-6 m-auto"
                priority
            />
        </a>
    );
};
