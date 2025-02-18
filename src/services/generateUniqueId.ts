import { Advertisement } from "../types/interfaces";
import { getApiResource } from "../utils/network";
import { API_ADVERTISEMENTS } from "../constants/api";

export const fetchAllAdvertisements = async (): Promise<Advertisement[]> => {
  try {
    const data = await getApiResource(API_ADVERTISEMENTS);
    return data || [];
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    return [];
  }
};

export const generateUniqueId = async (): Promise<number> => {
  const advertisements = await fetchAllAdvertisements();
  const existingIds = advertisements.map((ad) => ad.id);

  let newId = 1;
  while (existingIds.includes(newId.toString())) {
    newId++;
  }

  return newId;
};
