"use client";
import SidebarLayout from "../src/components/SidebarLayout";
import CountUp from "../src/components/CountUp";
import { Space, Table, Tag, Input, Button, Dropdown } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { useState } from "react";
import dynamic from "next/dynamic";
const Protect = dynamic(() => import("../src/lib/Protect"), { ssr: false });

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? "geekblue" : "green";
                    if (tag === "loser") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
const originalData = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["developer"],
        department: "HR",
        status: "Active",
        date: "2024-03-20",
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
        department: "IT",
        status: "Inactive",
        date: "2024-02-15",
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        tags: ["teacher"],
        department: "Finance",
        status: "Active",
        date: "2024-04-05",
    },
];

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState(null);
    const [departmentFilter, setDepartmentFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);

    const filteredData = originalData
        .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((item) =>
            departmentFilter ? item.department === departmentFilter : true
        )
        .filter((item) => (statusFilter ? item.status === statusFilter : true))
        .sort((a, b) => {
            if (sortKey === "name-asc") return a.name.localeCompare(b.name);
            if (sortKey === "name-desc") return b.name.localeCompare(a.name);
            if (sortKey === "date-asc")
                return new Date(a.date) - new Date(b.date);
            if (sortKey === "date-desc")
                return new Date(b.date) - new Date(a.date);
            return 0;
        });

    const filterMenuItems = [
        {
            key: "sort-name-asc",
            label: "Sort: Name A-Z",
            onClick: () => setSortKey("name-asc"),
        },
        {
            key: "sort-name-desc",
            label: "Sort: Name Z-A",
            onClick: () => setSortKey("name-desc"),
        },
        {
            key: "sort-date-asc",
            label: "Sort: Date A-Z",
            onClick: () => setSortKey("date-asc"),
        },
        {
            key: "sort-date-desc",
            label: "Sort: Date Z-A",
            onClick: () => setSortKey("date-desc"),
        },
        {
            type: "divider",
        },
        {
            key: "status-active",
            label: "Status: Active",
            onClick: () => setStatusFilter("Active"),
        },
        {
            key: "status-inactive",
            label: "Status: Inactive",
            onClick: () => setStatusFilter("Inactive"),
        },
        {
            type: "divider",
        },
        {
            key: "dept-hr",
            label: "Department: HR",
            onClick: () => setDepartmentFilter("HR"),
        },
        {
            key: "dept-it",
            label: "Department: IT",
            onClick: () => setDepartmentFilter("IT"),
        },
        {
            key: "dept-finance",
            label: "Department: Finance",
            onClick: () => setDepartmentFilter("Finance"),
        },
    ];

    return (
        <SidebarLayout>
            <Protect />
            <section className="w-full h-full flex flex-col overflow-y-scroll scrollbar-none">
                <h1 className="font-poppins text-4xl mb-4">Dashboard</h1>
                <div className="w-full grid grid-cols-6 gap-6 xl:gap-8">
                    <div className="w-full col-span-4 grid grid-cols-2 gap-6 xl:gap-8">
                        <div className="w-full h-50 2xl:h-55 border-neutral-300 border rounded-2xl flex flex-col">
                            <div className="w-full h-full flex flex-col p-4 2xl:p-6">
                                <div className=" flex items-center justify-start gap-4">
                                    <div className="p-3 xl:p-4 2xl:p-5 bg-[#f2f2f2] rounded-2xl">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="22"
                                            height="22"
                                            viewBox="0 0 22 22"
                                            fill="none"
                                        >
                                            <path
                                                d="M15 5C15 3.114 15 2.172 14.414 1.586C13.828 1 12.886 1 11 1C9.114 1 8.172 1 7.586 1.586C7 2.172 7 3.114 7 5M1 13C1 9.229 1 7.343 2.172 6.172C3.344 5.001 5.229 5 9 5H13C16.771 5 18.657 5 19.828 6.172C20.999 7.344 21 9.229 21 13C21 16.771 21 18.657 19.828 19.828C18.656 20.999 16.771 21 13 21H9C5.229 21 3.343 21 2.172 19.828C1.001 18.656 1 16.771 1 13Z"
                                                stroke="#292929"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M7 7.5C7.13261 7.5 7.25975 7.55272 7.35352 7.64648C7.44728 7.74025 7.5 7.86739 7.5 8C7.5 8.13261 7.44728 8.25975 7.35352 8.35352C7.25975 8.44728 7.13261 8.5 7 8.5C6.86739 8.5 6.74025 8.44728 6.64648 8.35352C6.55272 8.25975 6.5 8.13261 6.5 8C6.5 7.86739 6.55272 7.74025 6.64648 7.64648C6.71689 7.57608 6.80611 7.52894 6.90234 7.50977L7 7.5ZM15 7.5C15.1326 7.5 15.2597 7.55272 15.3535 7.64648C15.4473 7.74025 15.5 7.86739 15.5 8C15.5 8.13261 15.4473 8.25975 15.3535 8.35352C15.2597 8.44728 15.1326 8.5 15 8.5C14.8674 8.5 14.7403 8.44728 14.6465 8.35352C14.5527 8.25975 14.5 8.13261 14.5 8C14.5 7.86739 14.5527 7.74025 14.6465 7.64648C14.7169 7.57608 14.8061 7.52894 14.9023 7.50977L15 7.5Z"
                                                fill="#292929"
                                                stroke="#292929"
                                            />
                                        </svg>
                                    </div>
                                    <span className="font-poppins text-[#292929] text-base xl:text-lg 2xl:text-xl">
                                        Active Vacancy
                                    </span>
                                </div>
                                <div className="w-full h-full flex items-end justify-start">
                                    <CountUp
                                        from={0}
                                        to={100}
                                        separator=","
                                        direction="up"
                                        duration={1}
                                        className="count-up-text font-poppins text-4xl text-[#292929] font-semibold"
                                    />
                                </div>
                            </div>
                            <div className="w-full h-2/6 border-t border-neutral-300 flex items-center justify-start font-poppins text-[#707070] gap-2 px-2 xl:px-4 text-sm xl:text-base">
                                <span className="font-semibold">Update:</span>
                                <span>January 12, 2025</span>
                            </div>
                        </div>

                        <div className="w-full h-50 2xl:h-55 border-neutral-300 border rounded-2xl flex flex-col">
                            <div className="w-full h-full flex flex-col p-4 2xl:p-6">
                                <div className=" flex items-center justify-start gap-4">
                                    <div className="p-3 xl:p-4 2xl:p-5 bg-[#f2f2f2] rounded-2xl">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_2293_633)">
                                                <path
                                                    d="M18.125 20H1.875C0.8375 20 0 19.1625 0 18.125V3.125C0 2.0875 0.8375 1.25 1.875 1.25H18.125C19.1625 1.25 20 2.0875 20 3.125V18.125C20 19.1625 19.1625 20 18.125 20ZM1.875 2.5C1.525 2.5 1.25 2.775 1.25 3.125V18.125C1.25 18.475 1.525 18.75 1.875 18.75H18.125C18.475 18.75 18.75 18.475 18.75 18.125V3.125C18.75 2.775 18.475 2.5 18.125 2.5H1.875Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M5.625 5C5.275 5 5 4.725 5 4.375V0.625C5 0.275 5.275 0 5.625 0C5.975 0 6.25 0.275 6.25 0.625V4.375C6.25 4.725 5.975 5 5.625 5ZM14.375 5C14.025 5 13.75 4.725 13.75 4.375V0.625C13.75 0.275 14.025 0 14.375 0C14.725 0 15 0.275 15 0.625V4.375C15 4.725 14.725 5 14.375 5ZM19.375 7.5H0.625C0.275 7.5 0 7.225 0 6.875C0 6.525 0.275 6.25 0.625 6.25H19.375C19.725 6.25 20 6.525 20 6.875C20 7.225 19.725 7.5 19.375 7.5Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M5 12.5C5.69036 12.5 6.25 11.9404 6.25 11.25C6.25 10.5596 5.69036 10 5 10C4.30964 10 3.75 10.5596 3.75 11.25C3.75 11.9404 4.30964 12.5 5 12.5Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M10 12.5C10.6904 12.5 11.25 11.9404 11.25 11.25C11.25 10.5596 10.6904 10 10 10C9.30964 10 8.75 10.5596 8.75 11.25C8.75 11.9404 9.30964 12.5 10 12.5Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M15 12.5C15.6904 12.5 16.25 11.9404 16.25 11.25C16.25 10.5596 15.6904 10 15 10C14.3096 10 13.75 10.5596 13.75 11.25C13.75 11.9404 14.3096 12.5 15 12.5Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M5 16.25C5.69036 16.25 6.25 15.6904 6.25 15C6.25 14.3096 5.69036 13.75 5 13.75C4.30964 13.75 3.75 14.3096 3.75 15C3.75 15.6904 4.30964 16.25 5 16.25Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M10 16.25C10.6904 16.25 11.25 15.6904 11.25 15C11.25 14.3096 10.6904 13.75 10 13.75C9.30964 13.75 8.75 14.3096 8.75 15C8.75 15.6904 9.30964 16.25 10 16.25Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M15 16.25C15.6904 16.25 16.25 15.6904 16.25 15C16.25 14.3096 15.6904 13.75 15 13.75C14.3096 13.75 13.75 14.3096 13.75 15C13.75 15.6904 14.3096 16.25 15 16.25Z"
                                                    fill="black"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2293_633">
                                                    <rect
                                                        width="20"
                                                        height="20"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <span className="font-poppins text-[#292929] text-base xl:text-lg 2xl:text-xl">
                                        Applicants This Week
                                    </span>
                                </div>
                                <div className="w-full h-full flex items-end justify-start">
                                    <CountUp
                                        from={0}
                                        to={100}
                                        separator=","
                                        direction="up"
                                        duration={1}
                                        className="count-up-text font-poppins text-4xl text-[#292929] font-semibold"
                                    />
                                </div>
                            </div>
                            <div className="w-full h-2/6 border-t border-neutral-300 flex items-center justify-start font-poppins text-[#707070] gap-2 px-2 xl:px-4 text-sm xl:text-base">
                                <span className="font-semibold">Update:</span>
                                <span>January 12, 2025</span>
                            </div>
                        </div>

                        <div className="w-full h-50 2xl:h-55 border-neutral-300 border rounded-2xl flex flex-col">
                            <div className="w-full h-full flex flex-col p-4 2xl:p-6">
                                <div className=" flex items-center justify-start gap-4">
                                    <div className="p-3 xl:p-4 2xl:p-5 bg-[#f2f2f2] rounded-2xl">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="21"
                                            viewBox="0 0 20 21"
                                            fill="none"
                                        >
                                            <path
                                                d="M7.69231 0.000106057C4.69231 0.000106057 2.30769 2.42017 2.30769 5.46476C2.30769 7.33836 3.23077 9.05582 4.69231 9.99262C1.92308 11.0856 0 13.8959 0 17.0967H1.53846C1.53846 13.6617 4.30769 10.8514 7.69231 10.8514C8.15385 10.8514 8.53846 10.9294 8.92308 11.0075C8.95846 10.9583 9.00539 10.9161 9.04308 10.8677C8.16967 11.9694 7.69312 13.3407 7.69231 14.7547C7.69231 18.1896 10.4615 21 13.8462 21C17.2308 21 20 18.1896 20 14.7547C20 11.3198 17.2308 8.50936 13.8462 8.50936C13.1812 8.51041 12.5208 8.62223 11.8915 8.84036C12.5272 8.04035 12.9262 7.07372 13.0421 6.05276C13.158 5.03179 12.9861 3.99841 12.5464 3.07265C12.1066 2.14688 11.4171 1.36675 10.5578 0.822868C9.69861 0.278986 8.70495 -0.0063154 7.69231 0.000106057ZM7.69231 1.48337C9.84615 1.48337 11.5385 3.20083 11.5385 5.3867C11.5385 7.57256 9.84615 9.29002 7.69231 9.29002C5.53846 9.29002 3.84615 7.57256 3.84615 5.3867C3.84615 3.20083 5.53846 1.48337 7.69231 1.48337ZM13.8462 10.0707C16.3846 10.0707 18.4615 12.1785 18.4615 14.7547C18.4615 17.3309 16.3846 19.4387 13.8462 19.4387C11.3077 19.4387 9.23077 17.3309 9.23077 14.7547C9.23077 12.1785 11.3077 10.0707 13.8462 10.0707ZM13.0769 11.632V15.2231L11.7692 16.5502L12.8462 17.6431L14.6154 15.8476V11.632H13.0769Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </div>
                                    <span className="font-poppins text-[#292929] text-base xl:text-lg 2xl:text-xl">
                                        In Progress Candidates
                                    </span>
                                </div>
                                <div className="w-full h-full flex items-end justify-start">
                                    <CountUp
                                        from={0}
                                        to={100}
                                        separator=","
                                        direction="up"
                                        duration={1}
                                        className="count-up-text font-poppins text-4xl text-[#292929] font-semibold"
                                    />
                                </div>
                            </div>
                            <div className="w-full h-2/6 border-t border-neutral-300 flex items-center justify-start font-poppins text-[#707070] gap-2 px-2 xl:px-4 text-sm xl:text-base">
                                <span className="font-semibold">Update:</span>
                                <span>January 12, 2025</span>
                            </div>
                        </div>

                        <div className="w-full h-50 2xl:h-55 border-neutral-300 border rounded-2xl flex flex-col">
                            <div className="w-full h-full flex flex-col p-4 2xl:p-6">
                                <div className=" flex items-center justify-start gap-4">
                                    <div className="p-3 xl:p-4 2xl:p-5 bg-[#f2f2f2] rounded-2xl">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M3 18.0526V16.1579C3 15.1529 3.39509 14.189 4.09835 13.4783C4.80161 12.7677 5.75544 12.3684 6.75 12.3684H10.0312M18 19L13.3125 14.2632M13.3125 19L18 14.2632M4.875 4.78947C4.875 5.7945 5.27009 6.75837 5.97335 7.46904C6.67661 8.1797 7.63044 8.57895 8.625 8.57895C9.61956 8.57895 10.5734 8.1797 11.2767 7.46904C11.9799 6.75837 12.375 5.7945 12.375 4.78947C12.375 3.78444 11.9799 2.82058 11.2767 2.10991C10.5734 1.39925 9.61956 1 8.625 1C7.63044 1 6.67661 1.39925 5.97335 2.10991C5.27009 2.82058 4.875 3.78444 4.875 4.78947Z"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <span className="font-poppins text-[#292929] text-base xl:text-lg 2xl:text-xl">
                                        Dropped or Disqualified
                                    </span>
                                </div>
                                <div className="w-full h-full flex items-end justify-start">
                                    <CountUp
                                        from={0}
                                        to={100}
                                        separator=","
                                        direction="up"
                                        duration={1}
                                        className="count-up-text font-poppins text-4xl text-[#292929] font-semibold"
                                    />
                                </div>
                            </div>
                            <div className="w-full h-2/6 border-t border-neutral-300 flex items-center justify-start font-poppins text-[#707070] gap-2 px-2 xl:px-4 text-sm xl:text-base">
                                <span className="font-semibold">Update:</span>
                                <span>January 12, 2025</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full col-span-2 border-neutral-300 border rounded-2xl flex flex-col p-4 xl:p-6 gap-2 relative">
                        <h2 className="font-poppins text-[#292929] text-base xl:text-lg 2xl:text-xl font-">
                            Latest Vacancies
                        </h2>
                        <div className="w-full h-full flex flex-col gap-2 mt-2 2xl:mt-4">
                            <div className="w-full flex items-center justify-between">
                                <h2 className="font-poppins text-[#707070]">
                                    SS Skin
                                </h2>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        value=""
                                    />
                                    <div className="group peer bg-white rounded-full duration-300 w-16 h-8 ring-2 ring-[#707070] after:duration-300 after:bg-[#707070] peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"></div>
                                </label>
                            </div>
                            <h2 className="font-poppins text-xl xl:text-2xl 2xl:text-3xl text-[#292929] font-semibold">
                                Graphic Designer
                            </h2>
                            <div className="py-4 2xl:py-8">
                                <h2 className="font-poppins text-[#707070] ">
                                    Candidates:
                                </h2>
                                <div className="w-full bg-[#f8f8f8] rounded-xl p-6 mt-2">
                                    <div className="w-full grid grid-cols-3 gap-2">
                                        <div className="w-full border-l-2 border-l-primary flex flex-col gap-2 px-2 2xl:px-4 items-start">
                                            <h2 className="font-poppins text-xs xl:text-sm text-[#707070] text-center">
                                                New
                                            </h2>
                                            <h2 className="font-poppins text-2xl text-[#292929] text-center ms-1">
                                                9
                                            </h2>
                                        </div>

                                        <div className="w-full border-l-2 border-l-[#292929] flex flex-col gap-2 px-2 2xl:px-4 items-start">
                                            <h2 className="font-poppins text-xs xl:text-sm text-[#707070] text-center">
                                                Screening
                                            </h2>
                                            <h2 className="font-poppins text-2xl text-[#292929] text-center ms-1">
                                                9
                                            </h2>
                                        </div>

                                        <div className="w-full border-l-2 border-l-[#292929] flex flex-col gap-2 px-2 2xl:px-4 items-start">
                                            <h2 className="font-poppins text-xs xl:text-sm text-[#707070] text-center">
                                                Interview
                                            </h2>
                                            <h2 className="font-poppins text-2xl text-[#292929] text-center ms-1">
                                                9
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-start">
                                <h2 className="font-poppins text-[#707070]">
                                    Deadlines:{" "}
                                </h2>
                                <h2 className="font-poppins text-[#707070] ms-1">
                                    January 12, 2025
                                </h2>
                            </div>
                            <div className="w-full border-t border-neutral-300 absolute bottom-0 p-4 left-0 flex items-center justify-between">
                                <span className="font-poppins text-sm text-[#707070] hover:text-primary transition duration-300 cursor-pointer ease-in-out">
                                    View Details
                                </span>
                                <span className="font-poppins text-sm text-[#707070] hover:text-primary transition duration-300 cursor-pointer ease-in-out">
                                    View More
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full mt-6 xl:mt-8">
                    <div className="border-neutral-300 border rounded-2xl p-4 flex flex-col gap-4">
                        <div className="w-full flex items-center justify-between">
                            <h2 className="text-2xl font-poppins">
                                Candidates
                            </h2>
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="Search name or job title"
                                    prefix={<SearchOutlined />}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    allowClear
                                    className="!rounded-md !w-64"
                                />
                                <Dropdown
                                    menu={{ items: filterMenuItems }}
                                    trigger={["click"]}
                                >
                                    <Button icon={<FilterOutlined />} />
                                </Dropdown>
                                <Button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSortKey(null);
                                        setDepartmentFilter(null);
                                        setStatusFilter(null);
                                    }}
                                >
                                    View All
                                </Button>
                            </div>
                        </div>
                        <Table columns={columns} dataSource={filteredData} />
                    </div>
                </div>
            </section>
        </SidebarLayout>
    );
}
