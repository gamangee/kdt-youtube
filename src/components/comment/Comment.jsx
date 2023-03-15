import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../../context/ApiContext';
import CommentItem from './CommentItem';
import { BsFilterLeft } from 'react-icons/bs';
import styles from './css/Comment.module.css';
import { useParams } from 'react-router-dom';

export default function Comment() {
  const { videoId } = useParams();

  const { youtube } = useYoutubeApi();

  const { data: commentList } = useQuery(['commentList'], () => {
    return youtube.comment(videoId);
  });

  // 댓글 입력창 클릭 여부
  const [isComment, setIsComment] = useState(false);

  return (
    <div className={styles.container}>
      {commentList ? (
        <>
          <div className={styles.commentHeader}>
            <div>댓글 {commentList.length}개</div>
            <button>
              <BsFilterLeft /> 정렬 기준
            </button>
          </div>
          {/* 댓글 input */}
          <div className={styles.commentAdd}>
            {/* 댓글 작성 창 프로필 img */}
            <img src='/images/profileImg.jpg' alt='profile_img' />
            <div>
              <input
                className={styles.commentinput}
                type='text'
                placeholder='댓글추가...'
                onClick={() => setIsComment(true)}
              ></input>
              {/* 댓글 토글 */}
              {isComment ? (
                <div className={styles.commentToggle}>
                  {/* 취소버튼 */}
                  <button
                    className={styles.commentCancle}
                    onClick={() => setIsComment(false)}
                  >
                    취소
                  </button>
                  {/* 답글 등록 버튼 */}
                  <button
                    className={styles.commentRegister}
                    onClick={() => setIsComment(false)}
                  >
                    답글
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {commentList.map((comment) => (
            <div key={comment.id}>
              {/* 댓글 Id */}
              {/* {console.log(comment.topLevelCommentId)} */}
              <CommentItem
                comment={comment.topLevelComment}
                replyCount={comment.totalReplyCount}
              />
            </div>
          ))}
        </>
      ) : (
        <>
          <div className={styles.commentHeader}>
            <div>댓글 0개</div>
            <button>
              <BsFilterLeft />
              정렬 기준
            </button>
          </div>
          <div className={styles.commentAdd}>
            <img src='' alt='profileImg' />
            <input type='text' placeholder='댓글추가...'></input>
          </div>
        </>
      )}
    </div>
  );
}
