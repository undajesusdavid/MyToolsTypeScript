import { Router } from "express";
const UserRoute = Router();
UserRoute.get("/users", (req, res) => {
    res.send("List of users");
});
export default UserRoute;
