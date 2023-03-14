import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../../context/ApiContext";
import CommentItem from "./CommentItem";

export default function Comment() {
  // http://localhost:3000/videos/watch/:z0Yty3hIAeY
  const videoId = "z0Yty3hIAeY";
  const order = "time";

  const { youtube } = useYoutubeApi();

  const { data: commentList } = useQuery(["commentList"], () => {
    return youtube.comment(videoId);
  });

  // console.log(commentList);

  return (
    <>
      {commentList ? (
        <div>
          <div>댓글 {commentList.length}개</div>
          <button>정렬기준</button>
          <div>
            <img src="" alt="profileImg" />
            <input type="text" placeholder="댓글추가"></input>
          </div>
          {commentList.map((comment) => (
            <div key={comment.id}>
              <CommentItem
                comment={comment.topLevelComment}
                replyCount={comment.totalReplyCount}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div>댓글 0개</div>
          <button>정렬기준</button>
          <div>
            <img src="" alt="profileImg" />
            <input type="text" placeholder="댓글추가"></input>
          </div>
        </div>
      )}
    </>
  );
}
