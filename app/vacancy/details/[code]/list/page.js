"use client";
import SidebarLayout from "../../../../../src/components/SidebarLayout";
import { useRouter, useParams } from "next/navigation";
import { Space, Table, Tag, Input, Button, Dropdown } from "antd";
import { useState } from "react";

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

export default function List() {
    const router = useRouter();
    const params = useParams();
    const code = params.code;

    const handleBack = () => {
        router.push("/vacancy/details/" + code);
    };

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
                    <h2 className="text-[#707070]">Back to Edit Vacancy</h2>
                </div>
                <h1 className="text-4xl font-semibold ps-4">{code}</h1>
                <h2 className="text-2xl mb-6 text-[#707070] mt-2 ps-4">
                    List Candidate
                </h2>
                <div className="border-neutral-300 border rounded-2xl p-4 flex flex-col gap-4 ps-4">
                    <Table columns={columns} dataSource={filteredData} />
                </div>
            </section>
        </SidebarLayout>
    );
}
