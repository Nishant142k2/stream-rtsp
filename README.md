# RTSP Livestream App - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, the API does not require authentication. In production, consider implementing JWT tokens or API keys.

## Response Format
All API responses follow this standard format:
```json
{
    "success": boolean,
    "data": object|array,
    "message": string,
    "error": string
}
```

---

## Health Check

### GET /health
Check API health status.

**Response:**
```json
{
    "success": true,
    "status": "healthy",
    "timestamp": "2025-08-16T10:30:00.000Z"
}
```

---

## Overlay Management

### GET /overlays
Retrieve all overlay configurations.

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "_id": "64a1b2c3d4e5f6789012345",
            "type": "text",
            "content": "Live Stream",
            "x": 50,
            "y": 50,
            "width": 200,
            "height": 50,
            "fontSize": 16,
            "color": "#ffffff",
            "backgroundColor": "rgba(0,0,0,0.5)",
            "borderRadius": 4,
            "created_at": "2025-08-16T10:00:00.000Z",
            "updated_at": "2025-08-16T10:00:00.000Z"
        }
    ],
    "count": 1
}
```

### GET /overlays/{id}
Retrieve a specific overlay by ID.

**Parameters:**
- `id` (path): MongoDB ObjectId of the overlay

**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "64a1b2c3d4e5f6789012345",
        "type": "text",
        "content": "Live Stream",
        "x": 50,
        "y": 50,
        "width": 200,
        "height": 50,
        "fontSize": 16,
        "color": "#ffffff",
        "backgroundColor": "rgba(0,0,0,0.5)",
        "borderRadius": 4,
        "created_at": "2025-08-16T10:00:00.000Z",
        "updated_at": "2025-08-16T10:00:00.000Z"
    }
}
```

### POST /overlays
Create a new overlay configuration.

**Request Body:**
```json
{
    "type": "text",
    "content": "Welcome to Stream",
    "x": 100,
    "y": 100,
    "width": 250,
    "height": 60,
    "fontSize": 18,
    "color": "#ffffff",
    "backgroundColor": "rgba(0,0,0,0.7)",
    "borderRadius": 8
}
```

**Required Fields:**
- `type`: "text" or "logo"
- `content`: Text content or logo URL
- `x`: X position (integer)
- `y`: Y position (integer)
- `width`: Width in pixels (integer)
- `height`: Height in pixels (integer)

**Optional Fields:**
- `fontSize`: Font size in pixels (default: 16)
- `color`: Text color (default: "#ffffff")
- `backgroundColor`: Background color (default: "rgba(0,0,0,0.5)")
- `borderRadius`: Border radius in pixels (default: 4)

**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "64a1b2c3d4e5f6789012346",
        "type": "text",
        "content": "Welcome to Stream",
        "x": 100,
        "y": 100,
        "width": 250,
        "height": 60,
        "fontSize": 18,
        "color": "#ffffff",
        "backgroundColor": "rgba(0,0,0,0.7)",
        "borderRadius": 8,
        "created_at": "2025-08-16T10:15:00.000Z",
        "updated_at": "2025-08-16T10:15:00.000Z"
    },
    "message": "Overlay created successfully"
}
```

### PUT /overlays/{id}
Update an existing overlay configuration.

**Parameters:**
- `id` (path): MongoDB ObjectId of the overlay

**Request Body:**
```json
{
    "content": "Updated Stream Title",
    "x": 150,
    "y": 75,
    "fontSize": 20
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "64a1b2c3d4e5f6789012346",
        "type": "text",
        "content": "Updated Stream Title",
        "x": 150,
        "y": 75,
        "width": 250,
        "height": 60,
        "fontSize": 20,
        "color": "#ffffff",
        "backgroundColor": "rgba(0,0,0,0.7)",
        "borderRadius": 8,
        "created_at": "2025-08-16T10:15:00.000Z",
        "updated_at": "2025-08-16T10:30:00.000Z"
    },
    "message": "Overlay updated successfully"
}
```

### DELETE /overlays/{id}
Delete an overlay configuration.

**Parameters:**
- `id` (path): MongoDB ObjectId of the overlay

**Response:**
```json
{
    "success": true,
    "message": "Overlay deleted successfully"
}
```

---

## Batch Operations

### POST /overlays/batch
Create multiple overlays at once.

**Request Body:**
```json
{
    "overlays": [
        {
            "type": "text",
            "content": "Title",
            "x": 50,
            "y": 50,
            "width": 200,
            "height": 40
        },
        {
            "type": "logo",
            "content": "https://example.com/logo.png",
            "x": 500,
            "y": 20,
            "width": 100,
            "height": 50
        }
    ]
}
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "_id": "64a1b2c3d4e5f6789012347",
            "type": "text",
            "content": "Title",
            "x": 50,
            "y": 50,
            "width": 200,
            "height": 40,
            "fontSize": 16,
            "color": "#ffffff",
            "backgroundColor": "rgba(0,0,0,0.5)",
            "borderRadius": 4,
            "created_at": "2025-08-16T10:45:00.000Z",
            "updated_at": "2025-08-16T10:45:00.000Z"
        },
        {
            "_id": "64a1b2c3d4e5f6789012348",
            "type": "logo",
            "content": "https://example.com/logo.png",
            "x": 500,
            "y": 20,
            "width": 100,
            "height": 50,
            "fontSize": 16,
            "color": "#ffffff",
            "backgroundColor": "rgba(0,0,0,0.5)",
            "borderRadius": 4,
            "created_at": "2025-08-16T10:45:00.000Z",
            "updated_at": "2025-08-16T10:45:00.000Z"
        }
    ],
    "count": 2,
    "message": "Created 2 overlays successfully"
}
```

### DELETE /overlays/batch
Delete multiple overlays at once.

**Request Body:**
```json
{
    "overlay_ids": ["64a1b2c3d4e5f6789012347", "64a1b2c3d4e5f6789012348"]
}
```

**Response:**
```json
{
    "success": true,
    "deleted_count": 2,
    "message": "Deleted 2 overlays successfully"
}
```

---

## Settings Management

### GET /settings
Retrieve application settings.

**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "64a1b2c3d4e5f6789012349",
        "type": "app_settings",
        "rtsp_url": "rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp",
        "volume": 75,
        "autoplay": false,
        "overlay_enabled": true,
        "created_at": "2025-08-16T09:00:00.000Z",
        "updated_at": "2025-08-16T10:30:00.000Z"
    }
}
```

### PUT /settings
Update application settings.

**Request Body:**
```json
{
    "rtsp_url": "rtsp://new-stream-url",
    "volume": 80,
    "autoplay": true,
    "overlay_enabled": false
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "64a1b2c3d4e5f6789012349",
        "type": "app_settings",
        "rtsp_url": "rtsp://new-stream-url",
        "volume": 80,
        "autoplay": true,
        "overlay_enabled": false,
        "created_at": "2025-08-16T09:00:00.000Z",
        "updated_at": "2025-08-16T11:00:00.000Z"
    },
    "message": "Settings updated successfully"
}
```

---

## Stream Management

### POST /stream/validate
Validate an RTSP stream URL.

**Request Body:**
```json
{
    "rtsp_url": "rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp"
}
```

**Response:**
```json
{
    "success": true,
    "valid": true,
    "message": "RTSP URL format is valid"
}
```

---

## Analytics

### GET /analytics/overlays
Get overlay usage analytics.

**Response:**
```json
{
    "success": true,
    "data": {
        "total_overlays": 5,
        "by_type": {
            "text": 3,
            "logo": 2
        },
        "recent_overlays": [
            {
                "_id": "64a1b2c3d4e5f6789012350",
                "type": "text",
                "content": "Latest Overlay",
                "created_at": "2025-08-16T11:30:00.000Z"
            }
        ]
    }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
    "success": false,
    "error": "Missing required field: content"
}
```

### 404 Not Found
```json
{
    "success": false,
    "error": "Overlay not found"
}
```

### 500 Internal Server Error
```json
{
    "success": false,
    "error": "Internal server error",
    "message": "An unexpected error occurred on the server"
}
```

---

## Example Usage

### JavaScript/React Integration
```javascript
// Get all overlays
const fetchOverlays = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/overlays');
        const data = await response.json();
        if (data.success) {
            setOverlays(data.data);
        }
    } catch (error) {
        console.error('Error fetching overlays:', error);
    }
};

// Create new overlay
const createOverlay = async (overlayData) => {
    try {
        const response = await fetch('http://localhost:5000/api/overlays', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(overlayData)
        });
        const data = await response.json();
        if (data.success) {
            console.log('Overlay created:', data.data);
            fetchOverlays(); // Refresh overlay list
        }
    } catch (error) {
        console.error('Error creating overlay:', error);
    }
};

// Update overlay
const updateOverlay = async (overlayId, updates) => {
    try {
        const response = await fetch(`http://localhost:5000/api/overlays/${overlayId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates)
        });
        const data = await response.json();
        if (data.success) {
            console.log('Overlay updated:', data.data);
            fetchOverlays(); // Refresh overlay list
        }
    } catch (error) {
        console.error('Error updating overlay:', error);
    }
};

// Delete overlay
const deleteOverlay = async (overlayId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/overlays/${overlayId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
            console.log('Overlay deleted');
            fetchOverlays(); // Refresh overlay list
        }
    } catch (error) {
        console.error('Error deleting overlay:', error);
    }
};
```

### Python Integration
```python
import requests

BASE_URL = 'http://localhost:5000/api'

# Create overlay
def create_overlay(overlay_data):
    response = requests.post(f'{BASE_URL}/overlays', json=overlay_data)
    return response.json()

# Get all overlays
def get_overlays():
    response = requests.get(f'{BASE_URL}/overlays')
    return response.json()

# Update overlay
def update_overlay(overlay_id, updates):
    response = requests.put(f'{BASE_URL}/overlays/{overlay_id}', json=updates)
    return response.json()

# Delete overlay
def delete_overlay(overlay_id):
    response = requests.delete(f'{BASE_URL}/overlays/{overlay_id}')
    return response.json()
```

---

## Rate Limiting
Currently, no rate limiting is implemented. In production, consider implementing rate limiting to prevent abuse.

## CORS
CORS is enabled for all origins. In production, configure CORS to only allow specific domains.

## Database Indexes
The following indexes are automatically created for optimal performance:
- `overlays.created_at`
- `overlays.type`
- `settings.type`
  # RTSP Livestream App - User Documentation

## Table of Contents
1. [Installation & Setup](#installation--setup)
2. [Getting Started](#getting-started)
3. [Managing RTSP Streams](#managing-rtsp-streams)
4. [Working with Overlays](#working-with-overlays)
5. [Video Controls](#video-controls)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Features](#advanced-features)

---

## Installation & Setup

### Prerequisites
- **Python 3.8+** with pip
- **MongoDB** (local installation or cloud service like MongoDB Atlas)
- **Node.js 16+** with npm/yarn (for React frontend development)
- **Modern web browser** with WebRTC support

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd livestream-app
   ```

2. **Install Python dependencies**
   ```bash
   pip install flask flask-cors pymongo python-dotenv
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/
   DB_NAME=livestream_app
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```

4. **Start MongoDB**
   - **Local MongoDB**: Ensure MongoDB service is running
   - **MongoDB Atlas**: Use your connection string in `MONGO_URI`

5. **Run the Flask backend**
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup (Development)

1. **Install React dependencies**
   ```bash
   npm install react react-dom
   # or
   yarn add react react-dom
   ```

2. **Start the development server**
   The React component is ready to use in your application or can be integrated into an existing React project.

### Production Deployment

#### Docker Setup
Create a `Dockerfile` for the Flask app:
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

#### Docker Compose
Create a `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/
    depends_on:
      - mongo
  
  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

## Getting Started

### 1. First Time Setup

1. **Access the application** in your web browser at `http://localhost:3000` (or your deployed URL)
2. **You'll see the main interface** with:
   - Video player area (black placeholder initially)
   - RTSP URL input field
   - Overlay management panel
   - Video controls

### 2. Connecting Your First Stream

1. **Enter RTSP URL**: In the "RTSP Stream URL" field, enter your stream URL:
   ```
   rtsp://username:password@camera-ip:port/stream-path
   ```

2. **Use Quick Select**: Click the dropdown next to the URL input to try demo streams:
   - Demo Stream 1: Big Buck Bunny sample
   - Demo Stream 2: IP camera demo
   - Demo Stream 3: Alternative demo stream

3. **Click Play**: Once URL is entered, click the play button to start streaming

### 3. Understanding the Interface

- **Video Player**: Main viewing area with overlay display
- **Controls Bar**: Play/pause, volume, mute controls at bottom
- **Overlay Panel**: Right sidebar for managing overlays
- **Stream Info**: Connection status and stream details

---

## Managing RTSP Streams

### Supported RTSP Formats

The application supports various RTSP stream formats:

#### Standard RTSP URLs
```
rtsp://server-ip:port/stream-path
rtsp://username:password@server-ip:port/stream-path
```

#### Common Camera Brands

**Hikvision Cameras:**
```
rtsp://admin:password@192.168.1.64:554/Streaming/Channels/101
```

**Dahua Cameras:**
```
rtsp://admin:password@192.168.1.108:554/cam/realmonitor?channel=1&subtype=0
```

**Axis Cameras:**
```
rtsp://root:password@192.168.1.100/axis-media/media.amp
```

**Generic IP Cameras:**
```
rtsp://admin:123456@192.168.1.200:554/11
```

### Stream Configuration

1. **Primary Stream**: Use for high-quality viewing
   ```
   rtsp://camera-ip:554/stream1
   ```

2. **Sub Stream**: Use for lower bandwidth situations
   ```
   rtsp://camera-ip:554/stream2
   ```

### Testing Stream Connectivity

1. **Use the validation endpoint**: The app automatically validates RTSP URL format
2. **Check network connectivity**: Ensure your device can reach the camera's IP
3. **Verify credentials**: Double-check username and password
4. **Port accessibility**: Ensure RTSP port (usually 554) is not blocked

### Common RTSP Issues and Solutions

| Issue | Solution |
|-------|----------|
| "Stream not loading" | Check URL format and credentials |
| "Connection timeout" | Verify network connectivity to camera |
| "Authentication failed" | Check username/password |
| "Format not supported" | Try different stream path or codec |

---

## Working with Overlays

### Creating Your First Overlay

1. **Click the "+" button** in the Overlays panel
2. **Choose overlay type**:
   - **Text**: For text-based overlays (titles, timestamps, etc.)
   - **Logo**: For image/logo overlays

3. **Configure overlay properties**:
   - **Content**: Text or image URL
   - **Position**: X, Y coordinates
   - **Size**: Width and height in pixels
   - **Styling**: Font size, colors, background

4. **Click "Add Overlay"** to create

### Text Overlays

#### Basic Text Overlay
- **Type**: Text
- **Content**: "Live Stream - Channel 1"
- **Position**: X=50, Y=50
- **Size**: 200x40 pixels
- **Font Size**: 16px

#### Styling Options
- **Text Color**: Choose from color picker
- **Background Color**: Semi-transparent backgrounds work best
- **Border Radius**: Rounded corners for modern look

#### Common Text Overlay Examples

**Stream Title:**
```
Type: Text
Content: "Security Camera - Main Entrance"
Position: 20, 20
Size: 300x50
Font Size: 18
Background: rgba(0,0,0,0.7)
```

**Timestamp Placeholder:**
```
Type: Text
Content: "2025-08-16 14:30:22"
Position: 20, bottom-60
Size: 200x30
Font Size: 14
Color: #00ff00
```

**Warning Notice:**
```
Type: Text
Content: "⚠️ RECORDING IN PROGRESS"
Position: center, 100
Size: 250x40
Font Size: 16
Color: #ff4444
Background: rgba(255,255,0,0.8)
```

### Logo Overlays

#### Adding Company Logo
1. **Type**: Logo
2. **Content**: URL to your logo image
   ```
   https://your-domain.com/logo.png
   ```
3. **Position**: Usually top-right corner
4. **Size**: Keep aspect ratio (e.g., 100x40 for horizontal logo)

#### Logo Best Practices
- **Use PNG format** with transparent background
- **Optimize file size** for faster loading
- **Position strategically** to avoid blocking important content
- **Standard sizes**: 100x40, 120x60, or 150x75 pixels

### Managing Overlays

#### Moving Overlays
1. **Click on an overlay** in the video player to select it
2. **Drag to reposition** - overlay becomes draggable
3. **Fine-tune position** using the edit form

#### Editing Overlays
1. **Select overlay** by clicking on it
2. **Click the edit icon** (pencil) that appears
3. **Modify properties** in the form
4. **Click "Update Overlay"** to save changes

#### Deleting Overlays
1. **Select overlay** by clicking on it
2. **Click the delete icon** (trash) that appears
3. **Confirm deletion**

### Overlay Layer Management

Overlays are rendered in
# RTSP Livestream App - User Documentation

## Table of Contents
1. [Installation & Setup](#installation--setup)
2. [Getting Started](#getting-started)
3. [Managing RTSP Streams](#managing-rtsp-streams)
4. [Working with Overlays](#working-with-overlays)
5. [Video Controls](#video-controls)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Features](#advanced-features)

---

## Installation & Setup

### Prerequisites
- **Python 3.8+** with pip
- **MongoDB** (local installation or cloud service like MongoDB Atlas)
- **Node.js 16+** with npm/yarn (for React frontend development)
- **Modern web browser** with WebRTC support

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd livestream-app
   ```

2. **Install Python dependencies**
   ```bash
   pip install flask flask-cors pymongo python-dotenv
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/
   DB_NAME=livestream_app
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```

4. **Start MongoDB**
   - **Local MongoDB**: Ensure MongoDB service is running
   - **MongoDB Atlas**: Use your connection string in `MONGO_URI`

5. **Run the Flask backend**
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup (Development)

1. **Install React dependencies**
   ```bash
   npm install react react-dom
   # or
   yarn add react react-dom
   ```

2. **Start the development server**
   The React component is ready to use in your application or can be integrated into an existing React project.

### Production Deployment

#### Docker Setup
Create a `Dockerfile` for the Flask app:
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

#### Docker Compose
Create a `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/
    depends_on:
      - mongo
  
  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

## Getting Started

### 1. First Time Setup

1. **Access the application** in your web browser at `http://localhost:3000` (or your deployed URL)
2. **You'll see the main interface** with:
   - Video player area (black placeholder initially)
   - RTSP URL input field
   - Overlay management panel
   - Video controls

### 2. Connecting Your First Stream

1. **Enter RTSP URL**: In the "RTSP Stream URL" field, enter your stream URL:
   ```
   rtsp://username:password@camera-ip:port/stream-path
   ```

2. **Use Quick Select**: Click the dropdown next to the URL input to try demo streams:
   - Demo Stream 1: Big Buck Bunny sample
   - Demo Stream 2: IP camera demo
   - Demo Stream 3: Alternative demo stream

3. **Click Play**: Once URL is entered, click the play button to start streaming

### 3. Understanding the Interface

- **Video Player**: Main viewing area with overlay display
- **Controls Bar**: Play/pause, volume, mute controls at bottom
- **Overlay Panel**: Right sidebar for managing overlays
- **Stream Info**: Connection status and stream details

---

## Managing RTSP Streams

### Supported RTSP Formats

The application supports various RTSP stream formats:

#### Standard RTSP URLs
```
rtsp://server-ip:port/stream-path
rtsp://username:password@server-ip:port/stream-path
```

#### Common Camera Brands

**Hikvision Cameras:**
```
rtsp://admin:password@192.168.1.64:554/Streaming/Channels/101
```

**Dahua Cameras:**
```
rtsp://admin:password@192.168.1.108:554/cam/realmonitor?channel=1&subtype=0
```

**Axis Cameras:**
```
rtsp://root:password@192.168.1.100/axis-media/media.amp
```

**Generic IP Cameras:**
```
rtsp://admin:123456@192.168.1.200:554/11
```

### Stream Configuration

1. **Primary Stream**: Use for high-quality viewing
   ```
   rtsp://camera-ip:554/stream1
   ```

2. **Sub Stream**: Use for lower bandwidth situations
   ```
   rtsp://camera-ip:554/stream2
   ```

### Testing Stream Connectivity

1. **Use the validation endpoint**: The app automatically validates RTSP URL format
2. **Check network connectivity**: Ensure your device can reach the camera's IP
3. **Verify credentials**: Double-check username and password
4. **Port accessibility**: Ensure RTSP port (usually 554) is not blocked

### Common RTSP Issues and Solutions

| Issue | Solution |
|-------|----------|
| "Stream not loading" | Check URL format and credentials |
| "Connection timeout" | Verify network connectivity to camera |
| "Authentication failed" | Check username/password |
| "Format not supported" | Try different stream path or codec |

---

## Working with Overlays

### Creating Your First Overlay

1. **Click the "+" button** in the Overlays panel
2. **Choose overlay type**:
   - **Text**: For text-based overlays (titles, timestamps, etc.)
   - **Logo**: For image/logo overlays

3. **Configure overlay properties**:
   - **Content**: Text or image URL
   - **Position**: X, Y coordinates
   - **Size**: Width and height in pixels
   - **Styling**: Font size, colors, background

4. **Click "Add Overlay"** to create

### Text Overlays

#### Basic Text Overlay
- **Type**: Text
- **Content**: "Live Stream - Channel 1"
- **Position**: X=50, Y=50
- **Size**: 200x40 pixels
- **Font Size**: 16px

#### Styling Options
- **Text Color**: Choose from color picker
- **Background Color**: Semi-transparent backgrounds work best
- **Border Radius**: Rounded corners for modern look

#### Common Text Overlay Examples

**Stream Title:**
```
Type: Text
Content: "Security Camera - Main Entrance"
Position: 20, 20
Size: 300x50
Font Size: 18
Background: rgba(0,0,0,0.7)
```

**Timestamp Placeholder:**
```
Type: Text
Content: "2025-08-16 14:30:22"
Position: 20, bottom-60
Size: 200x30
Font Size: 14
Color: #00ff00
```

**Warning Notice:**
```
Type: Text
Content: "⚠️ RECORDING IN PROGRESS"
Position: center, 100
Size: 250x40
Font Size: 16
Color: #ff4444
Background: rgba(255,255,0,0.8)
```

### Logo Overlays

#### Adding Company Logo
1. **Type**: Logo
2. **Content**: URL to your logo image
   ```
   https://your-domain.com/logo.png
   ```
3. **Position**: Usually top-right corner
4. **Size**: Keep aspect ratio (e.g., 100x40 for horizontal logo)

#### Logo Best Practices
- **Use PNG format** with transparent background
- **Optimize file size** for faster loading
- **Position strategically** to avoid blocking important content
- **Standard sizes**: 100x40, 120x60, or 150x75 pixels

### Managing Overlays

#### Moving Overlays
1. **Click on an overlay** in the video player to select it
2. **Drag to reposition** - overlay becomes draggable
3. **Fine-tune position** using the edit form

#### Editing Overlays
1. **Select overlay** by clicking on it
2. **Click the edit icon** (pencil) that appears
3. **Modify properties** in the form
4. **Click "Update Overlay"** to save changes

#### Deleting Overlays
1. **Select overlay** by clicking on it
2. **Click the delete icon** (trash) that appears
3. **Confirm deletion**

### Overlay Layer Management

Overlays are rendered in the order they were created. Later overlays appear on top of earlier ones.

#### Best Practices for Overlay Positioning
- **Corner positioning**: Leave 20-30px margin from edges
- **Avoid center area**: Keep important content visible
- **Consider aspect ratios**: Test on different screen sizes
- **Readability**: Ensure sufficient contrast with video content

---

## Video Controls

### Playback Controls

#### Play/Pause Button
- **Click to start/stop** the RTSP stream
- **Keyboard shortcut**: Spacebar (when video is focused)
- **Status indicator**: Shows current playback state

#### Volume Controls
- **Volume slider**: Adjust from 0-100%
- **Mute button**: Quick mute/unmute toggle
- **Keyboard shortcuts**: 
  - Arrow Up/Down: Volume adjustment
  - M: Mute toggle

#### Stream Status Indicator
- **🟢 Connected**: Stream is active and receiving data
- **🔴 No Stream**: No RTSP URL configured or connection failed
- **🟡 Connecting**: Attempting to establish connection

### Advanced Playback Features

#### Full Screen Mode
- **Double-click video**: Enter full screen
- **ESC key**: Exit full screen
- **Overlays remain visible** in full screen mode

#### Stream Quality Information
- **Resolution**: Displayed in Stream Info panel
- **Bitrate**: Current stream bitrate
- **Frame Rate**: FPS information (when available)

---

## Troubleshooting

### Common Issues and Solutions

#### Stream Connection Problems

**Problem**: "RTSP stream not loading"
```
Solutions:
1. Verify RTSP URL format: rtsp://user:pass@ip:port/path
2. Check camera network connectivity
3. Test with VLC media player first
4. Ensure firewall allows RTSP traffic (port 554)
```

**Problem**: "Authentication failed"
```
Solutions:
1. Double-check username and password
2. Try accessing camera web interface first
3. Some cameras require admin/admin or admin/12345
4. Check for special characters in password (URL encode)
```

**Problem**: "Connection timeout"
```
Solutions:
1. Ping camera IP address to test connectivity
2. Check if camera is on same network
3. Try different RTSP port (554, 8554)
4. Disable camera firewall temporarily
```

#### Overlay Issues

**Problem**: "Overlays not appearing"
```
Solutions:
1. Check if overlay coordinates are within video bounds
2. Verify overlay content is not empty
3. Try different background color/opacity
4. Refresh the page and recreate overlay
```

**Problem**: "Cannot drag overlays"
```
Solutions:
1. Click on overlay first to select it
2. Ensure mouse is over overlay area
3. Try refreshing the browser page
4. Check if overlay is within video player bounds
```

**Problem**: "Text overlay not readable"
```
Solutions:
1. Increase font size
2. Add contrasting background color
3. Choose better text color (white on dark, dark on light)
4. Add border radius for better appearance
```

#### Performance Issues

**Problem**: "Video playback is choppy"
```
Solutions:
1. Check network bandwidth (minimum 2 Mbps recommended)
2. Try lower resolution stream from camera
3. Close other bandwidth-intensive applications
4. Use wired connection instead of WiFi
```

**Problem**: "High CPU usage"
```
Solutions:
1. Use hardware acceleration in browser
2. Reduce video resolution on camera
3. Close unnecessary browser tabs
4. Consider using dedicated streaming server
```

### Browser Compatibility

#### Supported Browsers
- **Chrome 80+**: Full support with hardware acceleration
- **Firefox 75+**: Good support, may require manual codec installation
- **Safari 13+**: Limited RTSP support, best with HLS conversion
- **Edge 80+**: Similar to Chrome, good WebRTC support

#### Browser-Specific Issues

**Chrome:**
- Enable hardware acceleration: Settings → Advanced → System
- Allow autoplay: Settings → Site Settings → Media → Autoplay

**Firefox:**
- Install additional codecs if needed
- Enable WebRTC: about:config → media.navigator.enabled

**Safari:**
- Limited direct RTSP support
- Consider HLS/DASH conversion for better compatibility

### Network Configuration

#### Port Requirements
- **RTSP**: Port 554 (TCP)
- **RTP**: Ports 5004-65535 (UDP, dynamic)
- **HTTP**: Port 80/443 for web interface

#### Firewall Configuration
```bash
# Allow RTSP traffic
sudo ufw allow 554/tcp
sudo ufw allow 5004:65535/udp

# Allow web interface
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

---

## Advanced Features

### API Integration

#### Programmatic Overlay Management
```javascript
// Create overlay via API
const createOverlay = async () => {
    const response = await fetch('http://localhost:5000/api/overlays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: 'text',
            content: 'Automated Overlay',
            x: 100,
            y: 100,
            width: 200,
            height: 50
        })
    });
    return response.json();
};
```

### Batch Operations

#### Creating Multiple Overlays
Use the batch API endpoint to create multiple overlays simultaneously:
```javascript
const overlays = [
    { type: 'text', content: 'Title', x: 50, y: 50, width: 200, height: 40 },
    { type: 'text', content: 'Subtitle', x: 50, y: 100, width: 150, height: 30 }
];

fetch('http://localhost:5000/api/overlays/batch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ overlays })
});
```

### Custom Styling

#### Advanced CSS for Overlays
While the interface provides basic styling options, you can extend overlay appearance by modifying the component styles:

```css
/* Custom overlay animations */
.overlay-fade-in {
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Custom overlay shadows */
.overlay-shadow {
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
}
```

### Integration with External Systems

#### Webhook Integration
Set up webhooks to automatically update overlays based on external events:

```python
# Example webhook handler
@app.route('/webhook/update-overlay', methods=['POST'])
def webhook_update_overlay():
    data = request.get_json()
    
    # Update overlay based on webhook data
    overlay_update = {
        "content": f"Alert: {data.get('message')}",
        "color": "#ff0000" if data.get('priority') == 'high' else "#ffffff"
    }
    
    # Update existing overlay or create new one
    # Implementation depends on your requirements
    
    return jsonify({"status": "updated"})
```

#### Real-time Data Integration
Connect to external data sources for dynamic overlays:

```javascript
// Example: Weather data overlay
const updateWeatherOverlay = async () => {
    const weather = await fetch('https://api.weather.com/current');
    const data = await weather.json();
    
    await fetch('http://localhost:5000/api/overlays/weather-id', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: `${data.temperature}°C - ${data.condition}`
        })
    });
};
```

### Performance Optimization

#### Overlay Optimization Tips
1. **Limit overlay count**: Maximum 5-10 overlays for best performance
2. **Optimize text length**: Keep text concise for better readability
3. **Use appropriate font sizes**: 14-24px for most use cases
4. **Minimize animation**: Static overlays perform better than animated ones

#### Stream Optimization
1. **Choose appropriate resolution**: 720p for most applications
2. **Optimize bitrate**: 2-4 Mbps for good quality/performance balance
3. **Use efficient codecs**: H.264 is widely supported
4. **Consider sub-streams**: Use lower quality streams when possible

### Security Considerations

#### RTSP Security
- **Use strong credentials**: Avoid default passwords
- **Enable encryption**: Use RTSPS when available
- **Network segmentation**: Keep cameras on separate VLAN
- **Regular updates**: Keep camera firmware updated

#### API Security
For production deployments, implement:
- **Authentication**: JWT tokens or API keys
- **Rate limiting**: Prevent API abuse
- **HTTPS**: Encrypt all communications
- **Input validation**: Sanitize all user inputs

### Backup and Recovery

#### Database Backup
```bash
# Backup MongoDB
mongodump --db livestream_app --out backup/

# Restore MongoDB
mongorestore --db livestream_app backup/livestream_app/
```

#### Configuration Backup
Export overlay configurations:
```bash
# Export overlays
curl http://localhost:5000/api/overlays > overlays_backup.json

# Export settings
curl http://localhost:5000/api/settings > settings_backup.json
```

---

## FAQ

**Q: Can I use multiple RTSP streams simultaneously?**
A: The current version supports one stream at a time. Multi-stream support can be added as an enhancement.

**Q: What's the maximum number of overlays supported?**
A: There's no hard limit, but for performance reasons, we recommend keeping it under 10 overlays.

**Q: Can I use the app on mobile devices?**
A: Yes, the interface is responsive and works on mobile browsers, though the experience is optimized for desktop.

**Q: How do I change the video resolution?**
A: Resolution is determined by the RTSP stream source. Configure this on your camera or streaming server.

**Q: Can I export overlay configurations?**
A: Yes, use the API endpoints to export configurations as JSON files.

**Q: Is there a way to schedule overlay changes?**
A: Not directly in the UI, but you can use the API with external scheduling tools like cron jobs.

---

## Support

For additional support:
1. Check the [API Documentation](./api-documentation.md)
2. Review error messages in browser console (F12)
3. Test RTSP streams with VLC media player first
4. Verify MongoDB connection and data integrity

## Version History

- **v1.0.0**: Initial release with basic RTSP streaming and overlay management
- Future versions will include multi-stream support, advanced overlay animations, and enhanced security features.
- # Project Structure

livestream-app/
├── backend/
│   ├── app.py                 # Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example          # Environment variables template
│   ├── config.py             # Configuration settings
│   └── models/
│       ├── __init__.py
│       ├── overlay.py        # Overlay data models
│       └── settings.py       # Settings data models
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LivestreamApp.js
│   │   │   ├── VideoPlayer.js
│   │   │   ├── OverlayManager.js
│   │   │   └── Controls.js
│   │   ├── services/
│   │   │   └── api.js         # API service functions
│   │   ├── hooks/
│   │   │   └── useOverlays.js # Custom React hooks
│   │   └── utils/
│   │       └── rtsp.js        # RTSP utility functions
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── package.json
│   └── README.md
├── docs/
│   ├── API.md                # API documentation
│   ├── USER_GUIDE.md         # User documentation
│   └── DEPLOYMENT.md         # Deployment guide
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
├── scripts/
│   ├── setup.sh              # Setup script
│   ├── start.sh              # Start script
│   └── deploy.sh             # Deployment script
├── .gitignore
├── README.md
└── LICENSE

# requirements.txt
Flask==2.3.3
Flask-CORS==4.0.0
pymongo==4.5.0
python-dotenv==1.0.0
bson==0.5.10
gunicorn==21.2.0
python-multipart==0.0.6

# .env.example
MONGO_URI=mongodb://localhost:27017/
DB_NAME=livestream_app
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
PORT=5000

# package.json
{
  "name": "rtsp-livestream-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "axios": "^1.5.0",
    "tailwindcss": "^3.3.0",
    "lucide-react": "^0.263.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

# docker-compose.yml
version: '3.8'

services:
  mongodb:
    image: mongo:5.0
    container_name: livestream_mongodb
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123

  backend:
    build: 
      context: ./backend
      dockerfile: Dockerfile
    container_name: livestream_backend
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://admin:password123@mongodb:27017/livestream_app?authSource=admin
      - DB_NAME=livestream_app
      - FLASK_ENV=production
    depends_on:
      - mongodb
    volumes:
      - ./backend:/app

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: livestream_frontend
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000/api
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules

volumes:
  mongodb_data:

# Dockerfile.backend
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]

# Dockerfile.frontend
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# .gitignore
# Backend
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# Environment
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# Frontend
node_modules/
/build
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Database
*.db
*.sqlite3

# setup.sh
#!/bin/bash

echo "Setting up RTSP Livestream Application..."

# Create project directory
mkdir -p livestream-app
cd livestream-app

# Create backend structure
mkdir -p backend/models
echo "Flask backend structure created"

# Create frontend structure  
mkdir -p frontend/src/{components,services,hooks,utils}
mkdir -p frontend/public
echo "React frontend structure created"

# Create other directories
mkdir -p docs docker scripts

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Install Node.js dependencies (if Node.js is available)
if command -v npm &> /dev/null; then
    cd frontend
    npm install
    cd ..
    echo "Node.js dependencies installed"
else
    echo "Node.js not found. Please install Node.js and run 'npm install' in the frontend directory"
fi

# Setup MongoDB (instructions)
echo "
Setup complete! Next steps:

1. Install and start MongoDB:
   - Local: mongod --dbpath /data/db
   - Or use MongoDB Atlas (cloud)

2. Configure environment:
   - Copy .env.example to .env
   - Update MongoDB connection string

3. Start the backend:
   cd backend && python app.py

4. Start the frontend:
   cd frontend && npm start

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

For Docker deployment:
   docker-compose up -d
"

echo "Setup script completed successfully!"
