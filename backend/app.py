from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load prediction models from pickle files
prediction_models = {}
# Assume productList is defined elsewhere
productList = ['Pens', 'Notebooks', 'Staplers', 'Folders', 'Pencils', 'Mini Drafters', 'Erasers', 'Sharpeners', 'Ink', 'Printing pages', 'Scales', 'Roller', 'Clips']
for product in productList:
    model_name = product.replace(' ', '')
    with open(f'models/{model_name}_rfmodel.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
        prediction_models[product] = model

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the product and input data from the request
        product = request.json['product']
        past_month_quantity_sold = request.json['data']['past_month_quantity_sold']
        item_price = request.json['data']['item_price']

        # Get the prediction model for the selected product
        model = prediction_models.get(product)
        if not model:
            return jsonify({'error': 'Model not found for the selected product'}), 404

        # Perform prediction
        prediction = model.predict([[past_month_quantity_sold, item_price]])[0]

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
