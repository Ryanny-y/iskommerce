import { Router } from "express";
import * as categoryController from "./category.controller";
import verifyJwt from "../../middlewares/verifyJwt";
import { validate } from "../../middlewares/validate";
import { createCategorySchema } from "./category.schema";

const router = Router();

router.post("/", verifyJwt, validate(createCategorySchema), categoryController.createCategory);

router.get("/", categoryController.getCategories);

router.get("/:categoryId", categoryController.getCategory);

// router.patch("/:categoryId", categoryController.updateCategory);

router.delete("/:categoryId", categoryController.deleteCategory);

export default router;