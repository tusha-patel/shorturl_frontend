import axiosInstance from "../utils/axiosInstance";

// create short url
export const createShortUrl = async (url, slug) => {
    const { data } = await axiosInstance.post("/api/create", { url, slug });
    return data.shortUrl;
}

// get user all urls
export const getUserUrls = async () => {
    const { data } = await axiosInstance.get("/api/user/urls");
    return data.urls;
}