"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryParamsSchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, "Category name is required"),
    })
});
exports.updateCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1)
            .optional(),
    })
});
exports.categoryParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        categoryId: zod_1.z.string().uuid(),
    })
});
