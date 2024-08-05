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

export const usefetchImages = ({ page = 1, perPage = 25, safeSearch = true, editors = true } = {}) => {
  const [data, setData] = useState<ImageDataResponseI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `${apiURL}&safesearch=${safeSearch}&editors_choice=${editors}&page=${page}&per_page=${perPage}`;

        const response = await fetch(url, { method: "GET", mode: "no-cors" });
        if (!response.ok) throw `error: ${await response.json()}`;
        const data: ImageDataResponseI = await response.json();
        setData(data);
      } catch (error: any) {
        setError(`${error}`);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return {
    data,
    loading,
    error,
  };
};
