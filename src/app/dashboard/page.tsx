"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import Post from "@/app/components/post";

type PostData = {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
};

//Get posts for Dashboard
export default function Dashboard() {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        console.log("Fetched Posts:", data);
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--foreground)]">
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          latest posts
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              image_url={post.image_url}
              title={post.title}
              content={post.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
