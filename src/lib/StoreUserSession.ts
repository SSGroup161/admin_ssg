"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function StoreUserSession() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            localStorage.setItem("ssg_user", JSON.stringify(session.user));
        }
    }, [status, session]);

    return null;
}
