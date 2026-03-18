import prisma from "../../config/client";
import {
  CreateCategoryDto,
  UpdateCategoryDto
} from "./category.types";

export const createCategory = async (
  data: CreateCategoryDto
) => {

  // prevent duplicates (important)
  const existing = await prisma.category.findFirst({
    where: {
      name: data.name
    }
  });

  if (existing) {
    throw new Error("Category already exists");
  }

  return prisma.category.create({
    data: {
      name: data.name
    }
  });
};

export const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      name: "asc"
    }
  });
};

export const getCategory = async (
  categoryId: string
) => {

  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

// export const updateCategory = async (
//   categoryId: string,
//   data: UpdateCategoryDto
// ) => {

//   return prisma.category.update({
//     where: { id: categoryId },
//     data
//   });
// };

export const deleteCategory = async (
  categoryId: string
) => {

  // prevent deleting if used by products
  const used = await prisma.product.findFirst({
    where: { categoryId }
  });

  if (used) {
    throw new Error(
      "Cannot delete category. It is used by products."
    );
  }

  await prisma.category.delete({
    where: { id: categoryId }
  });

};