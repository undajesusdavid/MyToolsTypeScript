import { Router } from "express";
const ArticleRoute = Router();
ArticleRoute.get("/articles", (req, res) => {
    res.send("List of articles");
});
export default ArticleRoute;
