import { Advertisement } from "../types/interfaces";

export const getApiResource = async (url: string): Promise<any | null> => {
  try {
    const res: Response = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getApiOrders = async (
  url: string,
  status?: string,
  sort?: string
): Promise<any | null> => {
  try {
    const params = new URLSearchParams();
    if (status) params.append("_status", status);
    if (sort) params.append("_sort", sort);

    const apiUrl = `${url}?${params.toString()}`;
    const res: Response = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`Could not fetch. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const createAdvertisement = async (
  url: string,
  advertisement: Advertisement
): Promise<any | null> => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(advertisement),
    });

    if (!res.ok) {
      throw new Error(`Could not fetch. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating advertisement:", error);
    return null;
  }
};

export const updateApiResource = async (
  url: string,
  data: object
): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Не удалось обновить ресурс");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating resource:", error);
    throw error;
  }
};
