import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import VideoItem from "../components/VideoItem";
import { useYoutubeApi } from "../context/ApiContext";

export default function Videos() {
  const {keyword} = useParams();
  const {youtube} = useYoutubeApi();

  const QueryOption = {
    staleTime: 5 * 60 * 1000,
  };

  const { data: videos } = useQuery(["videos",keyword], () =>{
    console.log('fetching')
    return youtube.search(keyword);
  }, QueryOption);

  return <div>
    {videos&&<ul>
      {videos.map((video)=>{
        return <VideoItem key={video.id} video={video}/>
      })}
    </ul>}
  </div>;
}
