import { useCartStore } from "../store/cartStore";


export default function Cart() {
    const { cartItems, removeFromCart, clearCart, updateQuantity } = useCartStore();

     const total = cartItems.reduce((sum, item) => sum + Number(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity, 0);

    return (
        <div className="container mx-auto p-8 min-h-[80vh]">
            <h2 className="text-3xl font-bold mb-8 text-[#2a3b8e]">🛒 سلة المشتريات</h2>

            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 gap-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2L17 13M7 13L5.4 5M17 13l1.6-8M9 21h6" />
                    </svg>
                    <p className="text-xl text-gray-500">السلة فارغة 😅</p>
                    <a href="/" className="mt-4 bg-[#2a3b8e] text-white px-6 py-3 rounded-xl hover:bg-[#1d2970] transition-all">
                        العودة للرئيسية
                    </a>
                </div>
            ) : (
                <>
                    <div className="space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col md:flex-row items-center md:items-start gap-4 border-b pb-6 shadow-sm p-4 rounded-xl hover:shadow-lg transition-shadow bg-white">
                                {/* الصورة */}
                                <img src={item.image} alt={item.title} className="w-full md:w-48 h-48  rounded-xl border" />

                                {/* الوصف والسعر */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <h3 className="text-xl font-semibold text-[#2a3b8e]">{item.title}</h3>
                                    <p className="text-gray-700 mt-2 text-lg">
                                        السعر: <span className="text-[#e80a89] font-bold">{item.price}</span> × {item.quantity}
                                    </p>
                                    {/* تعديل الكمية */}
                                    <div className="flex items-center gap-2 mt-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity === 1}
                                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
                                            -
                                        </button>
                                        <span className="px-3 py-1 bg-gray-100 rounded">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* زر الإزالة */}
                                <button onClick={() => removeFromCart(item.id)} className="mt-4 md:mt-0 bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition-all">
                                    إزالة
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* الإجمالي وزر مسح السلة */}
                    <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-2xl font-bold text-[#2a3b8e]">الإجمالي: {total} ج.م</p>
                        <button onClick={clearCart} className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all">
                            مسح السلة
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
