from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")  # Or use MongoDB Atlas URI
db = client['emergency_app']

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    role = data.get('role')
    if role == "patient":
        db.patients.insert_one(data)
    else:
        db.transporters.insert_one(data)
    return jsonify({"message": "Registered successfully"}), 200

@app.route('/request-help', methods=['POST'])
def request_help():
    data = request.json
    db.requests.insert_one({**data, "status": "pending"})
    return jsonify({"message": "Help requested"}), 200

@app.route('/get-requests', methods=['GET'])
def get_requests():
    requests = list(db.requests.find({"status": "pending"}))
    for r in requests:
        r['_id'] = str(r['_id'])
    return jsonify(requests), 200

@app.route('/accept-request/<req_id>', methods=['POST'])
def accept_request(req_id):
    db.requests.update_one({'_id': ObjectId(req_id)}, {"$set": {"status": "accepted"}})
    return jsonify({"message": "Request accepted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
