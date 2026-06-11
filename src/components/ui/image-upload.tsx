"use client";

import { useState, useRef } from "react";
import { X, Loader2, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
}

export function ImageUpload({ values, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
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
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

      const formData = new FormData();
      formData.append("file", file, fileName);

      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await uploadRes.json();

      if (!uploadRes.ok || !data.url) throw new Error(data.error || "Upload failed");

      onChange([...values, data.url]);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      {values.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {values.map((url, i) => (
            <div key={i} className="relative rounded-lg border border-border overflow-hidden group aspect-square bg-neutral">
              <img
                src={url}
                alt={`Image ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`p-6 rounded-lg border-2 border-dashed border-border bg-neutral text-center cursor-pointer hover:border-primary/50 hover:bg-neutral-100 transition-all group ${uploading ? "pointer-events-none" : ""}`}
      >
        {uploading ? (
          <Loader2 className="w-6 h-6 text-primary mx-auto animate-spin" />
        ) : (
          <>
            <ImageIcon className="w-6 h-6 text-neutral-300 mx-auto mb-2 group-hover:text-primary transition-colors" />
            <p className="text-sm text-neutral-400">Click to upload another image</p>
          </>
        )}
      </div>
    </div>
  );
}
