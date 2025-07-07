import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AlphaTabViewer from "./AlphaTabViewer";

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

interface MusicAPIResponse {
  content: MusicContent;
}

export default async function MusicSlugPage({ params }: { params: { slug: string } }) {
  const res = await fetch(
    `https://www.wisp.blog/api/v1/cm6ycbjdr0000bxdsztqwk1zh/contents/music/${params.slug}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return notFound();

  const { content: music } = (await res.json()) as MusicAPIResponse;

  return (
    <div className="bg-[url(/images/BlankBackground.png)] bg-cover bg-no-repeat min-h-screen py-8 text-justify">
      <div className="mx-auto max-w-4xl border-x border-borderPrimary px-4 sm:px-6">
        
        {/* Header Block */}
        <div className="text-center border-b border-borderSecondary pb-2 relative">
          {/* Top Metadata Row */}
          <div className="flex justify-between flex-col md:flex-row text-[10px] uppercase mb-2">
            <span>EDITORIAL</span>
            <span>MUSICAL PIECES</span>
            <span>THE DIGITAL CHRONICLE</span>
          </div>
          
          {/* Title */}
          <h1 className="font-oldEnglish text-lg sm:text-3xl mb-4">
            {music.content.title}
          </h1>
          
        </div>

        {/* Metadata */}
        <div className={`text-xs italic mt-4 mb-6 space-y-1 ${music.content.image ? 'sm:flex sm:justify-between sm:items-start' : 'sm:text-left text-center'}`}>
          <div className={`${music.content.image ? 'md:w-3/4' : 'w-full'}`}>
            <div>By {music.content.author}</div>
            {music.content.composer && <div>Composer: {music.content.composer}</div>}
            {music.content.lyricist && <div>Lyricist: {music.content.lyricist}</div>}
            <div>
              Published: {new Date(music.content.publishedAt).toLocaleDateString()}
            </div>
          </div>
          {music.content.image && (
            <div className="relative md:w-20 md:h-20 w-20 h-20 mt-4 md:mt-0 md:ml-4 rounded overflow-hidden border border-borderPrimary">
              <Image
            src={music.content.image}
            alt={music.content.title}
            fill
            className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Description */}
        {music.content.description && (
          <p className="text-sm leading-relaxed mb-6 first-letter:text-lg first-letter:font-serif">
            {music.content.description}
          </p>
        )}

        {/* AlphaTab Viewer */}
        <AlphaTabViewer fileUrl={music.content.fileUrl} />

        {/* Tags */}
        { music.content.tags ? music.content.tags?.length > 0 && (
          <div className="mt-6 text-[10px] uppercase">
            {music.content.tags.map((tag) => (
              <span key={tag} className="mr-2">#{tag}</span>
            ))}
          </div>
        ) : (<></>)}

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
