import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Seo from '../components/shared/Seo';

interface BlogPost {
  title: string;
  description: string;
  content: string;
  author: string;
  publishedDate: string;
  modifiedDate: string;
  category: string;
}

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data: BlogPost = await response.json();
        setPost(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (isLoading) {
    return <p className="text-center text-gray-400">Loading blog post...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!post) {
    return <p className="text-center text-gray-400">Blog post not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <Seo 
        title={post.title}
        description={post.description}
        type="article"
        publishedTime={post.publishedDate}
        modifiedTime={post.modifiedDate}
        author={post.author}
        section={post.category}
        url={`https://yourdomain.com/blog/${slug}`}
      />
      
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-400 mb-4">
            <span>Published on: {new Date(post.publishedDate).toLocaleDateString()}</span>
          </div>
        </header>

        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>

        <footer className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="text-gray-400">
              <span>Category: {post.category}</span>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogPostPage;