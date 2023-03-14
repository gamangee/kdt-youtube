import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../../context/ApiContext";
import CommentItem from "./CommentItem";
import { BsFilterLeft } from "react-icons/bs";
import styles from "./css/Comment.module.css";

export default function Comment() {
  // http://localhost:3000/videos/watch/:z0Yty3hIAeY
  const videoId = "z0Yty3hIAeY";
  const order = "time";

  const { youtube } = useYoutubeApi();

  const { data: commentList } = useQuery(["commentList"], () => {
    return youtube.comment(videoId);
  });

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
          <div className={styles.commentAdd}>
            <img src="http://localhost:3000/favicon.ico" />
            <input type="text" placeholder="댓글추가..."></input>
          </div>
          {commentList.map((comment) => (
            <div key={comment.id}>
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
            <img src="" alt="profileImg" />
            <input type="text" placeholder="댓글추가..."></input>
          </div>
        </>
      )}
    </div>
  );
}
