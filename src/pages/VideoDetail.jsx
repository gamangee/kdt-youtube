import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/ApiContext';
import ChannelInfo from './ChannelInfo';
import styles from './VideoDetail.module.css';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { BsShare, BsSave } from 'react-icons/bs';
import RelatedVideos from '../components/RelatedVideos';
import Comment from '../components/comment/Comment';
import { DateFormatter } from '../util/date';

export default function VideoDetail() {
  const [queryResult, setQueryResult] = useState({});

  const [isOver, setIsOver] = useState(false);

  const {
    state: { video },
  } = useLocation();

  const { videoId } = useParams();
  const { youtube } = useYoutubeApi();

  const QueryOption = {
    staleTime: 5 * 60 * 1000,
  };

  useEffect(() => {
    getData();
  }, [videoId]);

  const getData = async () => {
    const result = await youtube.searchId(videoId);
    setQueryResult(result);
    result.snippet.description.length > 200
      ? setIsOver(true)
      : setIsOver(false);
  };

  const { contentDetails, player, snippet, statistics } = queryResult
    ? queryResult
    : '';

  // api호출 제한으로 인한 로컬스토리지 사용
  //localStorage.setItem('searchID',JSON.stringify(queryResult))
  // const { contentDetails, player, snippet, statistics } = JSON.parse(
  //   localStorage.getItem('searchID'),
  // );

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'm';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'k';
    } else {
      return num.toString();
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        {contentDetails ? (
          <div>
            <article>
              <div>
                <iframe
                  title={snippet.title}
                  width="100%"
                  height="800"
                  alt="youtube#video"
                  src={`https://www.youtube.com/embed/${videoId}`}
                />
              </div>
              {/* <div dangerouslySetInnerHTML={{ __html: player.embedHtml }}></div> */}
              <h3>{snippet.title}</h3>
            </article>
            <section className={styles.channelAndLikes}>
              <ChannelInfo playerSnippet={snippet} />
              <ul className={styles.lists}>
                <li className={styles.list}>
                  <button className={styles.buttons}>
                    <FaThumbsUp />
                    {statistics.likeCount}
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
                  {DateFormatter(snippet.publishedAt, 'ko')}
                </p>
              </div>
              <p className={styles.tags}>
                {snippet?.tags?.map((i) => `#${i} `)}
              </p>
              <p>
                {isOver ? (
                  <>
                    {`${snippet.description.slice(0, 200)} ... `}
                    <button
                      className={styles.overButton}
                      onClick={() => setIsOver((flag) => !flag)}
                    >
                      더보기
                    </button>
                  </>
                ) : (
                  <>
                    {snippet.description}
                    <button
                      className={styles.overButton}
                      onClick={() => setIsOver((flag) => !flag)}
                    >
                      &nbsp;간략히
                    </button>
                  </>
                )}
              </p>
            </section>
            <Comment id={video.id} />
          </div>
        ) : (
          <></>
        )}
        <RelatedVideos id={video.id} />
      </div>
    </>
  );
}
