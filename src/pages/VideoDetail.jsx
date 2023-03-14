import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/ApiContext';
import ChannelInfo from './ChannelInfo';
import styles from './VideoDetail.module.css';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { BsShare, BsSave } from 'react-icons/bs';

export default function VideoDetail() {
  const { videoId } = useParams();
  const { youtube } = useYoutubeApi();
  const QueryOption = {
    staleTime: 5 * 60 * 1000,
  };

  const { data: queryResult } = useQuery(
    ['searchId'],
    () => {
      return youtube.searchId(videoId);
    },
    QueryOption,
  );
  const { contentDetails, player, snippet, statistics } = queryResult ? queryResult: '';

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

  const convertedDate = (str) => {
    return str.slice(0, 10).replaceAll('-', '.');
  };
  return (
    <div className={styles.wrapper}>
      {contentDetails ? (
        <div>
          <article>
            <div>
              <iframe
                width="100%"
                height="800"
                src={`https://www.youtube.com/embed/${videoId}`}
              ></iframe>
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
                {convertedDate(snippet.publishedAt)}
              </p>
            </div>
            <p className={styles.tags}>{snippet.tags.map((i) => `#${i} `)}</p>

            <p>{snippet.description}</p>
          </section>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
