import { Router } from "express";

const CustomerRoute = Router();
CustomerRoute.get("/customers", (req, res) => {
    res.send("List of customers");
});
export default CustomerRoute;