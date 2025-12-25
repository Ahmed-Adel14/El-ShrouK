import axios from "axios";

export const getCategories = async () => {
    try {
        const res = await axios.get("http://localhost:1337/api/categories", {
            params: {
                populate: "*",
            },
        });
        console.log(res.data.data);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
