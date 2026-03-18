"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const product_route_1 = __importDefault(require("./product/product.route"));
const category_route_1 = __importDefault(require("./category/category.route"));
const cart_route_1 = __importDefault(require("./cart/cart.route"));
const router = (0, express_1.Router)();
// AUTH
router.use("/auth", auth_route_1.default);
// PUBLIC
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
// PROTECTED
router.use("/products", product_route_1.default);
router.use("/categories", category_route_1.default);
router.use("/cart", cart_route_1.default);
exports.default = router;
