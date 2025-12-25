import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById, fetchProducts } from "../Store/Prouduct";
import { useCartStore } from "../Store/cartStore";
import Swal from "sweetalert2";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
    const [openImage, setOpenImage] = useState(false);
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const { id } = useParams();
    const { addToCart } = useCartStore();

    useEffect(() => {
        const getData = async () => {
            // المنتج الأساسي
            const singleProduct = await fetchProductById(id);
            setProduct(singleProduct);

            // منتجات مقترحة (عدد صغير)
            const res = await fetchProducts(1, 20);
            setProducts(res.products);
        };

        getData();
    }, [id]);

    const bestOffers = products.filter((p) => p.category === "bestOffer");

    if (!product) return <p className="text-center mt-20 text-xl text-gray-600">المنتج غير موجود 😅</p>;

    const handleAddToCart = () => {
        addToCart(product);

        Swal.fire({
            text: "تمت إضافة المنتج إلى سلة المشتريات.",
            icon: "success",
            showConfirmButton: false,
            timer: 1800,
            background: "#f9fafb",
            color: "#1f2937",
            toast: true,
            position: "top-start",
            timerProgressBar: true,
        });
    };

    return (
        <>
            <div className="container mx-auto p-10 flex flex-col md:flex-row gap-10 items-center justify-center min-h-[80vh]">
                <div
                    className="flex-1 flex justify-center items-center rounded-2xl shadow-lg transition-all duration-300"
                    style={{
                        background: "#FFFFFF",
                        width: "400px",
                        height: "400px",
                        padding: "20px",
                        cursor: "zoom-in",
                    }}>
                    <img src={product.image} alt={product.title} className="w-[300px] h-[300px] object-contain cursor-pointer" onClick={() => setOpenImage(true)} />
                </div>

                {openImage && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setOpenImage(false)}>
                        <div className="bg-white p-4 rounded-xl shadow-xl max-w-[90%] max-h-[90%]" onClick={(e) => e.stopPropagation()}>
                            <img src={product.image} alt={product.title} className="max-w-full max-h-[80vh] object-contain rounded-lg" />
                        </div>
                    </div>
                )}

                {/* التفاصيل */}
                <div className="flex-1 space-y-6">
                    <h2 className="text-3xl font-bold text-[#2a3b8e]">{product.title}</h2>
                    <p className="text-2xl text-[#e80a89] font-semibold">{product.price}</p>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>

                    <button onClick={handleAddToCart} className="bg-[#2a3b8e] text-white px-8 py-3 rounded-xl hover:bg-[#1d2970] transition-all duration-300">
                        أضف إلى السلة 🛒
                    </button>
                </div>
            </div>

            <div className="mt-6">
                <ProductCard title="منتجات قد تعجبك" products={bestOffers} />
            </div>
        </>
    );
}
