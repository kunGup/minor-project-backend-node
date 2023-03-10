const fetch = require('node-fetch')
const axios = require("axios");
const { Youtube } = require("tube-api");
const Jabber = require("jabber");
const { response } = require("./test");
exports.getSummary = async (req, res) => {
  try {
    console.log(req.body);
    const { url } = req.body;
    const ytube = new Youtube(process.env.YOUTUBE_API_KEY);
    const videoId = url.split("=")[1];
    const video = await ytube.videoInfo(videoId);
    const jabber = new Jabber();
    // console.log(video);

    fetch(`http://127.0.0.1:8000/summarize/${url.replace('watch?','')}`)
      .then(res => res.json())
      .then(data => {
        const arr = data.map((obj) => {
          return {
            ...obj,
            charLen: obj.summary.length,
            execution_time: Math.floor(obj.execution_time * 1000) / 1000,
            similarity_score: Math.floor(obj.similarity_score * 1000) / 1000,
          };
        });
        const obj = {
          url: url,
          title: video.title,
          pic: video.thumbnails.standard.url,
          type: 0,
          summary: arr,
        };
        res.status(200).json(obj);
      })
    // setTimeout(() => {
    //   const arr = response.map((obj) => {
    //     return {
    //       ...obj,
    //       charLen: obj.summary.length,
    //       execution_time: Math.floor(obj.execution_time * 1000) / 1000,
    //       similarity_score: Math.floor(obj.similarity_score * 1000) / 1000,
    //     };
    //   });
    //   const obj = {
    //     url: url,
    //     title: video.title,
    //     pic: video.thumbnails.standard.url,
    //     type: 0,
    //     summary: arr,
    //   };
    //   res.status(200).json(obj);
    // }, 6000);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
