import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useCartStore } from "../Store/cartStore";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const STRAPI_URL = "http://localhost:1337";

function ProductsByCat() {
    const { id } = useParams(); // هنا id = documentId
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [previewProduct, setPreviewProduct] = useState(null);
    const [addedProductId, setAddedProductId] = useState(null);

    const addToCart = useCartStore((state) => state.addToCart);

    const getCategoryWithProducts = async () => {
        try {
            // جلب كل categories عشان نلاقي اللي documentId يساوي id
            const res = await axios.get(`${STRAPI_URL}/api/categories`, {
                params: {
                    populate: { products: { populate: "*" } },
                },
            });

            const allCategories = res.data.data;
            const cat = allCategories.find((c) => c.documentId === id);

            if (!cat) {
                setCategory(null);
                setProducts([]);
                return;
            }

            const formattedProducts = cat.products.map((item) => ({
                id: item.id,
                documentId: item.documentId,
                title: item.name,
                slug: item.slug,
                price: `${item.price} جنيه`,
                description:
                    item.description?.map((b) => b.children?.map((c) => c.text).join(" ")).join("\n\n") ||
                    "لا يوجد وصف",
                image: item.main_image?.url ? `${STRAPI_URL}${item.main_image.url}` : "/placeholder-image.jpg",
            }));

            setCategory(cat);
            setProducts(formattedProducts);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedProductId(product.id);
        Swal.fire({
            text: "تمت إضافة المنتج إلى السلة",
            icon: "success",
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 2000,
        });
        setTimeout(() => setAddedProductId(null), 3000);
    };

    useEffect(() => {
        getCategoryWithProducts();
    }, [id]);

    if (!category) return <p className="container mt-10">Loading...</p>;

    return (
        <div className="container mt-10">
            <h2 className="text-2xl font-bold text-[#2a3b8e] mb-6 text-center">{category.name}</h2>

            {products.length === 0 ? (
                <p className="text-center">لا يوجد منتجات في هذا القسم</p>
            ) : (
                <div className="grid grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Link key={product.id} to={`/product/${product.slug}`}>
                            <div className="w-[280px] mx-auto rounded-[10px] flex flex-col gap-4 mt-6 cursor-pointer">
                                <div className="relative group h-[35vh] flex justify-center items-center bg-white overflow-hidden rounded-t-[10px]">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={product.image}
                                        className={`w-[180px] h-auto object-contain transition-transform duration-500 ${addedProductId === product.id ? "scale-110" : "group-hover:scale-105"}`}
                                        alt={product.title}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-start pl-2 z-20">
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setPreviewProduct(product);
                                            }}
                                            className="h-10 w-10 text-[#373a8b] rounded-full p-2 bg-[#e5e7eb] transform -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:bg-[#373a8b] hover:text-white flex items-center justify-center">
                                            <GrView className="text-xl" />
                                        </div>
                                    </div>

                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            handleAddToCart(product);
                                        }}
                                        className="absolute bottom-0 left-0 w-full text-center py-3 text-sm font-medium transition-all duration-500 cursor-pointer overflow-hidden bg-neutral-400 text-white z-20">
                                        <div className="absolute inset-0 bg-[#373a8b] translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                                        <span className="relative z-10">{addedProductId === product.id ? "تمت الإضافة " : "إضافة إلى السلة"}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col w-full p-2">
                                    <p dir="rtl" className="text-center text-sm font-medium text-[#2a3b8e] line-clamp-2">
                                        {product.title}
                                    </p>
                                    <p className="text-center text-[15px] mt-1 text-[#e80a89]">السعر: {product.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {previewProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                        onClick={() => setPreviewProduct(null)}>
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="bg-white rounded-2xl shadow-2xl 
                           w-full max-w-5xl h-[520px] 
                           flex overflow-hidden md:flex-row-reverse"
                            onClick={(e) => e.stopPropagation()}>
                            {/* Image */}
                            <motion.div
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex-1 bg-gray-100 flex items-center justify-center p-6">
                                <img src={previewProduct.image} alt={previewProduct.title} className="max-h-full max-w-full object-contain drop-shadow-lg" />
                            </motion.div>

                            {/* Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15, duration: 0.5 }}
                                className="flex-1 p-8 flex flex-col justify-between overflow-auto">
                                <div>
                                    <h2 className="text-3xl font-bold text-[#2a3b8e] leading-snug">{previewProduct.title}</h2>

                                    <p className="text-2xl text-[#e80a89] font-semibold mt-3">{previewProduct.price}</p>

                                    <p className="text-gray-600 mt-5 leading-relaxed">{previewProduct.description}</p>
                                </div>

                                <button
                                    onClick={() => handleAddToCart(previewProduct)}
                                    className="mt-8 w-full bg-[#2a3b8e] text-white 
                                   py-4 rounded-xl text-lg font-medium
                                   hover:bg-[#1d2970] transition-all duration-300">
                                    أضف إلى السلة 🛒
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ProductsByCat;
// خخخخخخخخخخخخخخخخخ