import React from 'react';
import { useLocation } from 'react-router-dom';
import RelatedVideos from '../components/RelatedVideos';

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();
  return (
    <section>
      <RelatedVideos id={video.id} />
    </section>
  );
}
