"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SidebarLayout from "../../src/components/SidebarLayout";
import JobCard from "../../src/components/JobCard";

export default function Vacancy() {
    const [activeTab, setActiveTab] = useState("active");
    const router = useRouter();

    return (
        <SidebarLayout>
            <section className="w-full h-full flex flex-col overflow-y-scroll scrollbar-none font-poppins px-4 md:px-8">
                <h1 className="text-4xl mb-6">Vacancy</h1>

                {/* Tabs */}
                <div className="flex gap-6 mb-6">
                    <button
                        onClick={() => setActiveTab("active")}
                        className={`pb-2 text-base font-medium font-poppins cursor-pointer transition-colors ${
                            activeTab === "active"
                                ? "text-primary border-b-[2px] border-primary"
                                : "text-[#707070] border-b-[2px] border-border-[#707070]"
                        }`}
                    >
                        Active Jobs
                    </button>
                    <button
                        onClick={() => setActiveTab("inactive")}
                        className={`pb-2 text-base font-medium font-poppins cursor-pointer transition-colors ${
                            activeTab === "inactive"
                                ? "text-primary border-b-[2px] border-primary"
                                : "text-[#707070] border-b-[2px] border-[#707070]"
                        }`}
                    >
                        Inactive Jobs
                    </button>
                </div>

                {activeTab === "active" ? (
                    <div className="w-full grid grid-cols-3 2xl:grid-cols-4 gap-4">
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                    </div>
                ) : (
                    <div>
                        <p>List of inactive jobs will go here.</p>
                    </div>
                )}
            </section>
        </SidebarLayout>
    );
}
