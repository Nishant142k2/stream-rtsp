import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Settings, Plus, Edit2, Trash2, Move, RotateCcw } from 'lucide-react';

const LivestreamApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [rtspUrl, setRtspUrl] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [overlays, setOverlays] = useState([]);
  const [selectedOverlay, setSelectedOverlay] = useState(null);
  const [showOverlayForm, setShowOverlayForm] = useState(false);
  const [draggedOverlay, setDraggedOverlay] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Default RTSP URLs for testing
  const defaultUrls = [
    'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov',
    'rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp',
    'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov'
  ];

  const [overlayForm, setOverlayForm] = useState({
    id: null,
    type: 'text',
    content: '',
    x: 50,
    y: 50,
    width: 200,
    height: 50,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 4
  });

  // Simulate video play/pause (in real implementation, this would control RTSP stream)
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  const addOverlay = () => {
    const newOverlay = {
      ...overlayForm,
      id: Date.now(),
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50
    };
    setOverlays([...overlays, newOverlay]);
    setShowOverlayForm(false);
    resetOverlayForm();
  };

  const updateOverlay = () => {
    setOverlays(overlays.map(overlay => 
      overlay.id === overlayForm.id ? overlayForm : overlay
    ));
    setShowOverlayForm(false);
    resetOverlayForm();
  };

  const deleteOverlay = (id) => {
    setOverlays(overlays.filter(overlay => overlay.id !== id));
    setSelectedOverlay(null);
  };

  const editOverlay = (overlay) => {
    setOverlayForm(overlay);
    setShowOverlayForm(true);
  };

  const resetOverlayForm = () => {
    setOverlayForm({
      id: null,
      type: 'text',
      content: '',
      x: 50,
      y: 50,
      width: 200,
      height: 50,
      fontSize: 16,
      color: '#ffffff',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 4
    });
  };

  const handleMouseDown = (e, overlay) => {
    e.preventDefault();
    setDraggedOverlay(overlay);
    const rect = containerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left - overlay.x,
      y: e.clientY - rect.top - overlay.y
    });
  };

  const handleMouseMove = (e) => {
    if (draggedOverlay && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      
      setOverlays(overlays.map(overlay =>
        overlay.id === draggedOverlay.id
          ? { ...overlay, x: Math.max(0, newX), y: Math.max(0, newY) }
          : overlay
      ));
    }
  };

  const handleMouseUp = () => {
    setDraggedOverlay(null);
  };

  useEffect(() => {
    if (draggedOverlay) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedOverlay, overlays, dragOffset]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            RTSP Livestream Studio
          </h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* RTSP URL Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">RTSP Stream URL</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={rtspUrl}
              onChange={(e) => setRtspUrl(e.target.value)}
              placeholder="rtsp://your-stream-url"
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400"
            />
            <select 
              onChange={(e) => setRtspUrl(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400"
            >
              <option value="">Quick Select</option>
              {defaultUrls.map((url, index) => (
                <option key={index} value={url}>Demo Stream {index + 1}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <div 
              ref={containerRef}
              className="relative bg-black rounded-xl overflow-hidden shadow-2xl aspect-video"
            >
              {/* Placeholder for RTSP stream - In production, use WebRTC or HLS.js */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23000'/%3E%3Ctext x='400' y='225' text-anchor='middle' fill='%23666' font-family='Arial' font-size='24'%3ERTSP Stream Placeholder%3C/text%3E%3C/svg%3E"
              >
                {/* In production, you'd use a WebRTC player or convert RTSP to HLS/DASH */}
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              </video>

              {/* Overlays */}
              {overlays.map((overlay) => (
                <div
                  key={overlay.id}
                  className={`absolute cursor-move select-none ${selectedOverlay?.id === overlay.id ? 'ring-2 ring-blue-400' : ''}`}
                  style={{
                    left: overlay.x,
                    top: overlay.y,
                    width: overlay.width,
                    height: overlay.height,
                    fontSize: overlay.fontSize,
                    color: overlay.color,
                    backgroundColor: overlay.backgroundColor,
                    borderRadius: overlay.borderRadius,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, overlay)}
                  onClick={() => setSelectedOverlay(overlay)}
                >
                  {overlay.type === 'text' ? overlay.content : '🖼️ Logo'}
                  {selectedOverlay?.id === overlay.id && (
                    <div className="absolute -top-8 left-0 flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          editOverlay(overlay);
                        }}
                        className="p-1 bg-blue-500 rounded text-xs"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteOverlay(overlay.id);
                        }}
                        className="p-1 bg-red-500 rounded text-xs"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded">
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 accent-blue-500"
                    />
                    <span className="text-sm w-8">{volume}</span>
                  </div>

                  <div className="flex-1"></div>
                  
                  <div className="text-sm opacity-75">
                    {rtspUrl ? '🟢 Connected' : '🔴 No Stream'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay Management Panel */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Overlays</h3>
                <button
                  onClick={() => setShowOverlayForm(true)}
                  className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {overlays.map((overlay) => (
                  <div
                    key={overlay.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedOverlay?.id === overlay.id
                        ? 'bg-blue-500/20 border-blue-400'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedOverlay(overlay)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">
                          {overlay.type === 'text' ? '📝' : '🖼️'} {overlay.content || 'Logo'}
                        </div>
                        <div className="text-xs opacity-75">
                          {overlay.x}, {overlay.y} • {overlay.width}x{overlay.height}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            editOverlay(overlay);
                          }}
                          className="p-1 hover:bg-white/20 rounded"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteOverlay(overlay.id);
                          }}
                          className="p-1 hover:bg-white/20 rounded text-red-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stream Stats */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <h3 className="text-lg font-semibold mb-2">Stream Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={rtspUrl ? 'text-green-400' : 'text-red-400'}>
                    {rtspUrl ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Overlays:</span>
                  <span>{overlays.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Resolution:</span>
                  <span>1920x1080</span>
                </div>
                <div className="flex justify-between">
                  <span>Bitrate:</span>
                  <span>2.5 Mbps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Form Modal */}
      {showOverlayForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-white/20">
            <h3 className="text-xl font-semibold mb-4">
              {overlayForm.id ? 'Edit Overlay' : 'Add New Overlay'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={overlayForm.type}
                  onChange={(e) => setOverlayForm({...overlayForm, type: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400"
                >
                  <option value="text">Text</option>
                  <option value="logo">Logo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <input
                  type="text"
                  value={overlayForm.content}
                  onChange={(e) => setOverlayForm({...overlayForm, content: e.target.value})}
                  placeholder={overlayForm.type === 'text' ? 'Enter text...' : 'Logo URL...'}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Width</label>
                  <input
                    type="number"
                    value={overlayForm.width}
                    onChange={(e) => setOverlayForm({...overlayForm, width: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height</label>
                  <input
                    type="number"
                    value={overlayForm.height}
                    onChange={(e) => setOverlayForm({...overlayForm, height: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Font Size</label>
                <input
                  type="number"
                  value={overlayForm.fontSize}
                  onChange={(e) => setOverlayForm({...overlayForm, fontSize: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Text Color</label>
                  <input
                    type="color"
                    value={overlayForm.color}
                    onChange={(e) => setOverlayForm({...overlayForm, color: e.target.value})}
                    className="w-full h-10 bg-white/10 border border-white/20 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Background</label>
                  <input
                    type="color"
                    value={overlayForm.backgroundColor.replace('rgba(0,0,0,0.5)', '#000000')}
                    onChange={(e) => setOverlayForm({...overlayForm, backgroundColor: e.target.value})}
                    className="w-full h-10 bg-white/10 border border-white/20 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowOverlayForm(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={overlayForm.id ? updateOverlay : addOverlay}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                {overlayForm.id ? 'Update' : 'Add'} Overlay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivestreamApp;
