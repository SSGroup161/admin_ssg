"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { toast, Toaster } from "sonner";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            return toast.error("Please fill new password");
        }

        if (newPassword !== confirmPassword) {
            return toast.error("Password not match");
        }

        try {
            setLoading(true);
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
            const res = await axios.post(
                `${BASE_URL}/api/v1/auth/reset-password`,
                {
                    token,
                    newPassword,
                }
            );

            toast.success(
                res.data.message ||
                    "Password suucessfully change! please try to login"
            );

            setTimeout(() => {
                router.push("/auth/login");
            }, 3000);
        } catch (error) {
            const msg = error?.response?.data?.message || "Something Wrong";
            toast.error(msg);
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
                        Reset Password
                    </h2>
                    <p className="text-center text-primary/70">
                        Please input your new passsword
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <input
                                placeholder="Password baru"
                                className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-primary"
                                required
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <label
                                className="absolute left-0 -top-3.5 text-primary text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm"
                                htmlFor="newPassword"
                            >
                                New Password
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                placeholder="Ulangi password"
                                className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-primary"
                                required
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                            <label
                                className="absolute left-0 -top-3.5 text-primary text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm"
                                htmlFor="confirmPassword"
                            >
                                Confirm Password
                            </label>
                        </div>

                        <button
                            className={`w-full py-2 px-4 bg-primary/80 hover:bg-primary rounded-md shadow-lg text-white font-semibold transition duration-200 ${
                                loading ? "cursor-wait" : "cursor-pointer"
                            }`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Proses..." : "Reset Password"}
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
