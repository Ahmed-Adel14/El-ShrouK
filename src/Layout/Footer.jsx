import { FaWhatsapp, FaPhoneAlt, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-[#2a3b8e] to-[#e80a89] text-white py-10 mt-16">
            <div className="container mx-auto px-6 flex flex-col items-center text-center gap-4">
                {/* اللوجو والاسم */}
                <img
                    src="/images/شعار.png"
                    alt="شعار مكتبة الشروق"
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full shadow-lg mb-3 hover:scale-110 transition-transform duration-500"
                />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">مكتبة الشروق</h2>

                {/* الوصف */}
                <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-full sm:max-w-xl md:max-w-2xl leading-relaxed">
                    مكتبة الشروق هي وجهتك الأولى لكل ما يتعلق بالأدوات المكتبية، القرطاسية، والألعاب التعليمية. نقدم لك منتجات عالية الجودة بأسعار تنافسية، تناسب جميع الأعمار والاهتمامات، مع لمسة من
                    الإبداع والمرح لتجعل كل يوم دراسي أكثر تميزًا ومتعة.
                </p>

                {/* أرقام التواصل */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                        <FaWhatsapp className="text-green-400 text-xl" />
                        <span className="text-base">+20 100 456 7890</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaPhoneAlt className="text-white text-xl" />
                        <span className="text-base">02 1234 5678</span>
                    </div>
                </div>

                {/* 👤 صاحب المكتبة */}
                <p className="mt-3 text-sm sm:text-base text-gray-200 font-medium">إشراف: هاني محمد أبو الحمايل</p>

                {/* أيقونات السوشيال */}
                <div className="flex gap-5 mt-6 text-2xl sm:text-3xl">
                    <a href="#" className="hover:text-green-300 transition-colors duration-300">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="hover:text-pink-300 transition-colors duration-300">
                        <FaInstagram />
                    </a>
                    <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                        <FaTiktok />
                    </a>
                </div>

                {/* حقوق النشر */}
                <div className="text-sm sm:text-base text-gray-100 mt-6 opacity-90 border-t border-white/30 pt-4 w-full text-center">
                    © {new Date().getFullYear()} مكتبة الشروق - جميع الحقوق محفوظة.
                </div>
            </div>
        </footer>
    );
}
