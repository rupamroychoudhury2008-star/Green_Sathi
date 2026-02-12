import { API_BASE_URL } from "../utils/constants";

export async function predictCropDisease(formData) {
  const payload = new FormData();

  payload.append("state", formData.state);
  payload.append("district", formData.district);
  payload.append("language", formData.language);
  payload.append("image", formData.image);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    body: payload,
  });

  const data = await response.json();

  if (!response.ok) {
    if (Array.isArray(data.detail)) {
      const messages = data.detail.map(
        (err) => `${err.loc.join(" → ")}: ${err.msg}`
      );
      throw new Error(messages.join(", "));
    }
    throw new Error(data.detail || "Prediction failed");
  }

  return data;
}
