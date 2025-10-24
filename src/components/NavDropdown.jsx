import { IoIosArrowDown } from "react-icons/io";

export default function NavDropdown({ title, items = [] }) {
    return (
        <div className="group relative flex items-center gap-1 cursor-pointer select-none">
            <span className="hover:text-[#2a3b8e]">{title}</span>
            <span className="transition-transform duration-200 group-hover:-rotate-180 text-[14px] text-gray-400">
                <IoIosArrowDown />
            </span>

            {/* البوكس */}
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block ">
                <div className="bg-white text-black shadow-lg rounded-md border border-gray-100 p-3 w-60 z-[9999]">
                    <ul className="text-sm space-y-2">
                        {items.map((item, i) => (
                            <li key={i}>
                                <a href="#" className="block px-2 py-1 hover:bg-gray-50 rounded hover:text-[#2a3b8e]">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
