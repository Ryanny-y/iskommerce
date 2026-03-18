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
exports.deleteProduct = exports.updateProduct = exports.getProductsBySeller = exports.getSellerProducts = exports.getAllProducts = exports.createProduct = void 0;
const productService = __importStar(require("./product.service"));
const createProduct = async (req, res, next) => {
    try {
        const files = req.files;
        const product = await productService.createProduct(req.userId, req.body, files);
        res.status(201).json({
            success: true,
            message: `Product: ${product?.name} posted successfully!`,
            data: product,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.json({
            success: true,
            message: "Products Retrieved",
            data: products,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllProducts = getAllProducts;
const getSellerProducts = async (req, res, next) => {
    try {
        const products = await productService.getSellerProducts(req.userId);
        res.json({
            success: true,
            message: "Products Retrieved",
            data: products,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSellerProducts = getSellerProducts;
const getProductsBySeller = async (req, res, next) => {
    try {
        const { sellerId } = req.params;
        const products = await productService.getSellerProducts(sellerId);
        res.json({
            success: true,
            message: "Products Retrieved",
            data: products,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductsBySeller = getProductsBySeller;
const updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const updated = await productService.updateProduct(productId, req.body);
        res.json({
            success: true,
            data: updated,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        await productService.deleteProduct(req.userId, productId);
        res.json({
            success: true,
            message: "Product deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
