import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MusicContent {
  id: string;
  slug: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  content: {
    tags?: string[];
    draft?: boolean;
    image?: string;
    title: string;
    author: string;
    fileUrl: string;
    composer?: string;
    lyricist?: string;
    description: string;
    publishedAt: string;
  };
  author: {
    name: string;
    image: string;
  };
}

interface MusicResponse {
  contents: MusicContent[];
}

export default async function MusicPage() {
  const response = await fetch('https://www.wisp.blog/api/v1/cm6ycbjdr0000bxdsztqwk1zh/contents/music?page=1&limit=20');
  const result: MusicResponse = await response.json();

  return (
    <div className="bg-[url(/images/BlankBackground.png)] text-justify bg-cover bg-no-repeat min-h-screen py-8">
      <div className="mx-auto max-w-4xl border-x border-borderPrimary px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center border-b border-borderSecondary pb-2">
          <div className="flex justify-between flex-col md:flex-row text-[10px] uppercase mb-2">
            <span>EDITORIAL</span>
            <span>MUSICAL PIECES</span>
            <span>THE DIGITAL CHRONICLE</span>
          </div>
          <h1 className="font-oldEnglish text-lg sm:text-3xl mb-4">Music Library</h1>
        </div>

        {/* Grid of Music Items */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-8">
          {result.contents.map((post, index) => (
            <Link key={post.id + index} href={`/music/${post.slug}`}>
              <div className="border-b border-borderPrimary h-full bg-primaryDark hover:bg-opacity-30 bg-opacity-0 transition duration-1000 ease-out cursor-pointer origin-center grid grid-cols-1 md:grid-cols-[auto,1fr] p-2">
                
                {/* Square Image */}
                <div className="relative aspect-square w-full md:w-28 mb-2 md:mb-0 md:mr-2">
                  {post.content.image ? (
                    <Image
                      alt={post.content.title}
                      src={post.content.image}
                      fill
                      className="object-cover rounded"
                    />
                  ) : (
                    <Image
                      src="https://placehold.co/600x600"
                      alt="placeholder"
                      fill
                      className="object-cover rounded"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="border-t md:border-l md:border-t-0 border-borderPrimary pt-2 md:pt-0 pl-2 space-y-2">
                  <h2 className="font-oldEnglish text-xl">{post.content.title}</h2>
                  <div className="text-xs italic">
                    {new Date(post.content.publishedAt || post.updatedAt).toLocaleString()}
                  </div>
                  {post.content.description && (
                    <p className="text-xs leading-snug first-letter:text-lg first-letter:font-serif">
                      {post.content.description}
                    </p>
                  )}
                  <div className="text-[10px] uppercase relative flex flex-wrap">
                    {(post.content.tags || []).map((tag) => (
                      <span key={tag} className="mr-2">#{tag}</span>
                    ))}
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Footer Navigation */}
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
