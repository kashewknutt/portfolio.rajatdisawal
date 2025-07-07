import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectContent {
  id: string;
  slug: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  content: {
    link: string;
    title: string;
    billboard: string;
    description: string;
  };
  author: {
    name: string;
    image: string;
  };
}

interface ProjectsResponse {
  contents: ProjectContent[];
}

export default async function ProjectsPage() {
  const response = await fetch('https://www.wisp.blog/api/v1/cm6ycbjdr0000bxdsztqwk1zh/contents/projects?page=1&limit=10');
  const result: ProjectsResponse = await response.json();

  return (
    <div className="bg-[url(/images/BlankBackground.png)] text-justify bg-cover bg-no-repeat min-h-screen py-8">
      <div className="mx-auto max-w-4xl border-x border-borderPrimary px-4 sm:px-6">
        {/* Header */}
        <div className="text-center border-b border-borderSecondary pb-2">
          <div className="flex justify-between flex-col md:flex-row text-[10px] uppercase mb-2">
            <span>SHOWCASE</span>
            <span>INNOVATIONS & CREATIONS</span>
            <span>PROJECT SECTION</span>
          </div>
          <h1 className="font-oldEnglish text-lg sm:text-3xl mb-4">
            The Innovation Herald
          </h1>
        </div>

        {/* Projects Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {result.contents.map((project) => (
            <a 
              href={project.content.link} 
              target="_blank" 
              rel="noopener noreferrer"
            >
            <div 
              key={project.id} 
              className="border border-borderPrimary bg-primaryDark hover:bg-opacity-30 bg-opacity-0 transition-all duration-1000 ease-out origin-center p-4 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <div className="space-y-3 justify-between flex flex-col h-full">
                <div className="">
                  <div className="w-full h-40 relative">
                <Image
                  src={project.content.billboard} 
                  alt={project.content.title} 
                  className="object-cover mb-3"
                  fill
                />
                </div>
                <h2 className="font-oldEnglish text-xl border-b border-borderSecondary pb-2">
                  {project.content.title}
                </h2>
                <div className="text-xs italic">
                  Initiated: {new Date(project.publishedAt).toLocaleDateString()}
                </div>
                <p className="text-xs leading-snug first-letter:text-lg first-letter:font-serif">
                  {project.content.description}
                </p>
                </div>
                <div className="pt-4 text-[10px] italic flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full">
                    <Image
                      src={project.author.image} 
                      alt={project.author.name}
                      className="rounded-full"
                      fill
                    />
                    </div>
                    <span>By {project.author.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
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