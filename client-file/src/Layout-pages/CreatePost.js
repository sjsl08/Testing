import { useState } from "react"
import Navbar from "./Navbar"
import FileBase64 from "react-file-base64"
import { toast } from "materialize-css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function CreatePost() {

  const navigate = useNavigate()

  const [postData, setPostData] = useState({
    name: "", location: "", description: "", PostImage: ""
  })


  const handlePost = async () => {

    if (postData.name && postData.location && postData.description && postData.PostImage) {

      const data = new FormData();
      data.append("file", postData.PostImage);
      data.append("upload_preset", "instaclone");
      data.append("cloud_name", "dlqn74gpq");

      try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/dlqn74gpq/image/upload", data)
        setPostData({ ...postData, PostImage: res.url })
      } catch (error) {
        console.log(error);
      }

      try {
        await axios.post("/createPost", postData)
        toast({ html: "Post Created", classes: "#c62828 blue darken-3", displayLength: 500 });
        navigate("/post")
      } catch (error) {
        console.log(error);
      }

    } else {
      toast({ html: "Empty Fields Not Allowed", classes: "#c62828 red darken-3", displayLength: 500 });
    }

  }


  return (

    <>
      <Navbar />
      <div
        className="card input-field"
        style={{
          margin: "30px auto",
          maxWidth: "500px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div >
          <div>
            <FileBase64 multiple={false} onDone={(image) => { setPostData({ ...postData, PostImage: image.base64 }) }} />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="No file chosen"
            />
          </div>
        </div>
        <input
          type="text"
          style={{ maxWidth: "45%" }}
          value={postData.name}
          onChange={(e) => { setPostData({ ...postData, name: e.target.value }) }}
          placeholder="Author"
        />
        <input
          type="text"
          style={{ maxWidth: "45%", marginLeft: "20px" }}
          value={postData.location}
          onChange={(e) => { setPostData({ ...postData, location: e.target.value }) }}
          placeholder="Location"
        />
        <input
          type="text"
          value={postData.description}
          onChange={(e) => { setPostData({ ...postData, description: e.target.value }) }}
          placeholder="Description"
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => handlePost()}>
          Post
        </button>
      </div>
    </>
  )
}
