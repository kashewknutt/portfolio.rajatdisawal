'use client'
import { useParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const PostPage = () => {
  const { slug } = useParams();

  interface Post {
    id: string;
    title: string;
    image: string;
    content: string;
    description: string;
    slug: string;
    authorId: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    metadata: Record<string, unknown>;
    author: {
      name: string;
      image: string;
    };
    tags: {
      id: string;
      name: string;
    }[];
  }

  const [post, setPost] = React.useState<Post | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`https://www.wisp.blog/api/v1/cm6ycbjdr0000bxdsztqwk1zh/posts/${slug}`);
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return (
    <div className="bg-[url(/images/BlankBackground.png)] text-justify bg-cover bg-no-repeat min-h-screen py-8">
      <div className="mx-auto max-w-4xl border-x border-borderPrimary px-4 sm:px-6">
        <p className="text-center font-oldEnglish text-2xl">Loading...</p>
      </div>
    </div>
  );
  
  if (!post) return (
    <div className="bg-[url(/images/BlankBackground.png)] text-justify bg-cover bg-no-repeat min-h-screen py-8">
      <div className="mx-auto max-w-4xl border-x border-borderPrimary px-4 sm:px-6">
        <p className="text-center font-oldEnglish text-2xl">Post not found</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[url(/images/BlankBackground.png)] text-justify bg-cover bg-no-repeat min-h-screen py-8">
      <div className="mx-auto max-w-4xl border-x border-borderPrimary px-4 sm:px-6">
        {/* Header */}
        <div className="text-center border-b border-borderSecondary pb-2">
          <div className="flex justify-between flex-col md:flex-row text-[10px] uppercase mb-2">
            <span>{new Date(post.publishedAt || post.updatedAt).toLocaleDateString()}</span>
            <span>THE DIGITAL CHRONICLE</span>
            <span>FEATURE ARTICLE</span>
          </div>
        </div>

        {/* Article Content */}
        <article className="mt-8">
          {/* Title Section */}
          <div className="mb-8 text-center">
            <h1 className="font-oldEnglish text-3xl sm:text-4xl mb-4">{post.title}</h1>
            <div className="text-xs italic mb-2">
              By {post.author.name} | {new Date(post.publishedAt || post.updatedAt).toLocaleString()}
            </div>
            <div className="text-[10px] uppercase">
              {post.tags.map((tag) => (
                <span key={tag.id} className="mr-2">#{tag.name}</span>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-8">
              <Image
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <p className="text-sm italic leading-relaxed first-letter:text-3xl first-letter:font-serif first-letter:mr-1">
              {post.description}
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-sm max-w-none">
            <div 
              className="text-sm leading-relaxed columns-1 md:columns-2 gap-8"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/<h2/g, '<h2 class="font-hennypenny text-xl mt-4 mb-2"')
                  .replace(/<p>/g, '<p class="mb-4">') 
              }} 
            />
          </div>
        </article>

        {/* Author Section */}
        <div className="mt-12 border-t border-borderPrimary pt-4">
          <div className="flex items-center">
            {post.author.image && (
              <Image 
                src={post.author.image} 
                alt={post.author.name}
                className="w-12 h-12 rounded-full mr-4"
              />
            )}
            <div>
              <p className="font-oldEnglish text-sm">{post.author.name}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 border-t border-borderSecondary pt-2">
          <ul className="flex flex-wrap justify-between text-[10px] uppercase gap-2">
            {[
              { name: 'Home', link: '/traditional' },
              { name: 'Projects', link: '/projects' },
              { name: 'Blogs', link: '/blogs' },
              { name: 'Music', link: '/music' },
              { name: 'Services', link: '/services' },
              { name: 'Contact', link: '/contact' }
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className="hover:text-textPrimaryDark transition-duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PostPage;