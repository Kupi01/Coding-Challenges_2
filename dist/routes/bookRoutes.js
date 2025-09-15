"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const router = (0, express_1.Router)();
/**
 * Define routes for book management
 */
router.get("/", bookController_1.getAllBooks);
router.post("/", bookController_1.addBook);
router.put("/:id", bookController_1.updateBook);
router.delete("/:id", bookController_1.deleteBook);
router.post("/:id/borrow", bookController_1.borrowBook);
router.post("/:id/return", bookController_1.returnBook);
router.get("/recommendations", bookController_1.getRecommendations);
exports.default = router;
