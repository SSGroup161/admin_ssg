"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast, Toaster } from "sonner";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Email dan password wajib diisi");
            return;
        }

        setLoading(true);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
            remember: rememberMe,
        });

        if (res?.ok) {
            try {
                const ipRes = await axios.get(
                    "https://api.ipify.org?format=json"
                );
                const ip_address = ipRes.data?.ip;
                const device_info = navigator.userAgent;

                const userRes = await axios.get(
                    `${BASE_URL}/api/v1/user?email=${email}`
                );

                const user = userRes?.data?.data;

                const sessionRes = await axios.post(
                    `${BASE_URL}/api/v1/auth/login-session`,
                    {
                        user_id: user.id,
                        email: user.email,
                        username: user.name,
                        ip_address,
                        device_info,
                    }
                );

                const session_id = sessionRes.data.session_id;
                localStorage.setItem("ssg_session_id", session_id);

                toast.success("Login berhasil, mengarahkan...");
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            } catch (error) {
                console.error("Gagal menyimpan sesi login:", error);
                const msg = error?.response?.data?.message || "Something Wrong";
                toast.error(msg);
                setLoading(false);
            }
        } else if (res?.error === "CredentialsSignin") {
            toast.error("Email atau password salah");
            setLoading(false);
        } else {
            toast.error("Terjadi kesalahan saat login");
            setLoading(false);
        }
    };

    const handleForgot = () => {
        router.push("/auth/forgot-password");
    };

    return (
        <section className="w-full h-[100dvh] bg-[url('/SS.png')] bg-no-repeat bg-cover">
            <Toaster richColors />
            <div className="w-full h-full m-auto flex justify-center gap-6 bg-primary/50 items-center font-poppins px-10">
                <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 h-fit">
                    <Image
                        src="/SSGLandscape.svg"
                        alt="SS"
                        width={0}
                        height={0}
                        className="w-1/2 m-auto mb-8"
                        priority
                    />
                    <h2 className="text-center md:text-4xl text-2xl font-extrabold text-primary">
                        Welcome
                    </h2>
                    <p className="text-center text-primary/70">
                        Sign in to your account
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <input
                                placeholder="john@example.com"
                                className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-primary"
                                required
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label
                                className="absolute left-0 -top-3.5 text-primary text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm"
                                htmlFor="email"
                            >
                                Email address
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                placeholder="Password"
                                className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-primary"
                                required
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label
                                className="absolute left-0 -top-3.5 text-primary text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-1.5 top-2 cursor-pointer"
                            >
                                {showPassword ? (
                                    <IconEyeOff className="h-5 w-5 text-gray-500 hover:text-primary" />
                                ) : (
                                    <IconEye className="h-5 w-5 text-gray-500 hover:text-primary" />
                                )}
                            </button>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label
                                htmlFor="remember"
                                className="flex items-center gap-2 text-sm cursor-pointer select-none"
                            >
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
                                    className="sr-only"
                                />
                                <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                                        rememberMe
                                            ? "bg-primary border-primary"
                                            : "border-gray-300"
                                    }`}
                                >
                                    {rememberMe && (
                                        <svg
                                            className="w-3 h-3 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M5 13l4 4L19 7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-gray-600 font-poppins text-xs md:text-sm">
                                    Remember me
                                </span>
                            </label>
                            <span
                                className="font-poppins text-xs md:text-sm text-gray-600 cursor-pointer hover:text-primary"
                                onClick={handleForgot}
                            >
                                forgot password?
                            </span>
                        </div>

                        <button
                            className={`w-full py-2 px-4 bg-primary/80 hover:bg-primary rounded-md shadow-lg text-white font-semibold transition duration-200 ${
                                loading ? "cursor-wait" : "cursor-pointer"
                            }`}
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Please wait..." : "Sign In"}
                        </button>
                    </form>
                    <div className="text-center text-gray-300 flex gap-2 items-center justify-center text-sm md:text-base">
                        Have a problem?
                        <a className="text-primary/70 hover:underline" href="#">
                            Please contact IT Support
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
