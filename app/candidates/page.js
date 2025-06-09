"use client";

import SidebarLayout from "../../src/components/SidebarLayout";
import { Space, Table, Tag, Input, Button, Dropdown } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
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

export default function Candidates() {
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
            <section className="w-full h-full">
                <h1 className="font-poppins text-4xl mb-4">Candidates</h1>
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
