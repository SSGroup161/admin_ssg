"use client";
import { cn } from "../lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

export const SidebarProvider = ({
    children,
    open: openProp,
    setOpen: setOpenProp,
    animate = true,
}) => {
    const [openState, setOpenState] = useState(false);

    const open = openProp !== undefined ? openProp : openState;
    const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

    return (
        <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const Sidebar = ({ children, open, setOpen, animate }) => {
    return (
        <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
            {children}
        </SidebarProvider>
    );
};

export const SidebarBody = (props) => {
    return (
        <>
            <DesktopSidebar {...props} />
            <MobileSidebar {...props} />
        </>
    );
};

export const DesktopSidebar = ({ className, children, ...props }) => {
    const { open, setOpen, animate } = useSidebar();
    return (
        <>
            <motion.div
                className={cn(
                    "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 w-[200px] shrink-0",
                    className
                )}
                animate={{
                    width: animate ? (open ? "200px" : "60px") : "200px",
                }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                {...props}
            >
                {children}
            </motion.div>
        </>
    );
};

export const MobileSidebar = ({ className, children, ...props }) => {
    const { open, setOpen } = useSidebar();
    return (
        <>
            <div
                className={cn(
                    "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 w-full"
                )}
                {...props}
            >
                <div className="flex justify-end z-20 w-full">
                    <IconMenu2
                        className="text-neutral-800"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <AnimatePresence mode="wait">
                    {open && (
                        <motion.div
                            key="mobile-sidebar"
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                            className={cn(
                                "fixed h-full w-full inset-0 bg-white p-10 z-[100] flex flex-col justify-between",
                                className
                            )}
                        >
                            <div
                                className="absolute right-10 top-10 z-50 text-neutral-800"
                                onClick={() => setOpen(false)}
                            >
                                <IconX />
                            </div>
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export const SidebarLink = ({ link, className, ...props }) => {
    const { open, animate } = useSidebar();
    const pathname = usePathname();
    const isActive =
        link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href) && link.href !== "/";

    return (
        <a
            href={link.href}
            className={cn(
                "flex items-center justify-start gap-2 group/sidebar py-2 px-1 rounded-full",
                isActive
                    ? "bg-primary text-white"
                    : "bg-transparent text-neutral-700 hover:bg-neutral-200",
                className
            )}
            {...props}
        >
            {link.icon}
            <motion.span
                animate={{
                    display: animate
                        ? open
                            ? "inline-block"
                            : "none"
                        : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block font-poppins !p-0 !m-0"
            >
                {link.label}
            </motion.span>
        </a>
    );
};
