from flask import Flask, request, jsonify
import cleanpost as cp
from sentence_transformers import SentenceTransformer
from flask_cors import CORS, cross_origin
import numpy as np
import torch
from scipy.special import softmax
app = Flask(__name__)
CORS(app)

import pickle

# Load the model, vectorizer, and label mapping from the pickle file
with open('trained_classifier_nif.pkl', 'rb') as model_file:
    clf= pickle.load(model_file)
with open('imputer_nif.pkl', 'rb') as model_file:
    imputer= pickle.load(model_file)
with open('scaler_nif.pkl', 'rb') as model_file:
    scaler= pickle.load(model_file)

label_mapping = {'Basic': 0, 'Intermediate': 1, 'Advanced': 2}

model = SentenceTransformer('all-MiniLM-L6-v2')

def preprocess_single_input(title, body, tags, numerical_data):
    title_embedding = model.encode([title])[0]
    body_embedding = model.encode([body])[0]
    tags_embedding = model.encode([tags])[0]

    # Combine text embeddings
    text_embedding = np.hstack((title_embedding, body_embedding, tags_embedding))

    # Impute missing values and normalize numerical data
    numerical_data = imputer.transform([numerical_data])
    numerical_data = scaler.transform(numerical_data)

    # Combine text embeddings with numerical features
    combined_feature = np.hstack((text_embedding, numerical_data[0]))

    return combined_feature

# Function to predict difficulty level for a single input
def predict_difficulty(title, body, tags, numerical_data):
    combined_feature = preprocess_single_input(title, body, tags, numerical_data)
    prediction = clf.predict([combined_feature])
    predicted_label = [key for key, value in label_mapping.items() if value == prediction[0]][0]
    return predicted_label





# text -> clean -> title + body + code -> keywords of title & body & code-> get pattern
@app.route('/', methods=['POST'])
def index():
    numerical_features = []
    # print("inside post...")
    request_data = request.get_json()
    # print(request_data)
    title = request_data['title']
    body = cp.clean_body(request_data['body']) 
    code=cp.clean_code(request_data['body'])
    tags=request_data['tags']
    numerical_features.append(float(request_data['reputation_score']))
    numerical_features.append(float(request_data['bronze_badge']))
    numerical_features.append(float(request_data['gold_badge']))
    numerical_features.append(float(request_data['silver_badge']))
    numerical_features.append(float(request_data['user_id']))
    numerical_features.append(float(request_data['answer_id']))
    numerical_features.append(float(request_data['view_count']))
    numerical_features.append(float(request_data['ans_count']))
    numerical_features.append(float(request_data['score']))
    numerical_features.append(float(request_data['interval_accepted']))
    numerical_features.append(float(cp.url_cnt(request_data['body'])))
    numerical_features.append(float(cp.calc_loc(request_data['body'])))
    numerical_features.append(float(cp.word_count(body)))
    label = predict_difficulty(title, body, tags, numerical_features)
    print(label)
    return jsonify({
        "pattern": label
    })
    

app.run(host='0.0.0.0', port=8500)

