import { Advertisement } from "../types/interfaces";

export const getApiResource = async (url: string) => {
  try {
    const res: Response = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch. Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getApiOrders = async (url: string) => {
  try {
    const res: Response = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch. Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const createAdvertisement = async (advertisement: Advertisement) => {
  try {
    const res = await fetch("http://localhost:3000/advertisements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(advertisement),
    });

    if (!res.ok) {
      throw new Error(`Could not fetch. Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating advertisement:", error);
    return null;
  }
};

export const updateApiResource = async (url: string, data: object) => {
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

  return response.json();
};
