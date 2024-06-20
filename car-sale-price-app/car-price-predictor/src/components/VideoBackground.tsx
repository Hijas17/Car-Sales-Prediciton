// src/components/VideoBackground.tsx
import React from 'react';
import videoSrc from '../assets/lexus.mp4';

const VideoBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
