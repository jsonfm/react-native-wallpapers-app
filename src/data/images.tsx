import { Config } from "@/core/config";
import { useEffect, useState } from "react";

export interface ImageDataI {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

export interface ImageDataResponseI {
  total: number;
  totalHits: number;
  hits: ImageDataI[];
}

const apiURL = `${Config.PIXABAY_API_URL}?key=${Config.PIXABAY_API_KEY}`;

export const usefetchImages = ({
  page = 1,
  perPage = 25,
  safeSearch = true,
  editors = true,
  q = "",
  category = "",
} = {}) => {
  const [data, setData] = useState<ImageDataResponseI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = {
          "Content-Type": "application/json",
          Accept: "*/*",
          "X-Requested-With": "XMLHttpRequest",
        };
        const url = `${apiURL}&safesearch=${safeSearch}&editors_choice=${editors}&page=${page}&per_page=${perPage}${
          q.length > 0 ? `&q=${q}` : ""
        }${category.length > 0 ? `&category=${category}` : ""}`;

        const data = await fetch(url, {
          method: "GET",
          headers,
        }).then((res) => res.json());

        setData(data);
      } catch (error: any) {
        console.log({ error });
        setError(`${error}`);
      }
      setLoading(false);
    };
    fetchData();
    // setTimeout(() => , 4000);g
  }, [page, q, category]);
  return {
    data,
    loading,
    error,
  };
};
