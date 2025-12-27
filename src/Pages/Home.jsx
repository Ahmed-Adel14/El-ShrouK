import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useEffect, useState } from "react";
import { fetchProducts } from "../Store/Prouduct";

import ProductCard from "../components/ProductCard";
import BestOffer from "../components/BestOffer";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const res = await fetchProducts(1, 200);
            setProducts(res.products);
        };
        getProducts();
    }, []);

    // تصفية المنتجات حسب الفئات
    const bestsells = products.filter((p) => p.category === "bestsell");
    const kidsGames = products.filter((p) => p.category === "kidsGames");
    const schoolTools = products.filter((p) => p.category === "schoolTools");

    return (
        <>
            <div className="relative">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="w-full h-[100vh]">
                    <SwiperSlide>
                        <img src="/images/school-tools-with-calculator.jpg" className="w-full h-[100vh] object-cover" alt="slide 1" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/premium_photo-1663957835183-a11d378f63b8.jpeg" className="w-full h-[100vh] object-cover" alt="slide 2" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/premium_photo-1663127374925-56558b81cd38.jpeg" className="w-full h-[100vh] object-cover" alt="slide 3" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/خصم.webp" className="w-full h-[100vh] object-cover" alt="slide 4" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/omar.jpg" className="w-full h-[100vh] object-contain" alt="slide 5" />
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className="mt-6">
                <ProductCard title="ألعاب الأطفال" products={kidsGames} categorySlug="kidsGames" />
            </div>

            <div className="mt-12">
                <BestOffer />
            </div>

            <div className="mt-6">
                <ProductCard title="اكسسوارات" products={bestsells} categorySlug={bestsells[0]?.categories[0]?.slug || "others"} />
            </div>

            <div className="container">
                <div className="mt-10">
                    <div className="w-full h-[70vh]">
                        <img src="/images/بوستر1.webp" alt="" />
                    </div>
                </div>

                <div className="mt-50 mb-20">
                    <div className="w-full h-[70vh]">
                        <img src="/images/بوستر2.webp" alt="" />
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <ProductCard title="أدوات مدرسية" products={schoolTools} categorySlug="schoolTools" />
            </div>

            <div dir="ltr" className="container flex mt-10">
                <div className="w-[500px] h-[300px] flex flex-col items-center justify-center mx-auto gap-1.5 transition-all duration-500 transform hover:scale-105 hover:border-[3px] hover:border-[#2a3b8e] rounded-2xl">
                    <img src="/images/logo1.webp" alt="شعار" className="h-[10rem] w-[150px]" />
                    <h3 className="text-[#2a3b8e] text-[25px] font-bold">أسعار تنافسية</h3>
                    <p className="text-[#e80a89] text-[20px] font-medium">بأعلى جودة</p>
                </div>

                <div className="w-[500px] h-[300px] flex flex-col items-center justify-center mx-auto gap-1.5 transition-all duration-500 transform hover:scale-105 hover:border-[3px] hover:border-[#2a3b8e] rounded-2xl">
                    <img src="/images/logo2.webp" alt="شعار" className="h-[10rem] w-[150px]" />
                    <h3 className="text-[#2a3b8e] text-[25px] font-bold">تنوع المنتجات</h3>
                    <p className="text-[#e80a89] text-[20px] font-medium">+500</p>
                </div>
            </div>

            <footer />
        </>
    );
}
// ززززززززززززززززز