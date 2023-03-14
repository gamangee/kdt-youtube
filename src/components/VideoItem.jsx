import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DateFormatter } from '../util/date';
import { ViewCount } from '../util/views';
import styles from './VideoItem.module.css';

const VideoItem = ({ video, type }) => {
  const naviaate = useNavigate();
  const { keyword } = useParams();

  return (
    <li
      className={
        type === 'main' ? styles.mainContainer : styles.relatedContainer
      }
      onClick={() =>
        naviaate(`/videos/watch/${video.id}`, { state: { video } })
      }
    >
      <div className={styles.thumbnail}>
        <img
          className={type === 'main' ? styles.mainImg : styles.relatedImg}
          src={video.snippet.thumbnails.medium.url}
          alt={video.id}
        />
      </div>
      <div className={type === 'main' ? styles.mainInfo : styles.relatedInfo}>
        {type === 'main' && (
          <div className={styles.channelThumbnail}>
            {video.snippet.channelTitle.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div>
          <div className={styles.videoTitle}>
            {video.snippet.title.length > 50
              ? video.snippet.title.slice(0, 50) + '...'
              : video.snippet.title}
          </div>
          <div className={type === 'related' ? styles.relatedOnly : ''}>
            <div className={styles.channelTitle}>
              {video.snippet.channelTitle}
            </div>
            <div className={styles.videoEtc}>
              {type === 'main' && !keyword && (
                <span>{ViewCount(video.statistics.viewCount)}</span>
              )}
              <span className={keyword ? '' : styles.dot}></span>
              <span>{DateFormatter(video.snippet.publishedAt, 'ko')}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default VideoItem;
