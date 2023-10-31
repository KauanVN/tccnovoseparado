const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 5173; // Você pode escolher uma porta disponível

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "imagensparques")); // Este é o diretório de destino
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });
  

const upload = multer({ storage });

app.use(express.static("imagensparques"));

app.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({ message: "Upload de imagem bem-sucedido" });
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao fazer upload da imagem" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
