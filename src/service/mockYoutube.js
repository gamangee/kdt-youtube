import axios from "axios";

export default class mockYoutube {
  // constructor(){}

  async search(keyword) {
    return keyword ? this.#searchByKeyword() : this.#mostPopular();
  }

  async #searchByKeyword() {
    return axios.get(`/videos/search.json`).then((res) => res.data.items)
    .then(items => items.map((item)=>({...item, id : item.id.videoId , kind : item.id.kind})))
  }
  
  async #mostPopular() {
    return axios.get(`/videos/popular.json`).then((res) => res.data.items)
  }
  
  async comments() {
    return axios.get(`/videos/comment.json`).then(res=> res.data.items)
  }
}
