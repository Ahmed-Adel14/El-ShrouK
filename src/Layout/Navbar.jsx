import NavDropdown from "../components/NavDropdown.jsx";
import { GoSearch } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "../Store/cartStore";
export default function Navbar({ transparent }) {
     const { pathname } = useLocation();
    const isHome = pathname === "/";
    const cartItems = useCartStore((state) => state.cartItems);

    // نحسب العدد الإجمالي حسب quantity لكل منتج
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <div
            className={`${isHome ? "absolute top-0 left-0" : "relative"} 
                        w-full h-[25vh] pt-10 z-50 transition-all duration-300 
                        ${transparent ? "bg-transparent text-white" : "bg-white text-black shadow-sm"}`}>
            <div className="container h-[13vh]">
                <div className="flex items-center h-full">
                    <div className="flex items-center w-[90%] h-full gap-2">
                        {/* اللوجو */}
                        <div className="flex items-center gap-1 h-full w-40">
                            <div className="flex flex-col gap-1 cursor-pointer">
                                <p className="text-[#2a3b8e] text-[20px] font-bold">الشروق</p>
                                <p className="text-[14px] text-[#2a3b8e]">Al Shrouk</p>
                            </div>
                            <Link to={"/"} className="w-15 h-12">
                                <img className="w-full h-full object-cover rounded-[5px] cursor-pointer" src="/images/ChatGPT Image Oct 23, 2025, 11_06_16 AM.png" alt="logo" />
                            </Link>
                        </div>

                        {/* الروابط */}
                        <div className="flex items-center gap-6 flex-wrap h-full w-full font-medium cursor-pointer">
                            <span className="hover:text-[#2a3b8e]">عرض الكل</span>
                            <span className="hover:text-[#2a3b8e]">تخفيضات</span>
                            <NavDropdown
                                title="أدوات قرطاسية"
                                items={["أدوات تنظيم المكتب", "تجاليد وأغلفه كتب", "دفاتر", "ألات حاسبه وأطقم هندسيه", "أوراق", "ممحاة", "شنط لاب توب", "دباسات", "ملفات ودفاتر"]}
                            />
                            <NavDropdown title="أدوات فنية" items={["الألوان", "أدوات الرسم", "أشغال يدوية", "كراسات رسم وتلوين"]} />
                            <NavDropdown title="ألعاب الأطفال" items={["ألعاب حركية", "ألعاب خارجية", "ألعاب رضع", "ألعاب تعليمية", "ألعاب متنوعة"]} />
                            <NavDropdown title="أداوات مدرسية" items={["أدوات الكتابه", "الدفاتر", "أدوات هندسية", "شنط ومقالم"]} />
                            <span className="hover:text-[#2a3b8e]">شخصيتك الكرتونية المفضلة</span>
                            <span className="hover:text-[#2a3b8e]">قطع تركيب</span>
                            <span className="hover:text-[#2a3b8e]">أدوات السفر</span>
                            <span className="hover:text-[#2a3b8e]">هدايا</span>
                            <span className="hover:text-[#2a3b8e]">عروض الصيف</span>
                            <span className="hover:text-[#2a3b8e]">اكسسوارات</span>
                            <span className="hover:text-[#2a3b8e]">منتجات متنوعه</span>
                        </div>
                    </div>

                    {/* الأيقونات */}
                    <div className="flex items-center w-[10%] h-full gap-4">
                        <div className="mr-10 text-[20px] cursor-pointer">
                            <GoSearch />
                        </div>

                        <Link to="/cart" className="relative text-[20px] mr-8 cursor-pointer">
                            <BsCart3 />
                            <span
                                className={`absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold transition-colors duration-300 
        ${totalQuantity === 0 ? "bg-red-500 text-white" : "bg-white text-black border border-gray-300"}`}>
                                {totalQuantity}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
