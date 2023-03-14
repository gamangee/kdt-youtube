import React, { useState } from "react";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDislike,
} from "react-icons/ai";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import CommentDate from "./CommentDate";

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
    <div>
      <div>
        {/* 댓글 프로필 */}
        <img src={comment.authorProfileImageUrl} />
      </div>
      <div>
        {/* 작성자 */}
        <a>{comment.authorDisplayName}</a>
        {/* 댓글 작성 날짜 */}
        <CommentDate
          publishedAt={comment.publishedAt}
          updatedAt={comment.updatedAt}
        />
        {/* 내용 */}
        <div>{comment.textOriginal}</div>
        {/* 버튼 */}
        <div>
          {/* 좋아요버튼 */}
          <button onClick={() => setIsLiked(!isLiked)}>
            {isLiked ? (
              <>
                <AiFillLike />
                {/* 좋아요 개수 */}
                <span>{comment.likeCount + 1}</span>
              </>
            ) : (
              <>
                <AiOutlineLike />
                {/* 좋아요 개수가 0 이상이면 표기 */}
                {comment.likeCount > 0 ? (
                  <span>{comment.likeCount}</span>
                ) : (
                  <></>
                )}
              </>
            )}
          </button>
          {/* 싫어요버튼 */}
          <button onClick={() => setIsDisLiked(!isDisLiked)}>
            {isDisLiked ? <AiFillDislike /> : <AiOutlineDislike />}
          </button>
          {/* 답글 토글 */}
          <button onClick={() => setIsReply(true)}>답글</button>
          {isReply ? (
            <div>
              <img alt="profile" />
              <input></input>
              <div>
                {/* 취소버튼 */}
                <button onClick={() => setIsReply(false)}>취소</button>
                {/* 답글 등록 버튼 */}
                <button onClick={() => setIsReply(false)}>답글</button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* 답글개수가 0개 이상이면 답글 확인 버튼 표시 */}
        {replyCount > 0 ? (
          <div onClick={() => setIsReplyCount(!isReplyCount)}>
            {isReplyCount ? (
              <div>
                <VscTriangleUp /> 답글 {replyCount}개
              </div>
            ) : (
              <div>
                <VscTriangleDown /> 답글 {replyCount}개
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
