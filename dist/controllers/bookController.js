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
exports.getRecommendations = exports.returnBook = exports.borrowBook = exports.deleteBook = exports.updateBook = exports.addBook = exports.getAllBooks = void 0;
const httpConstants_1 = require("../constants/httpConstants");
const bookService = __importStar(require("../services/bookService"));
const getAllBooks = (req, res) => {
    try {
        const books = bookService.getAllBooks();
        res.status(httpConstants_1.HTTP_STATUS.OK).json({
            message: "Books retrieved",
            data: books,
        });
    }
    catch (error) {
        res.status(httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error retrieving books",
        });
    }
};
exports.getAllBooks = getAllBooks;
const addBook = (req, res) => {
    try {
        const { title, author, genre } = req.body;
        // Trim whitespace from fields
        const trimmedTitle = title === null || title === void 0 ? void 0 : title.trim();
        const trimmedAuthor = author === null || author === void 0 ? void 0 : author.trim();
        const trimmedGenre = genre === null || genre === void 0 ? void 0 : genre.trim();
        // Validate required fields
        if (!trimmedTitle || trimmedTitle === '') {
            res.status(httpConstants_1.HTTP_STATUS.BAD_REQUEST).json({
                message: "Title is required and cannot be empty or whitespace only",
            });
            return;
        }
        if (!trimmedAuthor || trimmedAuthor === '') {
            res.status(httpConstants_1.HTTP_STATUS.BAD_REQUEST).json({
                message: "Author is required and cannot be empty or whitespace only",
            });
            return;
        }
        if (!trimmedGenre || trimmedGenre === '') {
            res.status(httpConstants_1.HTTP_STATUS.BAD_REQUEST).json({
                message: "Genre is required and cannot be empty or whitespace only",
            });
            return;
        }
        // Use type-safe approach with Pick
        const bookData = {
            title: trimmedTitle,
            author: trimmedAuthor,
            genre: trimmedGenre,
        };
        const createdBook = bookService.addBook(bookData);
        res.status(httpConstants_1.HTTP_STATUS.CREATED).json({
            message: "Book added",
            data: createdBook,
        });
    }
    catch (error) {
        res.status(httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error adding book",
        });
    }
};
exports.addBook = addBook;
const updateBook = (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedBook = bookService.updateBook(id, updatedData);
        if (updatedBook) {
            res.status(httpConstants_1.HTTP_STATUS.OK).json({
                message: "Book updated",
                data: updatedBook,
            });
        }
        else {
            res.status(httpConstants_1.HTTP_STATUS.NOT_FOUND).json({
                message: "Book not found",
            });
        }
    }
    catch (error) {
        res.status(httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error updating book",
        });
    }
};
exports.updateBook = updateBook;
const deleteBook = (req, res) => {
    try {
        const { id } = req.params;
        const success = bookService.deleteBook(id);
        if (success) {
            res.status(httpConstants_1.HTTP_STATUS.OK).json({ message: "Book deleted" });
        }
        else {
            res.status(httpConstants_1.HTTP_STATUS.NOT_FOUND).json({
                message: "Book not found",
            });
        }
    }
    catch (error) {
        res.status(httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error deleting book",
        });
    }
};
exports.deleteBook = deleteBook;
const borrowBook = (req, res) => {
    try {
        const { id } = req.params;
        const borrowerId = req.body.borrowerId;
        const result = bookService.borrowBook(id, borrowerId);
        if (result) {
            res.status(httpConstants_1.HTTP_STATUS.OK).json({
                message: "Book borrowed",
                data: result,
            });
        }
        else {
            res.status(httpConstants_1.HTTP_STATUS.NOT_FOUND).json({
                message: "Book not found or already borrowed",
            });
        }
    }
    catch (error) {
        res.status(httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error borrowing book",
        });
    }
};
exports.borrowBook = borrowBook;
const returnBook = (req, res) => {
    try {
        const { id } = req.params;
        const result = bookService.returnBook(id);
        if (result) {
            res.status(httpConstants_1.HTTP_STATUS.OK).json({ message: "Book returned" });
        }
        else {
            res.status(httpConstants_1.HTTP_STATUS.NOT_FOUND).json({
                message: "Book not found or not currently borrowed",
            });
        }
    }
    catch (error) {
        res.status(httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error returning book",
        });
    }
};
exports.returnBook = returnBook;
const getRecommendations = (req, res) => {
    try {
        const recommendations = bookService.getRecommendations();
        res.status(httpConstants_1.HTTP_STATUS.OK).json({
            message: "Recommendations retrieved",
            data: recommendations,
        });
    }
    catch (error) {
        res.status(httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error fetching recommendations",
        });
    }
};
exports.getRecommendations = getRecommendations;
