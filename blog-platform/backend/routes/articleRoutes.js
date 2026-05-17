import express from "express";
import {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticlesAdmin
} from "../controllers/articleController.js";
import { protect } from "../middleware/authMiddleware.js";
import { generateSEO } from "../controllers/seoController.js";

const router = express.Router();

router.get("/", getArticles);

router.get("/admin/all", protect, getAllArticlesAdmin);
router.post("/seo/generate", protect, generateSEO);
router.post("/", protect, createArticle);
router.put("/:id", protect, updateArticle);
router.delete("/:id", protect, deleteArticle);

router.get("/:slug", getArticleBySlug);

export default router;
