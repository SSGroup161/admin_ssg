"use client";

export default function JobCard() {
    return (
        <>
            <div className="w-full border-neutral-300 border rounded-2xl flex flex-col p-4 xl:p-6 gap-2 relative">
                <div className="w-full h-full flex flex-col gap-2">
                    <div className="w-full flex items-center justify-between">
                        <h2 className="font-poppins text-[#707070]">SS Skin</h2>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                value=""
                            />
                            <div className="group peer bg-white rounded-full duration-300 w-16 h-8 ring-2 ring-[#707070] after:duration-300 after:bg-[#707070] peer-checked:after:bg-primary peer-checked:ring-primary after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"></div>
                        </label>
                    </div>
                    <h2 className="font-poppins text-lg xl:text-xl 2xl:text-2xl text-[#292929] font-semibold">
                        Graphic Designer
                    </h2>
                    <div className="py-4 2xl:py-8">
                        <h2 className="font-poppins text-[#707070] ">
                            Candidates:
                        </h2>
                        <div className="w-full bg-[#f8f8f8] rounded-xl p-4 mt-2">
                            <div className="w-full grid grid-cols-3 gap-2">
                                <div className="w-full border-l-2 border-l-primary flex flex-col gap-2 px-1 2xl:px-2 items-start">
                                    <h2 className="font-poppins text-xs xl:text-sm text-[#707070] text-center">
                                        New
                                    </h2>
                                    <h2 className="font-poppins text-2xl text-[#292929] text-center ms-1">
                                        9
                                    </h2>
                                </div>

                                <div className="w-full border-l-2 border-l-[#292929] flex flex-col gap-2 px-1 2xl:px-2 items-start">
                                    <h2 className="font-poppins text-xs xl:text-sm text-[#707070] text-center">
                                        Screening
                                    </h2>
                                    <h2 className="font-poppins text-2xl text-[#292929] text-center ms-1">
                                        9
                                    </h2>
                                </div>

                                <div className="w-full border-l-2 border-l-[#292929] flex flex-col gap-2 px-1 2xl:px-2 items-start">
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
                </div>
                <div className="w-full border-t border-neutral-300 pt-4 flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M20.9463 12.99C21.1444 11.2006 20.8013 9.39289 19.9613 7.8005C19.1212 6.20812 17.823 4.90428 16.2342 4.05747C14.6454 3.21066 12.8392 2.85981 11.0489 3.05026C9.25863 3.24072 7.56663 3.96373 6.19157 5.12584C4.81651 6.28796 3.82158 7.83577 3.33538 9.56924C2.84918 11.3027 2.89404 13.1422 3.46418 14.8499C4.03431 16.5576 5.10351 18.055 6.5336 19.1487C7.96368 20.2424 9.68891 20.8821 11.4863 20.985M3.60033 9.00004H20.4003M3.60033 15H17.5003"
                                stroke="#707070"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M11.5006 3C9.81599 5.69961 8.92285 8.81787 8.92285 12C8.92285 15.1821 9.81599 18.3004 11.5006 21M12.5006 3C14.732 6.57555 15.5556 10.8525 14.8116 15.001M15.0006 19L17.0006 21L21.0006 17"
                                stroke="#707070"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="text-[#707070] text-sm">
                            Published
                        </span>
                    </div>
                    <span className="font-poppins text-sm text-[#707070] hover:text-primary transition duration-300 cursor-pointer ease-in-out">
                        View Details
                    </span>
                </div>
            </div>
        </>
    );
}
