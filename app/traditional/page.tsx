'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { landingAbout } from '@/lib/content';
import { Gossip, GossipsResponse, Post, PostsResponse } from '@/lib/types';
import Image from 'next/image';


const TraditionalPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = React.useState<Post[]>([]);
  const [gossipsData, setGossipsData] = React.useState<Gossip[]>([]);

  React.useEffect(() => {
    fetchBlogs();
    fetchGossips();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('https://www.wisp.blog/api/v1/cm6ycbjdr0000bxdsztqwk1zh/posts?page=1&limit=3');
      const data: PostsResponse = await res.json();
      setBlogs(data.posts || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGossips = async () => {
    try {
      const res = await fetch('https://www.wisp.blog/api/v1/cm6ycbjdr0000bxdsztqwk1zh/contents/gossips?page=1&limit=3');
      const gossipsRes: GossipsResponse = await res.json();
      setGossipsData(gossipsRes.contents || []);
    } catch (error) {
      console.error(error);
    }
  };

  const getResume = (): void => {
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = '/data/RajatDisawalResume.pdf';
    link.download = 'RajatDisawalResume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="bg-[url(/images/BlankBackground.png)] text-justify bg-cover bg-no-repeat min-h-screen py-8">
      <div className="mx-auto max-w-4xl border-x border-borderPrimary px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center border-b border-borderSecondary pb-2">
          <div className="flex justify-between flex-col md:flex-row text-[10px] uppercase mb-2">
            <span>VOL. 00001</span>
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>NO.007</span>
          </div>
          <h1 className="font-oldEnglish text-3xl sm:text-5xl mb-4">
            Rajat Disawal
          </h1>
        </div>

        {/* Main Content */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Article */}
          <div className="md:col-span-8 border-b md:items-center md:justify-center md:border-b-0 md:border-r border-borderPrimary pb-4 md:pb-0 md:pr-4">
            <h2 className="text-2xl sm:text-3xl font-hennypenny font-light mb-2">
              GOSSIP OF THE TECH WORLD
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className="md:col-span-2">
              <h3 className="text-lg sm:text-xl font-serif italic mb-4">
                &ldquo;He might be the next thing...&rdquo;
              </h3>
              <h3 className="text-xs mb-2 italic">Meet the Maestro: Musician, AI Developer, and Critical Thinker!</h3>
              </div>
                <div onClick={getResume} className="border border-borderPrimary bg-primaryDark hover:bg-opacity-30 bg-opacity-0 transition duration-1000 ease-out cursor-pointer origin-center m-2 text-sm flex items-center justify-center overflow-hidden">
                <button className="">Get Resume</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <p className="text-xs leading-snug first-letter:text-lg first-letter:font-serif">
                  {/* {redirections[0].description} */}
                  {landingAbout[0]}
                  <br/>
                  {landingAbout[1]}
                </p>
              </div>
              <div className='relative w-full'>
                <Image className='p-2' src="/images/landingPortrait.jpg" alt="Rajat Disawal Profile" fill/>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 pt-4 md:pt-0">
            {blogs.length > 0 ? (
              <div className="border border-borderPrimary p-3 mb-4">
                <h4 className="text-sm font-serif mb-2">Latest Blogs</h4>
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => router.push(`/blogs/${blog.slug}`)}
                    className="border-b border-borderPrimary p-3 bg-primaryDark transition duration-1000 ease-out cursor-pointer hover:bg-opacity-30 bg-opacity-0 last:border-0"
                  >
                    <h5 className="text-xs uppercase font-bold">{blog.title}</h5>
                    <p className="text-xs italic leading-tight">{blog.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-borderPrimary p-3 mb-4">
                <h4 className="text-sm font-serif mb-2">Latest Blogs</h4>
                <div className="border-b border-borderPrimary h-1/3 pb-2 mb-2 last:mb-0 last:pb-0 last:border-0">
                  <h5 className="text-xs uppercase font-bold">Loading...</h5>
                  <p className="text-xs italic leading-tight">Please wait...</p>
                </div>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          {/* This is going to be a horizontal words banner animated with a horizontally sliding tech words or domains */}
          <div className="mt-4 border-borderPrimary col-span-1 md:col-span-12 border-y">
            <div className="overflow-hidden whitespace-nowrap">
              <div className="animate-slide">
                {['Python', 'AI AGENTS', 'RAG Chatbots','JavaScipt', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS'].map((tech, index) => (
                  <span key={index} className="mx-4 text-sm uppercase">{tech}</span>
                ))}
              </div>
            </div>

            <style jsx>{`
              @keyframes slide {
                0% {
                  transform: translateX(100%);
                }
                100% {
                  transform: translateX(-100%);
                }
              }
              .animate-slide {
                animation: slide 20s linear infinite;
              }
              
              .animate-slide:hover {
                animation-play-state: paused;
              }
            `}</style>
          </div>

          {/* Bottom Section </div>*/}
          <div className="col-span-1 md:col-span-12 mt-4">
            <div className="bg-transparent border border-borderSecondary py-2">
              <h3 className="text-lg font-serif italic text-center">
                Gossips
              </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 px-4">
                {gossipsData.map((gossip, index) => (
                  <div key={index} className="">
                  <p className="text-xs">{gossip.content.description}</p>
                  </div>
                ))}
                </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="col-span-1 md:col-span-12 mt-4 border-t border-borderSecondary pt-2">
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
    </div>
  );
};

export default TraditionalPage;