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
export default function ProductCard({ title, products }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const [addedProductId, setAddedProductId] = useState(null);
  

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
            background: "#f0fdf4", // أخضر فاتح لطيف
            color: "#166534", // لون النص
            didOpen: (toast) => {
                toast.style.borderRadius = "12px";
                toast.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
            },
        });

        // رجّع الزر بعد شوية
        setTimeout(() => setAddedProductId(null), 3000);
    };

    return (
        <div dir="ltr">
            <div className="container">
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
                                <Link to={`/product/${product.id}`} className="relative group h-[35vh] flex justify-center items-center bg-white overflow-hidden rounded-t-[10px]">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={product.image}
                                        className={`w-[180px] h-auto object-contain transition-transform duration-500 ${addedProductId === product.id ? "scale-110" : "group-hover:scale-105"}`}
                                        alt={product.title}
                                    />

                                    <div
                                        onClick={(e) => {
                                            e.preventDefault(); // عشان متتنقلش للصفحة عند الضغط
                                            handleAddToCart(product);
                                        }}
                                        className={`absolute bottom-[-50px] left-0 w-full text-center py-3 text-sm font-medium transition-all duration-500 group-hover:bottom-0 cursor-pointer ${
                                            addedProductId === product.id ? "bg-green-500 text-white" : "bg-[#2a3b8e] text-white"
                                        }`}>
                                        {addedProductId === product.id ? "تمت الإضافة " : "إضافة إلى السلة"}
                                    </div>
                                </Link>

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
            </div>
        </div>
    );
}
