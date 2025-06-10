import axiosInstance from "../utils/axiosInstance";


export const createShortUrl = async (url, slug) => {
    const { data } = await axiosInstance.post("/api/create", { url, slug });
    return data.shortUrl;
}

export const getUserUrls = async () => {
    const { data } = await axiosInstance.get("/api/user/urls");
    // console.log(data);
    return data.urls;
}