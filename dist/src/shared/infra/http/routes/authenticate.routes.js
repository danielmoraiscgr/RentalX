"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRoutes = void 0;
const express_1 = require("express");
const AuthenticateUserController_1 = require("@modules/accounts/useCases/authenticateUser/AuthenticateUserController");
const RefreshTokenController_1 = require("@modules/accounts/useCases/refreshToken/RefreshTokenController");
const authenticateRoutes = (0, express_1.Router)();
exports.authenticateRoutes = authenticateRoutes;
const authenticateUserController = new AuthenticateUserController_1.AuthenticateUserController();
const refreshTokenController = new RefreshTokenController_1.RefreshTokenController();
authenticateRoutes.post("/session", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);
