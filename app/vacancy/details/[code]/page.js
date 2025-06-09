"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import SidebarLayout from "../../../../src/components/SidebarLayout";
import CandidateCard from "../../../../src/components/CandidateCard";
import HiringStageColumn from "../../../../src/components/HiringStageColumn";
import SkillInput from "../../../../src/components/SkillInput";
import JobDescriptionEditor from "../../../../src/components/JobDescriptionEditor";
import JobQualifyEditor from "../../../../src/components/JobQualifyEditor";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { toast, Toaster } from "sonner";

const { Option } = Select;

export default function Details() {
    const router = useRouter();
    const params = useParams();
    const code = params.code;
    const [activeTab, setActiveTab] = useState("active");
    const [activeCandidate, setActiveCandidate] = useState(null);
    const [maxCandidatesPerStage] = useState(5);
    const [skills, setSkills] = useState([]);
    const [jobDesc, setJobDesc] = useState("");
    const [jobQualify, setJobQualify] = useState("");

    const [formData, setFormData] = useState({
        jobTitle: "",
        brand: "",
        department: "",
        level: "",
        contractType: "",
        deadline: null,
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.jobTitle.trim() ||
            !formData.brand ||
            !formData.department ||
            !formData.level ||
            !formData.contractType ||
            !formData.deadline ||
            skills.length === 0 ||
            !jobDesc.trim() ||
            !jobQualify.trim()
        ) {
            toast.error("Please complete all required fields.");
            return;
        }

        toast.success("Form is valid and ready to be submitted!");
    };

    // Data tahapan hiring
    const [stages, setStages] = useState([
        { id: "applied", title: "Applied", candidates: [] },
        { id: "screening", title: "Screening", candidates: [] },
        { id: "interview", title: "Interview", candidates: [] },
        { id: "test", title: "Test", candidates: [] },
        { id: "offer", title: "Offering", candidates: [] },
    ]);

    // Data dummy kandidat (bisa diganti dengan data dari API)
    const [candidates, setCandidates] = useState([
        {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            stage: "applied",
            appliedDate: "2023-05-01",
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            stage: "screening",
            appliedDate: "2023-05-02",
        },
        {
            id: "3",
            name: "Robert Johnson",
            email: "robert@example.com",
            stage: "interview",
            appliedDate: "2023-05-03",
        },
        {
            id: "4",
            name: "Emily Davis",
            email: "emily@example.com",
            stage: "test",
            appliedDate: "2023-05-04",
        },
        {
            id: "5",
            name: "Michael Wilson",
            email: "michael@example.com",
            stage: "offer",
            appliedDate: "2023-05-05",
        },
        {
            id: "6",
            name: "Sarah Brown",
            email: "sarah@example.com",
            stage: "test",
            appliedDate: "2023-05-06",
        },
        {
            id: "7",
            name: "David Lee",
            email: "david@example.com",
            stage: "applied",
            appliedDate: "2023-05-07",
        },
        {
            id: "8",
            name: "Lisa Wang",
            email: "lisa@example.com",
            stage: "applied",
            appliedDate: "2023-05-08",
        },
        {
            id: "9",
            name: "James Kim",
            email: "james@example.com",
            stage: "applied",
            appliedDate: "2023-05-09",
        },
        {
            id: "10",
            name: "Anna Taylor",
            email: "anna@example.com",
            stage: "applied",
            appliedDate: "2023-05-10",
        },
        {
            id: "11",
            name: "Thomas Clark",
            email: "thomas@example.com",
            stage: "applied",
            appliedDate: "2023-05-11",
        },
    ]);

    useEffect(() => {
        const updatedStages = stages.map((stage) => ({
            ...stage,
            candidates: candidates.filter(
                (candidate) => candidate.stage === stage.id
            ),
        }));
        setStages(updatedStages);
    }, [candidates]);

    const handleBack = () => {
        router.push("/vacancy");
    };

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveCandidate(
            candidates.find((candidate) => candidate.id === active.id)
        );
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id !== over.id) {
            const activeStage = stages.find((stage) =>
                stage.candidates.some((c) => c.id === active.id)
            );
            const overStage = stages.find(
                (stage) =>
                    stage.id === over.data.current?.stageId ||
                    stage.candidates.some((c) => c.id === over.id)
            );

            if (activeStage && overStage && activeStage.id !== overStage.id) {
                // Pindahkan kandidat ke tahapan baru
                setCandidates((prevCandidates) =>
                    prevCandidates.map((candidate) =>
                        candidate.id === active.id
                            ? { ...candidate, stage: overStage.id }
                            : candidate
                    )
                );
            }
        }
    };

    return (
        <SidebarLayout>
            <section className="w-full h-full flex flex-col overflow-y-scroll scrollbar-none font-poppins px-4 md:px-8">
                <div
                    className="flex items-center gap-2 pb-4 cursor-pointer hover:gap-4 transition-all duration-300 ease-in-out"
                    onClick={handleBack}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="24"
                        viewBox="0 0 12 24"
                        fill="none"
                    >
                        <path
                            d="M9.54801 17.42L8.48701 18.48L2.70801 12.703C2.61486 12.6104 2.54093 12.5004 2.49048 12.3791C2.44003 12.2579 2.41406 12.1278 2.41406 11.9965C2.41406 11.8652 2.44003 11.7352 2.49048 11.6139C2.54093 11.4927 2.61486 11.3826 2.70801 11.29L8.48701 5.51001L9.54701 6.57001L4.12301 11.995L9.54801 17.42Z"
                            fill="#707070"
                        />
                    </svg>
                    <h2 className="text-[#707070]">Back to Vacancy List</h2>
                </div>
                <h1 className="text-4xl mb-6 font-semibold ps-4">{code}</h1>

                {/* Tabs */}
                <div className="flex gap-6 mb-6 ps-4">
                    <button
                        onClick={() => setActiveTab("active")}
                        className={`pb-2 text-base font-medium flex items-center gap-2 font-poppins cursor-pointer transition-colors ${
                            activeTab === "active"
                                ? "text-primary border-b-[2px] border-primary font-semibold"
                                : "text-[#707070] border-b-[2px] border-border-[#707070]"
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                        >
                            <path
                                d="M3 16.5H15"
                                stroke={`${
                                    activeTab === "active"
                                        ? "#d2ac47"
                                        : "#707070"
                                }`}
                                strokeLinecap="round"
                            />
                            <path
                                d="M13.7525 6.08321L14.309 5.52821C14.5282 5.30912 14.702 5.049 14.8206 4.76272C14.9392 4.47645 15.0003 4.16961 15.0004 3.85972C15.0004 3.54984 14.9394 3.24299 14.8208 2.95669C14.7023 2.67038 14.5285 2.41023 14.3094 2.19108C14.0903 1.97194 13.8302 1.7981 13.5439 1.67948C13.2576 1.56086 12.9508 1.49979 12.6409 1.49976C12.331 1.49972 12.0242 1.56072 11.7379 1.67928C11.4516 1.79783 11.1914 1.97162 10.9723 2.19071L10.4158 2.74721C10.4158 2.74721 10.4855 3.92921 11.528 4.97171C12.5705 6.01421 13.7525 6.08396 13.7525 6.08396L8.63977 11.1967C8.29327 11.5432 8.12077 11.7157 7.92952 11.865C7.70402 12.041 7.46177 12.1907 7.20277 12.3142C6.98452 12.4185 6.75202 12.4957 6.28777 12.6502L4.31827 13.3072M10.4158 2.74646L5.30302 7.85996C4.95652 8.20646 4.78327 8.37896 4.63477 8.57021C4.45886 8.79528 4.3082 9.03899 4.18552 9.29696C4.08127 9.51521 4.00402 9.74771 3.84877 10.212L3.19252 12.1815M3.19252 12.1815L3.03277 12.6622C2.99532 12.7743 2.98985 12.8946 3.01697 13.0096C3.04408 13.1247 3.10271 13.2299 3.18628 13.3135C3.26985 13.397 3.37505 13.4556 3.49008 13.4828C3.60511 13.5099 3.72543 13.5044 3.83752 13.467L4.31827 13.3072M3.19252 12.1815L4.31827 13.3072"
                                stroke={`${
                                    activeTab === "active"
                                        ? "#d2ac47"
                                        : "#707070"
                                }`}
                            />
                        </svg>
                        <span>Edit Vacancy</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("inactive")}
                        className={`pb-2 text-base font-medium font-poppins flex items-center gap-2 cursor-pointer transition-colors ${
                            activeTab === "inactive"
                                ? "text-primary border-b-[2px] border-primary font-semibold"
                                : "text-[#707070] border-b-[2px] border-[#707070]"
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M18.25 13.5V10.5H15.25V9.50002H18.25V6.50002H19.25V9.50002H22.25V10.5H19.25V13.5H18.25ZM9 11.384C8.17533 11.384 7.469 11.0907 6.881 10.504C6.293 9.91735 5.99933 9.21035 6 8.38302C6.00067 7.55569 6.29433 6.84969 6.881 6.26502C7.46767 5.68035 8.174 5.38702 9 5.38502C9.826 5.38302 10.5323 5.67635 11.119 6.26502C11.7057 6.85369 11.9993 7.56035 12 8.38502C12.0007 9.20969 11.707 9.91569 11.119 10.503C10.531 11.0904 9.82467 11.3844 9 11.385M2 18.615V16.97C2 16.5574 2.12 16.1714 2.36 15.812C2.60067 15.452 2.924 15.1727 3.33 14.974C4.274 14.5214 5.21867 14.182 6.164 13.956C7.10867 13.7294 8.054 13.616 9 13.616C9.946 13.616 10.8917 13.7294 11.837 13.956C12.7823 14.1827 13.7263 14.522 14.669 14.974C15.0757 15.1727 15.399 15.452 15.639 15.812C15.8797 16.1714 16 16.5574 16 16.97V18.616L2 18.615ZM3 17.615H15V16.969C15 16.7477 14.9283 16.5394 14.785 16.344C14.6423 16.1494 14.4447 15.9847 14.192 15.85C13.3693 15.4514 12.521 15.146 11.647 14.934C10.773 14.722 9.89067 14.616 9 14.616C8.10933 14.616 7.22733 14.722 6.354 14.934C5.48067 15.146 4.632 15.4514 3.808 15.85C3.55467 15.9847 3.357 16.1494 3.215 16.344C3.07167 16.5394 3 16.748 3 16.97V17.615ZM9 10.385C9.55 10.385 10.021 10.189 10.413 9.79702C10.805 9.40502 11.0007 8.93402 11 8.38402C10.9993 7.83402 10.8037 7.36335 10.413 6.97202C10.0223 6.58069 9.55133 6.38469 9 6.38402C8.44867 6.38335 7.978 6.57935 7.588 6.97202C7.198 7.36469 7.002 7.83535 7 8.38402C6.998 8.93269 7.194 9.40369 7.588 9.79702C7.982 10.1904 8.45267 10.386 9 10.384"
                                fill={`${
                                    activeTab === "inactive"
                                        ? "#d2ac47"
                                        : "#707070"
                                }`}
                            />
                        </svg>
                        <span>Stages</span>
                    </button>
                </div>

                {activeTab === "active" ? (
                    <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
                        <h2 className="font-poppins text-2xl mt-8 mb-4 font-medium text-[#292929] md:px-10">
                            Edit Details Vacancy
                        </h2>
                        <form className=" md:px-10" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-poppins">
                                {/* Job Title */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg font-medium text-[#292929]">
                                        Job Title
                                    </label>
                                    <Input
                                        placeholder="Enter job title"
                                        value={formData.jobTitle}
                                        onChange={(e) =>
                                            handleChange(
                                                "jobTitle",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                        required
                                    />
                                </div>

                                {/* Brand */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg font-medium text-[#292929]">
                                        Brand
                                    </label>
                                    <Select
                                        placeholder=""
                                        value={formData.brand}
                                        onChange={(value) =>
                                            handleChange("brand", value)
                                        }
                                        className="w-full"
                                    >
                                        <Option value="SS Skin">SS Skin</Option>
                                        <Option value="SS Your Makeup">
                                            SS Your Makeup
                                        </Option>
                                        <Option value="Shellasaukia.co">
                                            Shellasaukia.co
                                        </Option>
                                    </Select>
                                </div>

                                {/* Department */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg font-medium text-[#292929]">
                                        Department
                                    </label>
                                    <Select
                                        placeholder="Select department"
                                        value={formData.department}
                                        onChange={(value) =>
                                            handleChange("department", value)
                                        }
                                        className="w-full"
                                    >
                                        <Option value="Human Capital & Legal">
                                            Human Capital & Legal
                                        </Option>
                                        <Option value="IT">IT</Option>
                                        <Option value="Creative">
                                            Creative
                                        </Option>
                                        <Option value="E-Commerce">
                                            E-Commerce
                                        </Option>
                                        <Option value="Product">Product</Option>
                                        <Option value="Operasional">
                                            Operasional
                                        </Option>
                                        <Option value="Finance">Finance</Option>
                                    </Select>
                                </div>

                                {/* Level */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg font-medium text-[#292929]">
                                        Level
                                    </label>
                                    <Select
                                        placeholder="Select level"
                                        value={formData.level}
                                        onChange={(value) =>
                                            handleChange("level", value)
                                        }
                                        className="w-full"
                                    >
                                        <Option value="Junior">Junior</Option>
                                        <Option value="Middle">Middle</Option>
                                        <Option value="Senior">Senior</Option>
                                    </Select>
                                </div>

                                {/* Contract Type */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg font-medium text-[#292929]">
                                        Contract Type
                                    </label>
                                    <Select
                                        placeholder="Select contract type"
                                        value={formData.contractType}
                                        onChange={(value) =>
                                            handleChange("contractType", value)
                                        }
                                        className="w-full"
                                    >
                                        <Option value="Fulltime">
                                            Fulltime
                                        </Option>
                                        <Option value="Freelance">
                                            Freelance
                                        </Option>
                                        <Option value="Part Time">
                                            Part Time
                                        </Option>
                                        <Option value="Internship">
                                            Internship
                                        </Option>
                                        <Option value="Project Based">
                                            Project Based
                                        </Option>
                                        <Option value="Contract">
                                            Contract
                                        </Option>
                                    </Select>
                                </div>

                                {/* Deadline */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg font-medium text-[#292929]">
                                        Deadline
                                    </label>
                                    <DatePicker
                                        className="w-full"
                                        format="YYYY-MM-DD"
                                        required
                                        value={
                                            formData.deadline
                                                ? dayjs(formData.deadline)
                                                : null
                                        }
                                        onChange={(date, dateString) =>
                                            handleChange("deadline", dateString)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full mt-4">
                                <label className="block mb-1 text-lg font-medium text-[#292929]">
                                    Required Skills
                                </label>
                                <SkillInput
                                    skills={skills}
                                    setSkills={setSkills}
                                />
                            </div>
                            <div className="w-full mt-4">
                                <label className="block mb-1 text-lg font-medium text-[#292929]">
                                    Job Description
                                </label>
                                <JobDescriptionEditor
                                    value={jobDesc}
                                    onChange={(html) => setJobDesc(html)}
                                />
                            </div>
                            <div className="w-full mt-4">
                                <label className="block mb-1 text-lg font-medium text-[#292929]">
                                    Job Qualifications
                                </label>
                                <JobQualifyEditor
                                    value={jobQualify}
                                    onChange={(html) => setJobQualify(html)}
                                />
                            </div>
                            <button
                                className="relative bg-primary text-white font-medium text-[17px] px-4 py-[0.35em] pl-5 h-[2.8em] rounded-xl flex items-center overflow-hidden cursor-pointer group mt-4"
                                type="submit"
                            >
                                <span className="mr-10">Go Publish</span>
                                <div className="absolute right-[0.3em] bg-white h-[2.2em] w-[2.2em] rounded-[0.7em] flex items-center justify-center transition-all duration-300 group-hover:w-[calc(100%-0.6em)] active:scale-95">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="w-[1.1em] transition-transform duration-300 text-primary group-hover:translate-x-[0.1em]"
                                    >
                                        <path
                                            fill="none"
                                            d="M0 0h24v24H0z"
                                        ></path>
                                        <path
                                            fill="currentColor"
                                            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                        ></path>
                                    </svg>
                                </div>
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="ps-4">
                        <DndContext
                            collisionDetection={closestCorners}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
                            <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-4">
                                <SortableContext
                                    items={stages.map((stage) => stage.id)}
                                    strategy={horizontalListSortingStrategy}
                                >
                                    {stages.map((stage) => (
                                        <HiringStageColumn
                                            key={stage.id}
                                            stage={stage}
                                            candidates={stage.candidates}
                                            totalCandidates={
                                                stage.candidates.length
                                            }
                                            onSeeMore={() =>
                                                handleSeeMore(stage.id)
                                            }
                                        />
                                    ))}
                                </SortableContext>
                            </div>

                            <DragOverlay>
                                {activeCandidate ? (
                                    <CandidateCard
                                        candidate={activeCandidate}
                                    />
                                ) : null}
                            </DragOverlay>
                        </DndContext>
                    </div>
                )}
            </section>
        </SidebarLayout>
    );
}
