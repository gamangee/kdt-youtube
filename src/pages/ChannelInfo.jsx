import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/ApiContext';
import styles from './ChannelInfo.module.css';

const ChannelInfo = ({ playerSnippet }) => {
  const { youtube } = useYoutubeApi();

  const QueryOption = {
    staleTime: 5 * 60 * 1000,
  };

  const { data: queryResult } = useQuery(
    ['searchChannel'],
    () => {
      return youtube.searchChannel(playerSnippet.channelId);
    },
    QueryOption,
  );

  const { snippet, statistics } = queryResult ? queryResult : '';

  // api호출 제한으로 인한 로컬스토리지 사용
  // localStorage.setItem('searchChannel', JSON.stringify(queryResult));
  // const { snippet, statistics } = JSON.parse(
  //   localStorage.getItem('searchChannel'),
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
      {snippet ? (
        <div className={styles.wrapper}>
          <img
            src={snippet.thumbnails.default.url}
            style={{
              borderRadius: '50%',
              width: 60,
              height: 60,
              marginRight: 15,
            }}
          ></img>
          <p>
            <strong>{playerSnippet.channelTitle}</strong>
            <p>구독자 {formatNumber(statistics.subscriberCount)} </p>
          </p>

          <button className={styles.subscribe}>구독</button>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ChannelInfo;
