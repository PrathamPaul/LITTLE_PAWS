const cloudinary=require("cloudinary").v2;
const multer= require("multer");

cloudinary.config({
    cloud_name: "djnmmhgsj",
    api_key: "263641573872833",
    api_secret: "mhxhUgezU2Q9Wqj_qGa0BjvWRT0"
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };