import { Youtube } from "tube-api";

const YOUTUBE_API_KEY = "AIzaSyADTqyoErWVW8hGPUphjmz3tR0yajccaOo"; // your youtube_api_key
const ytube = new Youtube(YOUTUBE_API_KEY);

const video = await ytube.videoInfo("RBSGKlAvoiM");

console.log(video);
