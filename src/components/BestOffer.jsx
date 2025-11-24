
export default function BestOffer() {
    const offers = [
        { id: 1, image: "/images/العاب اطفال.webp" },
        { id: 2, image: "/images/أدوات فنيه.webp" },
        { id: 3, image: "/images/أدوات مدرسيهj.webp" },
        { id: 4, image: "/images/أدوات قرطاسيه.webp" },
        { id: 5, image: "/images/شخصيات كرتونيه.webp" },
        { id: 6, image: "/images/هدايا.webp" },
        { id: 7, image: "/images/ادوات السفر.webp" },
        { id: 8, image: "/images/قطع تركيب.webp" },
    ];

  return (
      <div dir="ltr" className="container">
          <div className="grid grid-cols-4 gap-4 ">
              {offers.map((offer) => (
                  <div key={offer.id} className=" overflow-hidden">
                      <img src={offer.image} alt="صورة عرض" className="w-full h-full object-cover transform transition duration-300 hover:scale-105 cursor-pointer"  />
                  </div>
              ))}
          </div>
      </div>
  );
}
