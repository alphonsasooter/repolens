"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
/* ✅ TEST ROUTE */
app.get("/", (req, res) => {
    res.send("Analyzer API is running ");
});
/* ✅ GITHUB LOGIN ROUTE */
app.get("/api/auth/github", (req, res) => {
    const redirectUrl = "https://github.com/login/oauth/authorize" +
        `?client_id=${process.env.GITHUB_CLIENT_ID}` +
        `&redirect_uri=${process.env.GITHUB_CALLBACK_URL}`;
    res.redirect(redirectUrl);
});
/* ✅ GITHUB CALLBACK ROUTE */
app.get("/api/auth/github/callback", (req, res) => {
    res.send("GitHub callback reached successfully");
});
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
