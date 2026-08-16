import { API_BASE_URL } from "../utils/constants";

export async function fetchNews() {
  const response = await fetch(`${API_BASE_URL}/api/news/`); // 👈 trailing slash REQUIRED

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();

  console.log("NEWS RECEIVED IN UI:", data);

  // ✅ RETURN ONLY ARTICLES
  return data.articles;
}

