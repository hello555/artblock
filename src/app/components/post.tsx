"use client";
import Image from "next/image";
import Link from "next/link";

type PostProps = {
  image_url?: string;
  title: string;
  content: string;
  id: number;
};

const Post = ({ image_url, title, content, id }: PostProps) => {
  console.log("Post ID:", id);

  return (
    <Link href={`/posts/${id}`} passHref>
      <div className="bg-white border p-4 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
        {image_url && (
          <div className="w-full aspect-square mb-4 overflow-hidden">
            <Image
              src={image_url}
              alt={title}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <h2 className="text-lg font-bold text-gray-800 mb-2 tracking-widest">
          {title}
        </h2>

        <p className="text-xs text-gray-600 text-center">{content}</p>
      </div>
    </Link>
  );
};

export default Post;
