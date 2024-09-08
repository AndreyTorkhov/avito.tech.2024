import { Advertisment } from "../types/interfaces";

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

export const createAdvertisement = async (advertisement: Advertisment) => {
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
