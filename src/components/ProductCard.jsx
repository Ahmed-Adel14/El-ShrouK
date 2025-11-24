import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useCartStore } from "../Store/cartStore";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion, AnimatePresence } from "framer-motion"; // ← Framer Motion

export default function ProductCard({ title, products }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const [addedProductId, setAddedProductId] = useState(null);
    const [previewProduct, setPreviewProduct] = useState(null);

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedProductId(product.id);
        Swal.fire({
            text: "تمت إضافة المنتج إلى السلة بنجاح ",
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

    return (
        <div dir="ltr">
            <div className="container">
                {/* Swiper Header */}
                <div className="flex items-center justify-between mt-10">
                    <div className="flex items-center gap-4">
                        <span className="text-2xl cursor-pointer swiper-button-prev-custom">
                            <MdKeyboardArrowLeft />
                        </span>
                        <span className="text-2xl cursor-pointer swiper-button-next-custom">
                            <MdKeyboardArrowRight />
                        </span>
                        <Link to="/all-products" className="ml-5 rounded-full border px-[10px] py-[5px] border-[#2a3b8e] text-[#2a3b8e] cursor-pointer">
                            عرض الكل
                        </Link>
                    </div>
                    <h2 className="text-2xl font-bold text-[#2a3b8e]">{title}</h2>
                </div>

                {/* Swiper */}
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: ".swiper-button-next-custom",
                        prevEl: ".swiper-button-prev-custom",
                    }}
                    spaceBetween={20}
                    slidesPerView={4.5}
                    grabCursor={true}>
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="w-[280px] mx-auto rounded-[10px] flex flex-col gap-4 mt-6">
                                <div className="relative group h-[35vh] flex justify-center items-center bg-white overflow-hidden rounded-t-[10px]">
                                    {/* صورة المنتج */}
                                    <LazyLoadImage
                                        effect="blur"
                                        src={product.image}
                                        className={`w-[180px] h-auto object-contain transition-transform duration-500 ${addedProductId === product.id ? "scale-110" : "group-hover:scale-105"}`}
                                        alt={product.title}
                                    />

                                    {/* أيقونة العين */}
                                    <div className="absolute inset-0 flex items-center justify-start pl-2 pointer-events-auto">
                                        <svg
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setPreviewProduct(product);
                                            }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-10 w-10 text-white bg-black/50 rounded-full p-2
                                           transform -translate-x-10 opacity-0
                                           group-hover:translate-x-0 group-hover:opacity-100
                                           transition-all duration-300 cursor-pointer"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </div>

                                    {/* زر الإضافة */}
                                    <div
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleAddToCart(product);
                                        }}
                                        className={`absolute bottom-[-50px] left-0 w-full text-center py-3 text-sm font-medium transition-all duration-500 group-hover:bottom-0 cursor-pointer ${
                                            addedProductId === product.id ? "bg-green-500 text-white" : "bg-[#2a3b8e] text-white"
                                        }`}>
                                        {addedProductId === product.id ? "تمت الإضافة " : "إضافة إلى السلة"}
                                    </div>
                                </div>

                                {/* عنوان المنتج والسعر */}
                                <div className="flex flex-col w-full p-2">
                                    <p dir="rtl" className="text-center text-sm font-medium text-[#2a3b8e] line-clamp-2">
                                        {product.title}
                                    </p>
                                    <p className="text-center text-[15px] mt-1 text-[#e80a89]">السعر: {product.price}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* البوب اب مع Framer Motion */}
                <AnimatePresence>
                    {previewProduct && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
                            onClick={() => setPreviewProduct(null)}>
                            <motion.div
                                style={{ width: "700px", height: "400px" }} // ثبّت الطول كمان
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="bg-white rounded-xl shadow-xl flex overflow-hidden md:flex-row-reverse"
                                onClick={(e) => e.stopPropagation()}>
                                {/* الصورة على اليمين */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex-1 p-4 flex items-center justify-center bg-gray-100 h-full">
                                    <img src={previewProduct.image} alt={previewProduct.title} className="max-w-full max-h-full object-contain" />
                                </motion.div>

                                {/* التفاصيل على الشمال */}
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
                                    className="flex-1 p-6 flex flex-col justify-between h-full overflow-auto">
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#2a3b8e]">{previewProduct.title}</h2>
                                        <p className="text-xl text-[#e80a89] font-semibold mt-2">{previewProduct.price}</p>
                                        <p className="text-gray-600 mt-4">{previewProduct.description}</p>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(previewProduct)}
                                        className="cursor-pointer mt-6 bg-[#2a3b8e] text-white px-8 py-3 rounded-xl hover:bg-[#1d2970] transition-all duration-300">
                                        أضف إلى السلة 🛒
                                    </button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
