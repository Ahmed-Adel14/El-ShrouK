import { FaWhatsapp, FaPhoneAlt, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#f8f8f8] text-gray-800 py-12 mt-20 shadow-inner border-t border-gray-300">
            <div className="container mx-auto px-6 flex flex-col items-center text-center gap-6">
                {/* اللوجو */}
                <img
                    src="/images/شعار.png"
                    alt="شعار مكتبة الشروق"
                    className="w-28 h-28 md:w-36 md:h-36 rounded-2xl shadow-xl mb-3 border-4 border-white hover:rotate-3 hover:scale-105 transition-all duration-500"
                />

                {/* اسم المكتبة */}
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-[#ff6b35] drop-shadow-sm">مكتبة الشروق</h2>

                {/* الوصف */}
                <p className="text-base md:text-lg max-w-2xl leading-loose text-gray-600">
                    نوفر لك أفضل أدوات المدرسة، القرطاسية، الألعاب التعليمية، والهدايا المميزة. هدفنا تقديم تجربة تسوّق ممتعة تجمع بين الجودة، السعر المناسب، ولمسة الإبداع.
                </p>

                {/* تواصل */}
                <div className="flex flex-col sm:flex-row items-center gap-5 mt-4">
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all">
                        <FaWhatsapp className="text-green-500 text-2xl" />
                        <span className="text-base font-medium">+20 100 456 7890</span>
                    </div>

                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all">
                        <FaPhoneAlt className="text-blue-500 text-2xl" />
                        <span className="text-base font-medium">02 1234 5678 </span>
                    </div>
                </div>

                {/* صاحب المكتبة */}
                <p className="mt-3 text-sm md:text-base text-gray-700 font-semibold bg-white px-4 py-1 rounded-lg shadow-sm">إشراف: هاني محمد أبو الحمايل</p>

                {/* سوشيال */}
                <div className="flex gap-6 mt-6 text-3xl">
                    <a href="#" className="p-3 bg-white rounded-full shadow-md hover:scale-110 transition-transform">
                        <FaFacebookF className="text-blue-600" />
                    </a>
                    <a href="#" className="p-3 bg-white rounded-full shadow-md hover:scale-110 transition-transform">
                        <FaInstagram className="text-pink-500" />
                    </a>
                    <a href="#" className="p-3 bg-white rounded-full shadow-md hover:scale-110 transition-transform">
                        <FaTiktok className="text-black" />
                    </a>
                </div>

                {/* حقوق النشر */}
                <div className="text-sm md:text-base text-gray-600 mt-8 border-t border-gray-300 pt-4 w-full">© {new Date().getFullYear()} مكتبة الشروق - جميع الحقوق محفوظة.</div>
            </div>
        </footer>
    );
}
