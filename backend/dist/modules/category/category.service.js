"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.getCategory = exports.getCategories = exports.createCategory = void 0;
const client_1 = __importDefault(require("../../config/client"));
const createCategory = async (data) => {
    // prevent duplicates (important)
    const existing = await client_1.default.category.findFirst({
        where: {
            name: data.name
        }
    });
    if (existing) {
        throw new Error("Category already exists");
    }
    return client_1.default.category.create({
        data: {
            name: data.name
        }
    });
};
exports.createCategory = createCategory;
const getCategories = async () => {
    return client_1.default.category.findMany({
        orderBy: {
            name: "asc"
        }
    });
};
exports.getCategories = getCategories;
const getCategory = async (categoryId) => {
    const category = await client_1.default.category.findUnique({
        where: { id: categoryId }
    });
    if (!category) {
        throw new Error("Category not found");
    }
    return category;
};
exports.getCategory = getCategory;
// export const updateCategory = async (
//   categoryId: string,
//   data: UpdateCategoryDto
// ) => {
//   return prisma.category.update({
//     where: { id: categoryId },
//     data
//   });
// };
const deleteCategory = async (categoryId) => {
    // prevent deleting if used by products
    const used = await client_1.default.product.findFirst({
        where: { categoryId }
    });
    if (used) {
        throw new Error("Cannot delete category. It is used by products.");
    }
    await client_1.default.category.delete({
        where: { id: categoryId }
    });
};
exports.deleteCategory = deleteCategory;
