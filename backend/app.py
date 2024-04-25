import os
from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Define the path to the models directory
MODELS_DIR = os.path.join(os.path.dirname(__file__), 'models')

# Load prediction models from pickle files
prediction_models = {}
model_files = os.listdir(MODELS_DIR)
for model_file in model_files:
    if model_file.endswith('_rfmodel.pkl'):
        model_name = model_file.split('_rfmodel.pkl')[0]
        with open(os.path.join(MODELS_DIR, model_file), 'rb') as model_file:
            model = pickle.load(model_file)
            prediction_models[model_name] = model

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the product and input data from the request
        product = request.json['product']
        input_data = request.json['data']

        # Get the prediction model for the selected product
        model = prediction_models.get(product)
        if not model:
            return jsonify({'error': 'Model not found for the selected product'}), 404

        # Perform prediction
        prediction = model.predict([input_data])[0]  # Assuming input_data is a list of features

        # Calculate safety stock and suggested order quantity
        safety_stock = prediction * 0.05
        suggested_order_quantity = prediction + safety_stock

        return jsonify({
            'prediction': prediction,
            'safety_stock': safety_stock,
            'suggested_order_quantity': suggested_order_quantity
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
