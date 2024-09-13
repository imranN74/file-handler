const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());

function fileSystem(path) {
  return new Promise((res, rej) => {
    fs.readdir(path, (err, files) => {
      res(files);
    });
  });
}

function readFileContent(file) {
  return new Promise((res, rej) => {
    fs.readFile(file, "utf8", (err, data) => {
      res(data);
    });
  });
}

app.get("/files", (req, res) => {
  let folderPath = path.join(__dirname, "files");
  console.log(folderPath);
  let fileList = fileSystem(folderPath);
  fileList.then((value) => {
    res.status(200).json({ date: value });
  });
});

app.get("/files/:filename", (req, res) => {
  let folderPath = path.join(__dirname, "files");

  let fileList = fileSystem(folderPath);
  let requestFile = req.params.filename;
  fileList.then((value) => {
    if (value.includes(requestFile)) {
      readFileContent(`./files/${requestFile}`).then((value) => {
        res.status(200).json({
          fileName: requestFile,
          content: value,
        });
      });
    } else {
      res.status(404).json({
        msg: "File Not File",
      });
    }
  });
});

app.listen(3000, () => {
  console.log("server started");
});
