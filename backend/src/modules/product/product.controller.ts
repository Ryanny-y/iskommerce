import { Request, Response, NextFunction } from "express";
import * as productService from "./product.service";
import {
  CreateProductDto,
  ProductDto,
  ProductParams,
  SellerProductsParams,
} from "./product.types";
import { ApiResponse } from "../../types/api";

export const createProduct = async (
  req: Request<{}, {}, CreateProductDto>,
  res: Response<ApiResponse<ProductDto>>,
  next: NextFunction,
) => {
  try {
    const files = req.files as Express.Multer.File[];
    const product = await productService.createProduct(
      req.userId!,
      req.body,
      files,
    );

    res.status(201).json({
      success: true,
      message: `Product: ${product?.name} posted successfully!`,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response<ApiResponse<ProductDto[]>>,
  next: NextFunction,
) => {
  try {
    const products = await productService.getAllProducts();

    res.json({
      success: true,
      message: "Products Retrieved",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getSellerProducts = async (
  req: Request,
  res: Response<ApiResponse<ProductDto[]>>,
  next: NextFunction,
) => {
  try {
    const products = await productService.getSellerProducts(req.userId!);

    res.json({
      success: true,
      message: "Products Retrieved",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request<ProductParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    const updated = await productService.updateProduct(productId, req.body);

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request<ProductParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    await productService.deleteProduct(req.userId!, productId);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
