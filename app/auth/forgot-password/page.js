"use client";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Image from "next/image";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return toast.error("Please input your email");

        try {
            setLoading(true);
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
            const res = await axios.post(
                `${BASE_URL}/api/v1/auth/forgot-password`,
                { email }
            );

            toast.success(
                res.data.message ||
                    "Link has been send, please check your inbox email"
            );
            setEmail("");
        } catch (error) {
            const msg = error?.response?.data?.message || "Something Wrong";
            toast.error(msg);
            console.log(error);
        } finally {
            setLoading(false);
        }
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
                    <h2 className="text-center text-2xl md:text-4xl font-extrabold text-primary">
                        Forgot Password
                    </h2>
                    <p className="text-center text-primary/70">
                        Please input your email
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

                        <button
                            className={`w-full py-2 px-4 bg-primary/80 hover:bg-primary rounded-md shadow-lg text-white font-semibold transition duration-200 ${
                                loading ? "cursor-wait" : "cursor-pointer"
                            }`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Link Reset"}
                        </button>
                    </form>
                    <div className="text-center text-gray-300 flex gap-2 items-center justify-center">
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
