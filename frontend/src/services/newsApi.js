export async function fetchNews() {
  const response = await fetch("https://green-sathi.onrender.com/api/news/"); // 👈 trailing slash REQUIRED

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();

  console.log("NEWS API FULL RESPONSE:", data);

  // ✅ RETURN ONLY ARTICLES
  return data.articles;
}
