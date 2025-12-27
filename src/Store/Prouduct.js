const STRAPI_URL = "http://localhost:1337";

export const fetchProducts = async (page = 1, pageSize = 20) => {
    try {
        const response = await fetch(`${STRAPI_URL}/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);

        const data = await response.json();

        const products = data.data.map((item) => ({
            id: item.id,
            documentId: item.documentId,
            title: item.name || item.title,
            name: item.name,
            slug: item.slug,
            price: `${item.price} جنيه`,
            description: extractDescription(item.description),
            image: item.main_image?.url ? `${STRAPI_URL}${item.main_image.url}` : "/placeholder-image.jpg",
            gallery: item.gallery?.map((img) => `${STRAPI_URL}${img.url}`) || [],
            category: extractCategory(item.categories),
            categories: item.categories || [],
            in_stock: item.in_stock !== false,
        }));

        return {
            products,
            pagination: data.meta.pagination,
        };
    } catch (error) {
        console.error("خطأ في جلب المنتجات:", error);
        return {
            products: [],
            pagination: null,
        };
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${STRAPI_URL}/api/products/${id}?populate=*`);
        if (!response.ok) throw new Error("فشل في جلب المنتج");

        const data = await response.json();
        const item = data.data;

        return {
            id: item.id,
            documentId: item.documentId,
            title: item.name || item.title,
            name: item.name,
            slug: item.slug,
            price: `${item.price} جنيه`,
            description: extractDescription(item.description),
            image: item.main_image?.url ? `${STRAPI_URL}${item.main_image.url}` : "/placeholder-image.jpg",
            gallery: item.gallery?.map((img) => `${STRAPI_URL}${img.url}`) || [],
            category: extractCategory(item.categories),
            categories: item.categories || [],
            in_stock: item.in_stock !== false,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        };
    } catch (error) {
        console.error("خطأ في جلب المنتج:", error);
        return null;
    }
};

function extractDescription(descriptionArray) {
    if (!descriptionArray || !Array.isArray(descriptionArray)) return "لا يوجد وصف متاح";

    return descriptionArray
        .map((block) => {
            if (block.type === "paragraph" && block.children) {
                return block.children.map((child) => child.text || "").join(" ");
            }
            return "";
        })
        .filter((text) => text.trim())
        .join("\n\n");
}

/**
 * ⭐ هنا الإصلاح الحقيقي
 */
function extractCategory(categories) {
    if (!categories || categories.length === 0) return "others";

    const catName = categories[0].name?.trim();

 

    if (catName === "اكسسوارات") return "bestsell";
    if (catName === "ألعاب الأطفال") return "kidsGames";
    if (catName === "أداوات مدرسية") return "schoolTools";
    if (catName === "شخصيتك الكرتونية المفضلة") return "cartoon";
    if (catName === "عروض الصيف") return "bestOffer";
    

    return "others";
}

export const filterProductsByCategory = (products, category) => {
    return products.filter((p) => p.category === category);
};

export const filterInStockProducts = (products) => {
    return products.filter((p) => p.in_stock);
};
export const fetchProductBySlug = async (slug) => {
    try {
        const response = await fetch(`${STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`);

        if (!response.ok) throw new Error("فشل في جلب المنتج بالـ slug");

        const data = await response.json();

        if (!data.data || data.data.length === 0) return null;

        const item = data.data[0];

        return {
            id: item.id,
            documentId: item.documentId,
            title: item.name || item.title,
            name: item.name,
            slug: item.slug,
            price: `${item.price} جنيه`,
            description: extractDescription(item.description),
            image: item.main_image?.url ? `${STRAPI_URL}${item.main_image.url}` : "/placeholder-image.jpg",
            gallery: item.gallery?.map((img) => `${STRAPI_URL}${img.url}`) || [],
            category: extractCategory(item.categories),
            categories: item.categories || [],
            in_stock: item.in_stock !== false,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        };
    } catch (error) {
        console.error("خطأ في جلب المنتج بالـ slug:", error);
        return null;
    }
};
// ززززززززززززز
