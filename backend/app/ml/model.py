import numpy as np
import tensorflow as tf
from PIL import Image
import io

from app.ml.labels import CLASS_NAMES

# Load TFLite model ONCE
interpreter = tf.lite.Interpreter(
    model_path="app/ml/plant_disease_19class.tflite"
)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()


def preprocess_image(image_bytes: bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))   # ⚠️ must match training
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0).astype(np.float32)
    return img_array


def predict_disease(image_bytes: bytes) -> dict:
    try:
        input_data = preprocess_image(image_bytes)

        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()

        output = interpreter.get_tensor(output_details[0]['index'])[0]
        predicted_index = int(np.argmax(output))
        confidence = float(np.max(output))

        class_name = CLASS_NAMES[predicted_index]

        crop, disease = class_name.split("___")

        return {
            "crop": crop,
            "disease": disease.replace("_", " "),
            "confidence": round(confidence * 100, 2),
            "severity": (
                "High" if confidence > 0.8 else
                "Moderate" if confidence > 0.5 else
                "Low"
            )
        }

    except Exception as e:
        return {
            "crop": "Unknown",
            "disease": "Unknown",
            "confidence": 0,
            "severity": "Unknown",
            "error": str(e)
        }
