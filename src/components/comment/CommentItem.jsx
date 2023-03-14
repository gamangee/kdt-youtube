import React, { useState } from "react";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDislike,
} from "react-icons/ai";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import CommentDate from "./CommentDate";
import styles from "./css/CommentItem.module.css";

export default function CommentItem({ comment, replyCount }) {
  // console.log(comment);

  // 좋아요 클릭여부
  const [isLiked, setIsLiked] = useState(false);
  // 싫어요 클릭여부
  const [isDisLiked, setIsDisLiked] = useState(false);
  // console.log(isLiked, isDisLiked);

  // 답글 버튼 클릭여부
  const [isReply, setIsReply] = useState(false);
  // 답글 개수(확인) 버튼 클릭여부
  const [isReplyCount, setIsReplyCount] = useState(false);
  // console.log(isReply, isReplyCount);

  return (
    <div className={styles.container}>
      <div>
        {/* 댓글 프로필 */}
        <img src={comment.authorProfileImageUrl} alt="comment-profile" />
      </div>
      <div className={styles.comment}>
        <div className={styles.commentInfo}>
          {/* 작성자 */}
          <a href="javascript:void(0)">{comment.authorDisplayName}</a>
          {/* 댓글 작성 날짜 */}
          <div>
            <CommentDate
              publishedAt={comment.publishedAt}
              updatedAt={comment.updatedAt}
            />
          </div>
        </div>
        {/* 댓글 내용 */}
        <div className={styles.commentContent}>{comment.textOriginal}</div>
        {/* 버튼 */}
        <div className={styles.commentBtnGroup}>
          {/* 좋아요버튼 */}
          <div
            className={styles.commentLike}
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? (
              <>
                <button>
                  <AiFillLike />
                </button>
                {/* 좋아요 개수 */}
                <span> {comment.likeCount + 1}</span>
              </>
            ) : (
              <>
                <button>
                  <AiOutlineLike />
                </button>
                {/* 좋아요 개수가 0 이상이면 표기 */}
                {comment.likeCount > 0 ? (
                  <span> {comment.likeCount}</span>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
          {/* 싫어요버튼 */}
          <div
            className={styles.commentDisLike}
            onClick={() => setIsDisLiked(!isDisLiked)}
          >
            {isDisLiked ? (
              <button>
                <AiFillDislike />
              </button>
            ) : (
              <button>
                <AiOutlineDislike />
              </button>
            )}
          </div>
          {/* 답글 버튼 */}
          <button
            className={styles.commentReply}
            onClick={() => setIsReply(true)}
          >
            답글
          </button>
        </div>
        {/* 답글 토글  */}
        {isReply ? (
          <div className={styles.replyToggle}>
            <img src="http://localhost:3000/favicon.ico" alt="profile" />
            <div className={styles.replyToggleContent}>
              <input type="text" placeholder="답글추가..."></input>
              <div className={styles.replyToggleBtngroup}>
                {/* 취소버튼 */}
                <button
                  className={styles.replyCancle}
                  onClick={() => setIsReply(false)}
                >
                  취소
                </button>
                {/* 답글 등록 버튼 */}
                <button
                  className={styles.replyRegister}
                  onClick={() => setIsReply(false)}
                >
                  답글
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* 답글개수가 0개 이상이면 답글 확인 버튼 표시 */}
        {replyCount > 0 ? (
          <div className={styles.replyCount}>
            {isReplyCount ? (
              <button onClick={() => setIsReplyCount(!isReplyCount)}>
                <VscTriangleUp /> 답글 {replyCount}개
              </button>
            ) : (
              <button onClick={() => setIsReplyCount(!isReplyCount)}>
                <VscTriangleDown /> 답글 {replyCount}개
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
