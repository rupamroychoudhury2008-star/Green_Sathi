import numpy as np
import tensorflow as tf
from PIL import Image
from io import BytesIO

MODEL_PATH = "app/ml/plant_disease_19class.tflite"

# label list (example – adjust order if needed)
LABELS = [
    "Cauliflower_Bacterial spot rot",
    "Cauliflower_Black Rot",
    "Cauliflower_Downy Mildew",
    "Cauliflower_Healthy",
    "Eggplant_Healthy Leaf",
    "Eggplant_Leaf Spot Disease",
    "Eggplant_Mosaic Virus Disease",
    "Eggplant_Small Leaf Disease",
    "Eggplant_Wilt Disease",
    "Rice_Bacterial Leaf Blight",
    "Rice_Brown Spot",
    "Rice_Healthy",
    "Rice_Leaf Blast",
    "Rice_Sheath Blight",
    "Tomato_Bacterial_spot",
    "Tomato_Early_blight",
    "Tomato_healthy",
    "Tomato_Late_blight",
    "Tomato_Septoria_leaf_spot"
]

interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()


def run_model(image_bytes: bytes):
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0).astype(np.float32)

    interpreter.set_tensor(input_details[0]["index"], image)
    interpreter.invoke()

    output = interpreter.get_tensor(output_details[0]["index"])[0]
    idx = int(np.argmax(output))

    label = LABELS[idx]
    confidence = float(output[idx])

    crop, disease = label.split("_", 1)

    return {
        "crop": crop,
        "disease": disease.replace("_", " "),
        "confidence": round(confidence * 100, 2)
    }
