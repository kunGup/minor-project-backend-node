const axios = require("axios");
const { Youtube } = require("tube-api");
const Jabber = require("jabber");
const {response} = require('./test')
exports.getSummary = async (req, res) => {
  try {
    console.log(req.body);
    const { url } = req.body;
    const ytube = new Youtube(process.env.YOUTUBE_API_KEY);
    const videoId = url.split("=")[1];
    const video = await ytube.videoInfo(videoId);
    const jabber = new Jabber();
    
    setTimeout(()=>{
      const arr = response.map(obj=>{
        return {...obj,words:Math.floor(Math.random()*200)}
      })
      const obj = {
        url: url,
        title: video.title,
        pic: video.thumbnails.default.url,
        type: 0,
        summary: arr,
      };
      res.status(200).json(obj);
    },6000)
    
  } catch (err) {
    res.status(400).json(err.message);
  }
};
