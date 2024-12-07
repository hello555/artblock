"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";
import { useUserSession } from "@/app/hooks/userSession";
import Comment from "@/app/components/comment";
import Image from "next/image";

type Post = {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
};

type CommentData = {
  avatarUrl: string;
  userName: string;
  content: string;
};

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams();
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState("");

  const { user } = useUserSession();

  useEffect(() => {
    if (!id) return;

    const fetchPostAndComments = async () => {
      try {
        const { data: postData, error: postError } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (postError) {
          throw new Error(`Error fetching post: ${postError.message}`);
        }

        setPost(postData);

        const { data: commentsData, error: commentsError } = await supabase
          .from("comments")
          .select("*")
          .eq("post_id", id)
          .order("created_at", { ascending: false });

        if (commentsError) {
          throw new Error(`Error fetching comments: ${commentsError.message}`);
        }

        setComments(
          commentsData.map((comment) => ({
            avatarUrl:
              comment.avatar_url ||
              "https://avatars.githubusercontent.com/u/9919?v=4",
            userName: comment.user_name || "Anonymous",
            content: comment.content,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handlePostComment = async () => {
    if (newComment.trim() === "" || !user) return;

    const newCommentData: CommentData = {
      avatarUrl:
        user.user_metadata?.avatar_url ||
        "https://avatars.githubusercontent.com/u/9919?v=4",
      userName: user.user_metadata?.user_name || "Anonymous",
      content: newComment,
    };

    const { error } = await supabase.from("comments").insert([
      {
        post_id: id,
        content: newComment,
        user_name: newCommentData.userName,
        avatar_url: newCommentData.avatarUrl,
      },
    ]);

    if (error) {
      console.error("Error posting comment:", error.message);
      return;
    }

    setComments([newCommentData, ...comments]);
    setNewComment("");
  };

  if (!post) return <div>Loading post...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--foreground)]">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 pt-4 mt-4">
        {post.image_url && (
          <div className="w-full h-[50vh] mb-2 overflow-hidden rounded-lg relative">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <h1 className="text-4xl font-semibold text-center text-gray-900 mb-1">
          {post.title}
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">{post.content}</p>
        <div className="bg-white p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">comments</h2>
          <textarea
            className="w-full p-3 border border-gray-300 mb-4 rounded-lg text-gray-900"
            rows={1}
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            onClick={handlePostComment}
            className="w-full py-2 bg-gray-900 text-white border-2 border-gray-900 font-bold rounded-lg hover:bg-white hover:text-gray-900 hover:border-gray-900 transition"
            disabled={!user || newComment.trim() === ""}
          >
            post comment
          </button>
        </div>
        <div className="mt-6">
          {comments.map((comment, index) => (
            <Comment
              key={index}
              avatarUrl={comment.avatarUrl}
              username={comment.userName}
              content={comment.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
