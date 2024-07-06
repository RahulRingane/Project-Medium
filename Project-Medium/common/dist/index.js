"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInputSchema = exports.createBlogInputSchema = exports.signinInputSchema = exports.signupInputSchema = void 0;
const zod_1 = require("zod");
exports.signupInputSchema = (0, zod_1.object)({
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)().min(6),
    name: (0, zod_1.string)().optional()
});
exports.signinInputSchema = (0, zod_1.object)({
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)().min(6),
    name: (0, zod_1.string)().optional()
});
exports.createBlogInputSchema = (0, zod_1.object)({
    title: (0, zod_1.string)(),
    content: (0, zod_1.string)(),
});
exports.updateBlogInputSchema = (0, zod_1.object)({
    title: (0, zod_1.string)(),
    content: (0, zod_1.string)(),
    id: (0, zod_1.string)(),
});
