"use client";

import { useState, useRef } from "react";
import { X, Loader2, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB");
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `products/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

      const formData = new FormData();
      formData.append("file", file, fileName);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await uploadRes.json();
      if (!uploadRes.ok || !data.url) throw new Error(data.error || "Upload failed");

      setPreview(data.url);
      onChange(data.url);
    } catch {
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setPreview("");
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      {preview ? (
        <div className="relative rounded-lg border border-border overflow-hidden group">
          <img
            src={preview}
            alt="Product image preview"
            className="w-full h-48 object-cover"
            onError={() => setPreview("")}
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-8 rounded-lg border-2 border-dashed border-border bg-neutral text-center cursor-pointer hover:border-primary/50 hover:bg-neutral-100 transition-all group"
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin" />
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-neutral-300 mx-auto mb-3 group-hover:text-primary transition-colors" />
              <p className="text-sm text-neutral-400">Click to upload product image</p>
              <p className="text-xs text-neutral-300 mt-1">PNG, JPG, WebP (Max 5MB)</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
