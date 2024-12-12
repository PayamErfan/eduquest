import Navbar from '@/components/Navbar';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center w-full max-w-screen-lg mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
          Get In Touch
        </h1>
        <h3 className="text-xl text-gray-600 text-center mb-8">
          Reach out and contact us regarding any questions or concerns!
        </h3>
        <div className="relative w-full">
          {/* Google Form Embed */}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfT7KPR0kGO75cxGeZ3TnSOp2Heyn3I7VXQaXr8IelFKbyP4w/viewform?embedded=true"
            width="100%"
            height="800"
            className="w-full rounded-lg border-0"
            scrolling="yes"
          >
            Loading…
          </iframe>
        </div>
      </div>
      {/* Right Image - Pink Squiggle */}
      <img
        src="/images/pink_squiggle.png"
        alt="Pink Squiggle"
        className="absolute -right-0 top-12 w-80 h-90"
      />
      {/* Left Image - Yellow Squiggle */}
      <img
        src="/images/yello_squigle.png"
        alt="Yellow Squiggle"
        className="absolute -left-0 bottom-0 w-80 h-90"
      />
    </div>
  );
}
