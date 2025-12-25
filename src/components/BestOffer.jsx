import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../Store/Category";

export default function BestOffer() {
    const [categoriesData, setCategoriesData] = useState([]);

    const offersConfig = [
        { keyWord: "ألعاب", img: "/images/العاب اطفال.webp" },
        { keyWord: "فني", img: "/images/أدوات فنيه.webp" },
        { keyWord: "مدر", img: "/images/أدوات مدرسيهj.webp" },
        { keyWord: "مكتب", img: "/images/أدوات قرطاسيه.webp" },
        { keyWord: "كرتون", img: "/images/شخصيات كرتونيه.webp" },
        { keyWord: "هدايا", img: "/images/هدايا.webp" },
        { keyWord: "سفر", img: "/images/ادوات السفر.webp" },
        { keyWord: "تركيب", img: "/images/قطع تركيب.webp" },
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();

                const mappedCategories = offersConfig
                    .map((offer) => {
                        const category = data.find((cat) => cat.name.includes(offer.keyWord));
                        if (category) {
                            return { ...category, img: offer.img };
                        }
                        return null;
                    })
                    .filter(Boolean); // نحذف أي null

                setCategoriesData(mappedCategories);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategories();
    }, []);

    if (categoriesData.length === 0) return null;

    return (
        <div dir="ltr" className="container py-10">
            <div className="grid grid-cols-4 gap-4">
                {categoriesData.map((cat) => (
                    <div key={cat.id} className="overflow-hidden cursor-pointer">
                        <Link to={`/productbycat/${cat.documentId}`}>
                            <img src={cat.img} alt={cat.name} className="w-full h-full object-cover hover:scale-105 transition" />
                            <p className="text-center mt-2 font-medium text-[#2a3b8e]">{cat.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
