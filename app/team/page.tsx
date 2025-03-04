import React from 'react';
import CustomCursor from '../Home/customCursor';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Karan Gill',
    role: 'Founder & CEO',
    image: '/karan.jpg',
    linkedin: 'https://www.linkedin.com/in/karangill27/',
    X: 'https://x.com/KrnGill5'
  },
  {
    name: 'Suraj Singla',
    role: 'CTO',
    image: '/suraj.jpg',
    linkedin: 'https://www.linkedin.com/in/suraj-singla-9a4343142/',
    X: 'https://x.com/surajsingla333'
  },
  {
    name: 'Ayush Pandey',
    role: 'Founding Member',
    image: '/aayush.jpg',
    linkedin: 'https://www.linkedin.com/in/ayushdefi/',
    X: 'https://x.com/aayush_defi'
  },
];

const TeamsPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <CustomCursor />
      {/* Header Section */}
      <div className="relative py-16">
        <div className="relative top-0 h-[1px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-[#00CBF7] to-transparent" />
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#00cbf7] text-center mb-4">
            Meet Our Team
          </h1>
        </div>
        <div className="relative bottom-0 h-[1px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-[#00CBF7] to-transparent mt-8" />
      </div>

      {/* Team Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-800 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                <div className="relative h-48 w-48 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-cyan-400 text-center mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.linkedin}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a
                    href={member.X}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;