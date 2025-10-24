import { useParams } from "react-router-dom";
import { products } from "../Store/Prouduct"
import { useCartStore } from "../Store/cartStore";
import Swal from "sweetalert2";
import ProductCard from "../components/ProductCard";
export default function ProductDetails() {
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));

    const { addToCart } = useCartStore();
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
                {/* الصورة */}
                <div className="flex-1 flex justify-center">
                    <img  src={product.image} alt={product.title} className="w-[300px] h-[300px]  rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300" />
                </div>

                {/* التفاصيل */}
                <div className="flex-1 space-y-6">
                    <h2 className="text-3xl font-bold text-[#2a3b8e]">{product.title}</h2>
                    <p className="text-2xl text-[#e80a89] font-semibold">{product.price}</p>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>

                    <button onClick={handleAddToCart} className="cursor-pointer bg-[#2a3b8e] text-white px-8 py-3 rounded-xl hover:bg-[#1d2970] transition-all duration-300">
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
