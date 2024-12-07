// components/Comment.tsx
import React from "react";
import Image from "next/image";

type CommentProps = {
  avatarUrl: string;
  username: string;
  content: string;
};

const Comment: React.FC<CommentProps> = ({ avatarUrl, username, content }) => {
  return (
    <div className="flex items-start space-x-4 p-4 border-b border-gray-200">
      <div className="relative w-10 h-10">
        <Image
          src={avatarUrl}
          alt={`${username}'s avatar`}
          fill
          sizes="40px"
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-800">{username}</span>
        <p className="text-gray-700 mt-1">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
