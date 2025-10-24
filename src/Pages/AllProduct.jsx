// src/pages/AllProducts.jsx
import { Link } from "react-router-dom";
import { products } from "../Store/Prouduct";
import { useCartStore } from "../Store/cartStore";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AllProducts() {
    const addToCart = useCartStore((state) => state.addToCart);
    const [addedProductId, setAddedProductId] = useState(null);

    // عدد المنتجات المعروضة حاليًا
    const [visibleCount, setVisibleCount] = useState(12);

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedProductId(product.id);

        Swal.fire({
            text: "تمت إضافة المنتج إلى السلة بنجاح 🎉",
            icon: "success",
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            background: "#f0fdf4",
            color: "#166534",
            didOpen: (toast) => {
                toast.style.borderRadius = "12px";
                toast.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
            },
        });

        setTimeout(() => setAddedProductId(null), 3000);
    };

    // تحميل المزيد من المنتجات
    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    return (
        <div className="container mx-auto py-10 px-4">
            {/* العنوان وأزرار التنقل */}
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-[#2a3b8e]">كل المنتجات 🛍️</h2>
                <Link to="/" className="rounded-full border px-[15px] py-[7px] border-[#2a3b8e] text-[#2a3b8e] hover:bg-[#2a3b8e] hover:text-white transition-all duration-300">
                    العودة للرئيسية
                </Link>
            </div>

            {/* شبكة المنتجات */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.slice(0, visibleCount).map((product) => (
                    <div key={product.id} className="bg-white rounded-[10px] shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center overflow-hidden">
                        {/* صورة المنتج */}
                        <Link to={`/product/${product.id}`} className="relative group w-full h-[250px] flex justify-center items-center bg-gray-50 overflow-hidden">
                            <img
                            
                                src={product.image}
                                alt={product.title}
                                className={`w-[180px] h-auto object-contain transition-transform duration-500 ${addedProductId === product.id ? "scale-110" : "group-hover:scale-105"}`}
                            />

                            {/* زر الإضافة إلى السلة */}
                            <div
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToCart(product);
                                }}
                                className={`absolute bottom-[-50px] left-0 w-full text-center py-3 text-sm font-medium transition-all duration-500 group-hover:bottom-0 cursor-pointer ${
                                    addedProductId === product.id ? "bg-green-500 text-white" : "bg-[#2a3b8e] text-white"
                                }`}>
                                {addedProductId === product.id ? "تمت الإضافة" : "إضافة إلى السلة"}
                            </div>
                        </Link>

                        {/* تفاصيل المنتج */}
                        <div className="flex flex-col items-center p-3 w-full">
                            <p dir="rtl" className="text-center text-sm font-medium text-[#2a3b8e] line-clamp-2">
                                {product.title}
                            </p>
                            <p className="text-center text-[15px] mt-1 text-[#e80a89]">السعر: {product.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* زر تحميل المزيد */}
            {visibleCount < products.length && (
                <div className="flex justify-center mt-10">
                    <button onClick={handleLoadMore} className="bg-[#2a3b8e] text-white px-8 py-3 rounded-full hover:bg-[#1d2970] transition-all duration-300">
                        تحميل المزيد 🔽
                    </button>
                </div>
            )}
        </div>
    );
}
