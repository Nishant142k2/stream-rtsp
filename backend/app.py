# app.py - Flask Backend for RTSP Livestream App
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# MongoDB Configuration
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
DB_NAME = os.getenv('DB_NAME', 'rtsp-new')

try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    overlays_collection = db.overlays
    settings_collection = db.settings
    print(f"Connected to MongoDB: {DB_NAME}")
except Exception as e:
    print(f"MongoDB connection error: {e}")

# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if doc:
        doc['_id'] = str(doc['_id'])
    return doc

def serialize_docs(docs):
    return [serialize_doc(doc) for doc in docs]

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "timestamp": datetime.utcnow().isoformat()})

# OVERLAY CRUD ENDPOINTS

@app.route('/api/overlays', methods=['GET'])
def get_overlays():
    """
    Get all overlay configurations
    Returns: List of overlay objects
    """
    try:
        overlays = list(overlays_collection.find())
        return jsonify({
            "success": True,
            "data": serialize_docs(overlays),
            "count": len(overlays)
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/overlays/<overlay_id>', methods=['GET'])
def get_overlay(overlay_id):
    """
    Get a specific overlay by ID
    Args: overlay_id (string) - MongoDB ObjectId
    Returns: Single overlay object
    """
    try:
        overlay = overlays_collection.find_one({"_id": ObjectId(overlay_id)})
        if not overlay:
            return jsonify({"success": False, "error": "Overlay not found"}), 404
        return jsonify({
            "success": True,
            "data": serialize_doc(overlay)
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/overlays', methods=['POST'])
def create_overlay():
    """
    Create a new overlay configuration
    Request Body: JSON overlay object
    Returns: Created overlay with generated ID
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['type', 'content', 'x', 'y', 'width', 'height']
        for field in required_fields:
            if field not in data:
                return jsonify({"success": False, "error": f"Missing required field: {field}"}), 400
        
        # Create overlay document
        overlay = {
            "type": data['type'],
            "content": data['content'],
            "x": int(data['x']),
            "y": int(data['y']),
            "width": int(data['width']),
            "height": int(data['height']),
            "fontSize": int(data.get('fontSize', 16)),
            "color": data.get('color', '#ffffff'),
            "backgroundColor": data.get('backgroundColor', 'rgba(0,0,0,0.5)'),
            "borderRadius": int(data.get('borderRadius', 4)),
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = overlays_collection.insert_one(overlay)
        overlay['_id'] = str(result.inserted_id)
        
        return jsonify({
            "success": True,
            "data": overlay,
            "message": "Overlay created successfully"
        }), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/overlays/<overlay_id>', methods=['PUT'])
def update_overlay(overlay_id):
    """
    Update an existing overlay configuration
    Args: overlay_id (string) - MongoDB ObjectId
    Request Body: JSON overlay object with updated fields
    Returns: Updated overlay object
    """
    try:
        data = request.get_json()
        
        # Check if overlay exists
        existing_overlay = overlays_collection.find_one({"_id": ObjectId(overlay_id)})
        if not existing_overlay:
            return jsonify({"success": False, "error": "Overlay not found"}), 404
        
        # Update fields
        update_data = {
            "updated_at": datetime.utcnow()
        }
        
        # Update only provided fields
        updatable_fields = ['type', 'content', 'x', 'y', 'width', 'height', 'fontSize', 'color', 'backgroundColor', 'borderRadius']
        for field in updatable_fields:
            if field in data:
                if field in ['x', 'y', 'width', 'height', 'fontSize', 'borderRadius']:
                    update_data[field] = int(data[field])
                else:
                    update_data[field] = data[field]
        
        # Perform update
        result = overlays_collection.update_one(
            {"_id": ObjectId(overlay_id)},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            return jsonify({"success": False, "error": "No changes made"}), 400
        
        # Return updated overlay
        updated_overlay = overlays_collection.find_one({"_id": ObjectId(overlay_id)})
        return jsonify({
            "success": True,
            "data": serialize_doc(updated_overlay),
            "message": "Overlay updated successfully"
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/overlays/<overlay_id>', methods=['DELETE'])
def delete_overlay(overlay_id):
    """
    Delete an overlay configuration
    Args: overlay_id (string) - MongoDB ObjectId
    Returns: Success message
    """
    try:
        result = overlays_collection.delete_one({"_id": ObjectId(overlay_id)})
        if result.deleted_count == 0:
            return jsonify({"success": False, "error": "Overlay not found"}), 404
        
        return jsonify({
            "success": True,
            "message": "Overlay deleted successfully"
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# SETTINGS CRUD ENDPOINTS

@app.route('/api/settings', methods=['GET'])
def get_settings():
    """
    Get application settings
    Returns: Settings object
    """
    try:
        settings = settings_collection.find_one({"type": "app_settings"})
        if not settings:
            # Create default settings if none exist
            default_settings = {
                "type": "app_settings",
                "rtsp_url": "",
                "volume": 50,
                "autoplay": False,
                "overlay_enabled": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            result = settings_collection.insert_one(default_settings)
            default_settings['_id'] = str(result.inserted_id)
            return jsonify({"success": True, "data": default_settings}), 200
        
        return jsonify({
            "success": True,
            "data": serialize_doc(settings)
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/settings', methods=['PUT'])
def update_settings():
    """
    Update application settings
    Request Body: JSON settings object
    Returns: Updated settings object
    """
    try:
        data = request.get_json()
        
        # Get existing settings or create new
        settings = settings_collection.find_one({"type": "app_settings"})
        
        update_data = {
            "updated_at": datetime.utcnow()
        }
        
        # Update only provided fields
        updatable_fields = ['rtsp_url', 'volume', 'autoplay', 'overlay_enabled']
        for field in updatable_fields:
            if field in data:
                update_data[field] = data[field]
        
        if settings:
            # Update existing settings
            result = settings_collection.update_one(
                {"type": "app_settings"},
                {"$set": update_data}
            )
            updated_settings = settings_collection.find_one({"type": "app_settings"})
        else:
            # Create new settings
            update_data.update({
                "type": "app_settings",
                "created_at": datetime.utcnow()
            })
            result = settings_collection.insert_one(update_data)
            updated_settings = settings_collection.find_one({"_id": result.inserted_id})
        
        return jsonify({
            "success": True,
            "data": serialize_doc(updated_settings),
            "message": "Settings updated successfully"
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# RTSP STREAM ENDPOINTS

@app.route('/api/stream/validate', methods=['POST'])
def validate_rtsp_url():
    """
    Validate RTSP stream URL
    Request Body: {"rtsp_url": "rtsp://..."}
    Returns: Validation result
    """
    try:
        data = request.get_json()
        rtsp_url = data.get('rtsp_url', '')
        
        if not rtsp_url:
            return jsonify({"success": False, "error": "RTSP URL is required"}), 400
        
        # Basic URL validation
        if not rtsp_url.startswith(('rtsp://', 'rtmp://')):
            return jsonify({"success": False, "error": "Invalid RTSP/RTMP URL format"}), 400
        
        # In production, you would test the actual stream connection here
        # For now, we'll do basic validation
        return jsonify({
            "success": True,
            "valid": True,
            "message": "RTSP URL format is valid"
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# BATCH OPERATIONS

@app.route('/api/overlays/batch', methods=['POST'])
def batch_create_overlays():
    """
    Create multiple overlays at once
    Request Body: {"overlays": [overlay1, overlay2, ...]}
    Returns: List of created overlays
    """
    try:
        data = request.get_json()
        overlays_data = data.get('overlays', [])
        
        if not overlays_data:
            return jsonify({"success": False, "error": "No overlays provided"}), 400
        
        created_overlays = []
        for overlay_data in overlays_data:
            overlay = {
                "type": overlay_data.get('type', 'text'),
                "content": overlay_data.get('content', ''),
                "x": int(overlay_data.get('x', 0)),
                "y": int(overlay_data.get('y', 0)),
                "width": int(overlay_data.get('width', 200)),
                "height": int(overlay_data.get('height', 50)),
                "fontSize": int(overlay_data.get('fontSize', 16)),
                "color": overlay_data.get('color', '#ffffff'),
                "backgroundColor": overlay_data.get('backgroundColor', 'rgba(0,0,0,0.5)'),
                "borderRadius": int(overlay_data.get('borderRadius', 4)),
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            created_overlays.append(overlay)
        
        result = overlays_collection.insert_many(created_overlays)
        
        # Add IDs to the created overlays
        for i, overlay_id in enumerate(result.inserted_ids):
            created_overlays[i]['_id'] = str(overlay_id)
        
        return jsonify({
            "success": True,
            "data": created_overlays,
            "count": len(created_overlays),
            "message": f"Created {len(created_overlays)} overlays successfully"
        }), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/overlays/batch', methods=['DELETE'])
def batch_delete_overlays():
    """
    Delete multiple overlays at once
    Request Body: {"overlay_ids": ["id1", "id2", ...]}
    Returns: Deletion result
    """
    try:
        data = request.get_json()
        overlay_ids = data.get('overlay_ids', [])
        
        if not overlay_ids:
            return jsonify({"success": False, "error": "No overlay IDs provided"}), 400
        
        # Convert string IDs to ObjectIds
        object_ids = [ObjectId(id) for id in overlay_ids]
        
        result = overlays_collection.delete_many({"_id": {"$in": object_ids}})
        
        return jsonify({
            "success": True,
            "deleted_count": result.deleted_count,
            "message": f"Deleted {result.deleted_count} overlays successfully"
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ANALYTICS ENDPOINTS

@app.route('/api/analytics/overlays', methods=['GET'])
def get_overlay_analytics():
    """
    Get overlay usage analytics
    Returns: Analytics data
    """
    try:
        total_overlays = overlays_collection.count_documents({})
        text_overlays = overlays_collection.count_documents({"type": "text"})
        logo_overlays = overlays_collection.count_documents({"type": "logo"})
        
        # Get most recent overlays
        recent_overlays = list(overlays_collection.find().sort("created_at", -1).limit(5))
        
        analytics = {
            "total_overlays": total_overlays,
            "by_type": {
                "text": text_overlays,
                "logo": logo_overlays
            },
            "recent_overlays": serialize_docs(recent_overlays)
        }
        
        return jsonify({
            "success": True,
            "data": analytics
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ERROR HANDLERS

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": "Endpoint not found",
        "message": "The requested API endpoint does not exist"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "success": False,
        "error": "Internal server error",
        "message": "An unexpected error occurred on the server"
    }), 500

if __name__ == '__main__':
    # Create indexes for better performance
    try:
        overlays_collection.create_index("created_at")
        overlays_collection.create_index("type")
        settings_collection.create_index("type")
        print("Database indexes created successfully")
    except Exception as e:
        print(f"Index creation warning: {e}")
    
    # Run the Flask application
    app.run(debug=True, host='0.0.0.0', port=5000)