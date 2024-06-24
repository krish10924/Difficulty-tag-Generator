from flask import Flask, request, jsonify
import cleanpost as cp
from flask_cors import CORS, cross_origin
import numpy as np
import torch
from scipy.special import softmax
app = Flask(__name__)
CORS(app)

import pickle


# Load the model, vectorizer, and label mapping from the pickle file
with open('model.pkl', 'rb') as model_file:
    classifier, tfidf_vectorizer, label_map = pickle.load(model_file)

def predict(input_text):
    # Preprocess input text
    input_features = tfidf_vectorizer.transform([input_text])
    # Make prediction
    prediction = classifier.predict(input_features)
    # Map prediction back to original label
    label_map_inverse = {idx: label for label, idx in label_map.items()}
    predicted_label = label_map_inverse[prediction[0]]
    return predicted_label



# text -> clean -> title + body + code -> keywords of title & body & code-> get pattern
@app.route('/', methods=['POST'])
def index():
    # print("inside post...")
    request_data = request.get_json()
    # print(request_data)
    title = request_data['title']
    body = cp.clean_body(request_data['body']) 
    code=cp.clean_code(request_data['body'])
    tags=request_data['tags']
    body=title+body+code +tags 
    print(tags)
    label = predict(body); 
    print(label)
    return jsonify({
        "pattern": label
    })
    

app.run(host='0.0.0.0', port=8500)

