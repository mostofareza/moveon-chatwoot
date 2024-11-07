import { useState } from "react";
import {StatusWithColors} from "@/types/types.ts";

const useGetStatusWithColor = () => {
  const [statusWithColors, setStatusWithColors] = useState<StatusWithColors>({}); // StatusWithColors is a custom type
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const baseURL = import.meta.env.VITE_API_URL;

  const getStatusColor = () => {
    const localData = localStorage.getItem('statusWithColors');
    // Check if data exists in localStorage
    if (localData) {
      const parsedData = JSON.parse(localData);
      if (parsedData) {
        setStatusWithColors(parsedData);
        return;
      }
    }

    // If not in local storage, fetch from API
    setIsLoading(true);
    const url = new URL(`${baseURL}/public/v1/system/labels?models=order,parcel,cart,transaction`);

    fetch(url.toString())
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.message ?? "API Request failed.");
        }
        return json.models;  // Extract models from API response
      })
      .then((data) => {
        const statusColors = data || {};
        setStatusWithColors(statusColors);

        // Save the data to localStorage
        localStorage.setItem('statusWithColors', JSON.stringify(statusColors));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { getStatusColor, statusWithColors, isLoading };
};

export default useGetStatusWithColor;
