"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.getCategory = exports.getCategories = exports.createCategory = void 0;
const categoryService = __importStar(require("./category.service"));
const createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({
            success: true,
            message: `Category ${category} created`,
            data: category
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createCategory = createCategory;
const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories();
        res.json({
            success: true,
            message: "Categories Retrieved",
            data: categories
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCategories = getCategories;
const getCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryService.getCategory(categoryId);
        res.json({
            success: true,
            data: category
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCategory = getCategory;
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
const deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        await categoryService.deleteCategory(categoryId);
        res.json({
            success: true,
            message: "Category deleted successfully"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCategory = deleteCategory;
