import axios from 'axios';

export default class mockYoutube {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: {
        key: 'AIzaSyDJq77xoirN_CJb385IGHu6xqWwLhcNA_g',
      },
    });
  }

  async search(keyword) {
    console.log(`${keyword ? 'search fetching' : 'mostPopular fetching'}`);
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async searchId(videoId) {
    return this.#searchVideoId(videoId);
  }

  async searchChannel(channelId) {
    return this.#searchChannelInfo(channelId);
  }

  async #searchByKeyword(keyword) {
    console.log('seatch facthing');
    return this.instance
      .get('search', {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return this.instance
      .get('search', {
        params: {
          part: 'snippet',
          maxResults: 10,
          chart: 'mostPopular',
        },
      })
      .then((res) => res.data.items);
  }

  async #searchVideoId(videoId) {
    return this.instance
      .get(`videos`, {
        params: {
          part: 'snippet,contentDetails,player,statistics',
          id: videoId,
        },
      })
      .then((res) => res.data.items[0]);
  }

  async #searchChannelInfo(channelId) {
    return this.instance
      .get('channels', {
        params: {
          part: 'snippet,statistics,contentDetails',
          id: channelId,
        },
      })
      .then((res) => res.data.items[0]);
  }
}
