"use client";
import SidebarLayout from "../../src/components/SidebarLayout";
import SkillInput from "../../src/components/SkillInput";
import JobDescriptionEditor from "../../src/components/JobDescriptionEditor";
import JobQualifyEditor from "../../src/components/JobQualifyEditor";
import Protect from "../../src/lib/Protect";
import { useState } from "react";
import { Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { toast, Toaster } from "sonner";

const { Option } = Select;

export default function AddVacancy() {
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

    return (
        <SidebarLayout>
            <Protect />
            <section className="w-full h-full flex flex-col overflow-y-scroll scrollbar-none">
                <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
                    <div className="w-full font-poppins">
                        <h1 className="font-poppins text-4xl mb-4">
                            Add Vacancy
                        </h1>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl text-[#292929]">
                                Hello{" "}
                                <span className="text-primary font-semibold">
                                    Reynaldi Ramadhani!
                                </span>
                            </h2>
                            <span className="text-[#707070]">
                                What job vacancy would you like to add today?
                            </span>
                        </div>
                    </div>
                    <h2 className="font-poppins text-2xl mt-8 mb-4 font-medium text-[#292929] md:px-10">
                        Form Add Vacancy
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
                                        handleChange("jobTitle", e.target.value)
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
                                    <Option value="Creative">Creative</Option>
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
                                    <Option value="Fulltime">Fulltime</Option>
                                    <Option value="Freelance">Freelance</Option>
                                    <Option value="Part Time">Part Time</Option>
                                    <Option value="Internship">
                                        Internship
                                    </Option>
                                    <Option value="Project Based">
                                        Project Based
                                    </Option>
                                    <Option value="Contract">Contract</Option>
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
                            <SkillInput skills={skills} setSkills={setSkills} />
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
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path
                                        fill="currentColor"
                                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                    ></path>
                                </svg>
                            </div>
                        </button>
                    </form>
                </div>
            </section>
        </SidebarLayout>
    );
}
