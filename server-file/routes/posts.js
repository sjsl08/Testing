const router = require("express").Router();
const Post = require("../models/posts");

router.get("/getPosts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (e) {
    res.status(422).json({
      message: e.message,
    });
  }
});

router.post("/createPost", async (req, res) => {
  try {
    const { name, location, description, PostImage } = req.body;
    //console.log(name, PostImage);
    const newPost = new Post({
      name,
      location,
      description,
      PostImage,
    });
    
    await newPost.save();

    res.status(200).json({
      message: "New Post Created",
    });
  } catch (e) {
    res.status(422).json({
      message: e.message,
    });
  }
});

module.exports = router;
