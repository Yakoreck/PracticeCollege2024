import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getMostPopular,
  getLatestProducts,
} from "../controllers/productController";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);

router.route("/popular").get(getMostPopular);
router.route("/latest").get(getLatestProducts);

router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.route("/category/:category").get(getProductsByCategory);

export default router;
