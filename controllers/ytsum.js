const axios = require("axios");
const { Youtube } = require("tube-api");
const Jabber = require("jabber");

exports.getSummary = async (req, res) => {
  try {
    console.log(req.body);
    const { url } = req.body;
    const ytube = new Youtube(process.env.YOUTUBE_API_KEY);
    const videoId = url.split("=")[1];
    console.log(videoId);
    const video = await ytube.videoInfo(videoId);
    const jabber = new Jabber();
    const obj = {
      url: url,
      title: video.title,
      pic: video.thumbnails.default.url,
      type: 0,
      text: jabber.createParagraph(120),
    };
    res.status(200).json(obj);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
