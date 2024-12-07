"use client";

import { useState } from "react";
import { useCreatePost } from "@/app/hooks/createPost";
import Image from "next/image";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { createPost, loading } = useCreatePost();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost({ title, content, image });
  };

  return (
    <div className="min-h-screen bg-[var(--foreground)]">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-[var(--background)] p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
            Create a Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-bold text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-bold text-gray-700"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                rows={4}
                required
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-bold text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />

              {imagePreview && (
                <div className="mt-4">
                  <Image
                    src={imagePreview}
                    alt="Image Preview"
                    className="w-32 h-32 object-cover rounded-md"
                    width={128}
                    height={128}
                  />
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-md border border-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 font-bold"
              >
                {loading ? "Creating..." : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
