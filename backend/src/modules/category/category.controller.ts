import { Request, Response, NextFunction } from "express";
import * as categoryService from "./category.service";
import { CategoryDto, CategoryParams, CreateCategoryDto, CreateCategoryResponse, DeleteCategoryResponse, GetCategoriesResponse, GetCategoryResponse } from "./category.types";
import { ApiResponse } from "../../types/api";

export const createCategory = async (
  req: Request<{}, {}, CreateCategoryDto>,
  res: Response<CreateCategoryResponse>,
  next: NextFunction
) => {
  try {

    const category =
      await categoryService.createCategory(req.body);

    res.status(201).json({
      success: true,
      message: `Category ${category} created`,
      data: category
    });

  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  req: Request,
  res: Response<GetCategoriesResponse>,
  next: NextFunction
) => {
  try {

    const categories =
      await categoryService.getCategories();

    res.json({
      success: true,
      message: "Categories Retrieved",
      data: categories
    });

  } catch (error) {
    next(error);
  }
};

export const getCategory = async (
  req: Request<CategoryParams>,
  res: Response<GetCategoryResponse>,
  next: NextFunction
) => {
  try {

    const { categoryId } = req.params;

    const category =
      await categoryService.getCategory(categoryId);

    res.json({
      success: true,
      data: category
    });

  } catch (error) {
    next(error);
  }
};

// export const updateCategory = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {

//     const { categoryId } = req.params;

//     const updated =
//       await categoryService.updateCategory(
//         categoryId,
//         req.body
//       );

//     res.json({
//       success: true,
//       data: updated
//     });

//   } catch (error) {
//     next(error);
//   }
// };

export const deleteCategory = async (
  req: Request<CategoryParams>,
  res: Response<DeleteCategoryResponse>,
  next: NextFunction
) => {
  try {

    const { categoryId } = req.params;

    await categoryService.deleteCategory(categoryId);

    res.json({
      success: true,
      message: "Category deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};