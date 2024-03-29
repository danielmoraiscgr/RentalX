"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const cars_routes_1 = require("./cars.routes");
const authenticate_routes_1 = require("./authenticate.routes");
const categories_routes_1 = require("./categories.routes");
const specifications_routes_1 = require("./specifications.routes");
const users_routes_1 = require("./users.routes");
const rentals_routes_1 = require("./rentals.routes");
const password_routes_1 = require("./password.routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/categories", categories_routes_1.categoriesRoutes);
router.use("/specifications", specifications_routes_1.specificationsRoutes);
router.use("/users", users_routes_1.usersRoutes);
router.use("/cars", cars_routes_1.carsRoutes);
router.use("/rentals", rentals_routes_1.rentalsRoutes);
router.use("/password", password_routes_1.passwordRoutes);
router.use(authenticate_routes_1.authenticateRoutes);
