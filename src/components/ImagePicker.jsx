import React, { useRef, useState } from 'react';
import { PRESET_IMAGES } from '../constants/presetImages';
import { Upload, Link, Check, Image as ImageIcon } from 'lucide-react';

export function ImagePicker({ currentImageUrl, onSelectImage }) {
  const fileInputRef = useRef(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, etc.).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onSelectImage(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    // Test load image before confirming
    const img = new Image();
    img.onload = () => {
      onSelectImage(customUrl.trim());
      setShowUrlInput(false);
      setCustomUrl('');
      setUrlError('');
    };
    img.onerror = () => {
      setUrlError('Could not load image from this URL. Please verify the link.');
    };
    img.src = customUrl.trim();
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-6">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
          <span>Select Photo or Upload</span>
        </div>
        <div className="flex items-center gap-2">
          {/* File Upload Trigger */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-medium text-purple-300 hover:text-purple-200 glass-button px-2.5 py-1 rounded-lg flex items-center gap-1 transition"
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* Web URL Trigger */}
          <button
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] font-medium text-indigo-300 hover:text-indigo-200 glass-button px-2.5 py-1 rounded-lg flex items-center gap-1 transition"
          >
            <Link className="w-3 h-3" />
            <span>Image URL</span>
          </button>
        </div>
      </div>

      {/* URL Input Form Collapsible */}
      {showUrlInput && (
        <form onSubmit={handleUrlSubmit} className="mb-3 p-3 glass-panel rounded-xl border border-indigo-500/30">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Paste direct image link (e.g., https://...jpg)"
              value={customUrl}
              onChange={(e) => {
                setCustomUrl(e.target.value);
                setUrlError('');
              }}
              className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
            >
              Apply
            </button>
          </div>
          {urlError && <p className="text-xs text-rose-400 mt-1">{urlError}</p>}
        </form>
      )}

      {/* Preset Thumbnails Carousel / Row */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x">
        {PRESET_IMAGES.map((img) => {
          const isSelected = currentImageUrl === img.url;
          return (
            <button
              key={img.id}
              onClick={() => onSelectImage(img.url)}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition transform active:scale-95 group snap-start ${
                isSelected
                  ? 'border-purple-400 ring-4 ring-purple-500/30 scale-105'
                  : 'border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-600'
              }`}
              title={img.title}
            >
              <img
                src={img.thumbnail}
                alt={img.title}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                <span className="text-[9px] font-medium text-slate-200 truncate w-full text-left">
                  {img.title}
                </span>
              </div>
              {isSelected && (
                <div className="absolute top-1 right-1 bg-purple-500 rounded-full p-0.5 text-white shadow">
                  <Check className="w-2.5 h-2.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
