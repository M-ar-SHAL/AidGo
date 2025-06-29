from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# MongoDB connection
try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client['aidgo_emergency']
    print("Connected to MongoDB successfully")
except Exception as e:
    print(f"MongoDB connection error: {e}")

# Collections
users_collection = db.users
transporters_collection = db.transporters
requests_collection = db.emergency_requests

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "AidGo API is running"}), 200

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        role = data.get('role')
        
        if role == "transporter":
            # Save transporter registration data
            transporter_data = {
                **data,
                'registration_date': datetime.utcnow(),
                'status': 'pending_verification',
                'is_online': False,
                'total_rides': 0,
                'rating': 0.0
            }
            result = transporters_collection.insert_one(transporter_data)
            return jsonify({
                "message": "Transporter registered successfully",
                "id": str(result.inserted_id)
            }), 200
        else:
            # Save patient data
            patient_data = {
                **data,
                'registration_date': datetime.utcnow()
            }
            result = users_collection.insert_one(patient_data)
            return jsonify({
                "message": "Patient registered successfully",
                "id": str(result.inserted_id)
            }), 200
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/request-help', methods=['POST'])
def request_help():
    try:
        data = request.json
        
        # Create emergency request
        emergency_request = {
            'patient_id': data.get('patientId'),
            'name': data.get('name'),
            'location': data.get('location'),
            'timestamp': data.get('timestamp', datetime.utcnow().isoformat()),
            'status': 'pending',
            'created_at': datetime.utcnow(),
            'accepted_by': None,
            'accepted_at': None
        }
        
        result = requests_collection.insert_one(emergency_request)
        
        return jsonify({
            "message": "Emergency request created successfully",
            "request_id": str(result.inserted_id)
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-requests', methods=['GET'])
def get_requests():
    try:
        # Get all pending emergency requests
        requests = list(requests_collection.find({"status": "pending"}))
        
        # Convert ObjectId to string for JSON serialization
        for req in requests:
            req['_id'] = str(req['_id'])
            if 'created_at' in req:
                req['created_at'] = req['created_at'].isoformat()
        
        return jsonify(requests), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/accept-request/<req_id>', methods=['POST'])
def accept_request(req_id):
    try:
        # Update request status to accepted
        result = requests_collection.update_one(
            {'_id': ObjectId(req_id)}, 
            {
                "$set": {
                    "status": "accepted",
                    "accepted_at": datetime.utcnow(),
                    "accepted_by": request.json.get('transporter_id') if request.json else None
                }
            }
        )
        
        if result.modified_count > 0:
            return jsonify({"message": "Request accepted successfully"}), 200
        else:
            return jsonify({"error": "Request not found or already accepted"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/transporter-status/<transporter_id>', methods=['POST'])
def update_transporter_status(transporter_id):
    try:
        data = request.json
        is_online = data.get('is_online', False)
        
        result = transporters_collection.update_one(
            {'_id': ObjectId(transporter_id)},
            {"$set": {"is_online": is_online, "last_updated": datetime.utcnow()}}
        )
        
        if result.modified_count > 0:
            return jsonify({"message": "Status updated successfully"}), 200
        else:
            return jsonify({"error": "Transporter not found"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-online-transporters', methods=['GET'])
def get_online_transporters():
    try:
        transporters = list(transporters_collection.find({
            "is_online": True,
            "status": "verified"
        }))
        
        for transporter in transporters:
            transporter['_id'] = str(transporter['_id'])
            if 'registration_date' in transporter:
                transporter['registration_date'] = transporter['registration_date'].isoformat()
        
        return jsonify(transporters), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)