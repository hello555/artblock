// hooks/useCreatePost.ts
import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface PostData {
  title: string;
  content: string;
  image: File | null;
}

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createPost = async ({ title, content, image }: PostData) => {
    setLoading(true);

    const { data: userData, error: userError } = await supabase.auth.getSession();

    if (userError || !userData?.session?.user) {
      setLoading(false);
      alert("User not found. Please log in again.");
      return;
    }

    const { user } = userData.session;

    // Upload image to Supabase Storage
    let imageUrl = "";
    if (image) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("post_images")
        .upload(fileName, image);

      if (uploadError) {
        setLoading(false);
        alert("Error uploading image: " + uploadError.message);
        return;
      }

      // Get public URL for uploaded image
      const { data } = supabase.storage.from("post_images").getPublicUrl(fileName);

      if (!data?.publicUrl) {
        setLoading(false);
        alert("Error retrieving image URL.");
        return;
      }

      imageUrl = data.publicUrl;
    }

    // Insert post data into the database
    const { error } = await supabase.from("posts").upsert({
      title,
      content,
      user_id: user.id,
      created_at: new Date(),
      image_url: imageUrl,
    });

    setLoading(false);

    if (error) {
      alert("Error creating post: " + error.message);
    } else {
      alert("Post created successfully!");
      router.push("/dashboard");
    }
  };

  return { createPost, loading };
};
