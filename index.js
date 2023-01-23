const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const { v4: uniqKeyGenerate } = require("uuid");
const UsersShema = require("./Users");
const path = require("path");
const PORT = 8081 || process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const uri = `mongodb+srv://subodhjondhale1998:Mubodh1234@instauserdata.h3vnl66.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set("strictQuery", true);
mongoose.connect(uri, (err) => {
  if (err) {
    console.log("Connection to mongodb failed");
  } else console.log("Connected to mongoDB successfully");
});

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.post("/userData", (req, resp) => {
  const { name, location, description, likes, date } = req.body;
  const files = req.files.image;
  //console.log(req.body);
  const fragments = req.files.image.name.split(".");
  const fileExt = fragments[fragments.length - 1];
  const uniqKey = uniqKeyGenerate();
  const fileName = uniqKey + "." + fileExt;
  if (["jpeg", "jpg", "png", "svg", "PNG"].includes(fileExt)) {
    files.mv("./uploads/" + fileName, async (err) => {
      if (err) {
        resp.json({ message: err });
      } else {
        const user = new UsersShema({
          name,
          location,
          description,
          likes,
          file_name: fileName,
          date,
        });
        try {
          await user.save();
          resp.json({ message: "Pushed data into Database successfully" });
        } catch (e) {
          resp.json({ message: e });
        }
      }
    });
  } else {
    resp.json({ message: "Please upload an image file" });
  }
});
app.use(express.urlencoded({ extended: true }));

app.get("/all", async (req, resp) => {
  try {
    const response = await UsersShema.find();
    //console.log(response);
    resp.json({ result: response });
  } catch (e) {
    resp.json({ message: e });
  }
});

app.get("/image/:filename", (req, resp) => {
  resp.sendFile(`/uploads/${req.params.filename}`, { root: "." });
});
// app.use(express.static(path.join(__dirname, "./Client/build")));
// app.get("*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "./Client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });
app.listen(PORT, () => {
  console.log("Running on PORT", PORT);
});
