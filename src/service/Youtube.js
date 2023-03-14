import axios from 'axios';

export default class Youtube {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    });
  }

  async search(keyword) {
    console.log(`${keyword ? 'search fetching' : 'mostPopular fetching'}`);
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    console.log('search facthing');
    return this.instance
      .get('search', {
        params: {
          part: 'snippet',
          maxResults: 3,
          type: 'video',
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) =>
        items.filter((item) => item.id.kind !== 'youtube#channel')
      )
      .then((items) =>
        items.map((item) => ({
          ...item,
          id: item.id.videoId,
        }))
      );
  }

  async #mostPopular() {
    return this.instance
      .get('videos', {
        params: {
          part: 'snippet,statistics',
          maxResults: 3,
          chart: 'mostPopular',
        },
      })
      .then((res) => res.data.items);
  }

  async relatedVideos(id) {
    return this.instance
      .get('search', {
        params: {
          part: 'snippet',
          maxResults: 3,
          type: 'video',
          relatedToVideoId: id,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async channelImgURL(id) {
    return this.instance
      .get('channels', {
        params: {
          part: 'snippet',
          id,
        },
      })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }
}
