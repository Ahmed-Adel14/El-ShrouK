
export default function BestOffer() {
    const offers = [
        {
            id: 1,
            image: "/public/images/العاب اطفال.webp",
        },
        {
            id: 2,
            image: "/public/images/أدوات فنيه.webp",
        },
        {
            id: 3,
            image: "/public/images/أدوات مدرسيهj.webp",
        },
        {
            id: 4,
            image: "/public/images/أدوات قرطاسيه.webp",
        },
        {
            id: 5,
            image: "/public/images/شخصيات كرتونيه.webp",
        },
        {
            id: 6,
            image: "/public/images/هدايا.webp",
        },
        {
            id: 7,
            image: "/public/images/ادوات السفر.webp",
        },
        {
            id: 8,
            image: "/public/images/قطع تركيب.webp",
        },
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
