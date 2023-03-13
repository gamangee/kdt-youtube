import axios from "axios";

export default class mockYoutube {
  constructor() {
    this.instance = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    });
  }

  async search(keyword) {
    console.log(`${keyword ? "search fetching" : "mostPopular fetching"}`);
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    console.log("seatch facthing");
    return this.instance
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 10,
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return this.instance
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 10,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  }

}
