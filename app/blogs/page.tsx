import { PostsResponse } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from 'react';

export default async function BlogsPage() {
  const response = await fetch('https://www.wisp.blog/api/v1/cm6ycbjdr0000bxdsztqwk1zh/posts?page=1&limit=10');
  const result: PostsResponse = await response.json();

  return (
    <div className="bg-[url(/images/BlankBackground.png)] text-justify bg-cover bg-no-repeat min-h-screen py-8">
      <div className="mx-auto max-w-4xl border-x border-borderPrimary px-4 sm:px-6">
        {/* Header */}
        <div className="text-center border-b border-borderSecondary pb-2">
          <div className="flex justify-between flex-col md:flex-row text-[10px] uppercase mb-2">
            <span>EDITORIAL</span>
            <span>THOUGHTS AND MUSINGS</span>
            <span>BLOG SECTION</span>
          </div>
          <h1 className="font-oldEnglish text-lg sm:text-3xl mb-4">
            The Digital Chronicle
          </h1>
        </div>

        {/* Blog Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8">
          {result.posts.map((post, index) => (
            <Link key={post.id + index} href={`blogs/${post.slug}`}>
                <div className="border-b border-borderPrimary bg-primaryDark hover:bg-opacity-30 bg-opacity-0 transition duration-1000 ease-out cursor-pointer origin-center grid grid-cols-1 md:grid-cols-[auto,1fr] p-2">
                <div className="aspect-[16/9] relative md:h-28 mb-2 md:mb-0 md:mr-2">
                  {post.image ? (
                  <Image
                    alt={post.title}
                    className="object-cover"
                    src={post.image}
                    fill
                  />
                  ) : (
                  <Image 
                    src="https://placehold.co/600x400" 
                    alt="placeholder"
                    className="object-cover"
                    fill
                  />
                  )}
                </div>
                <div className="border-t md:border-l md:border-t-0 border-borderPrimary pt-2 md:pt-0 pl-2 space-y-2">
                  <h2 className="font-oldEnglish text-xl">
                  {post.title}
                  </h2>
                  <div className="text-xs italic">
                  {new Date(post.published ? post.updatedAt : post.updatedAt).toLocaleString()}
                  </div>
                  <p className="text-xs leading-snug first-letter:text-lg first-letter:font-serif">
                  {post.description}
                  </p>
                  <div className="text-[10px] uppercase">
                  {post.tags.map((tag) => (
                    <span key={tag.id} className="mr-2">
                    #{tag.name}
                    </span>
                  ))}
                  </div>
                </div>
                </div>
            </Link>
          ))}
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
}