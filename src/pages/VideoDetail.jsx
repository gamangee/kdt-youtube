import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useYoutubeApi } from '../context/ApiContext';
import ChannelInfo from './ChannelInfo';
import styles from './VideoDetail.module.css';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { BsShare, BsSave } from 'react-icons/bs';
import RelatedVideos from '../components/RelatedVideos';
import Comment from '../components/comment/Comment';

export default function VideoDetail() {
  const [queryResult, setQueryResult] = useState({});

  const {
    state: { video },
  } = useLocation();

  const { videoId } = useParams();
  const { youtube } = useYoutubeApi();

  useEffect(() => {
    youtube.searchId(videoId).then((res) => setQueryResult(res));
  }, [videoId, youtube]);

  const { contentDetails, snippet, statistics } = queryResult
    ? queryResult
    : '';

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'm';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'k';
    } else {
      return num.toString();
    }
  }

  const convertedDate = (str) => {
    return str.slice(0, 10).replaceAll('-', '.');
  };

  return (
    <>
      <div>
        {contentDetails ? (
          <div className={styles.wrapper}>
            <div className={styles.channelInfo}>
              <article>
                <div className={styles.videoContainer}>
                  <iframe
                    title={snippet.title}
                    width='100%'
                    height='600'
                    alt='youtube#video'
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameborder='0'
                    style={{ borderRadius: 8 }}
                  />
                </div>
                <h3>{snippet.title}</h3>
              </article>
              <section className={styles.channelAndLikes}>
                <ChannelInfo playerSnippet={snippet} />
                <ul className={styles.lists}>
                  <li className={styles.list}>
                    <button className={styles.buttons}>
                      <FaThumbsUp />
                      <span className={styles.thumbNum}>
                        {statistics.likeCount}
                      </span>
                    </button>
                    <button className={styles.buttons}>
                      <FaThumbsDown />
                    </button>
                  </li>

                  <li className={styles.list}>
                    <button className={styles.buttons}>
                      <BsShare />
                    </button>
                  </li>
                  <li className={styles.list}>
                    <button className={styles.buttons}>
                      <BsSave />
                    </button>
                  </li>
                </ul>
              </section>
              <section className={styles.description}>
                <div className={styles.firstInfo}>
                  <p className={styles.firstInfoElements}>
                    조회수 : {formatNumber(statistics.viewCount)}
                  </p>
                  <p className={styles.firstInfoElements}>
                    {convertedDate(snippet.publishedAt)}
                  </p>
                </div>
                <p className={styles.tags}>
                  {snippet?.tags?.map((i) => `#${i} `)}
                </p>
                <p>{snippet.description}</p>
              </section>
            </div>
            <div className={styles.relatedVideos}>
              <RelatedVideos id={video.id} />
            </div>
            <div className={styles.comment}>
              <Comment id={video.id} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
