const express = require("express");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");

const { upload } = require("../../helpers/cloudinary");
const { verifySeller } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post("/upload-image", verifySeller , upload.single("my_file"), handleImageUpload);
router.post("/add",verifySeller , addProduct);
router.put("/edit/:id",verifySeller , editProduct);
router.delete("/delete/:id",verifySeller , deleteProduct);
router.get("/",verifySeller , fetchAllProducts);

module.exports = router;