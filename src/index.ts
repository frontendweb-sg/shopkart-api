import path from "path";
import { config } from "dotenv";
config({
	path: `.env.${process.env.production ? "production" : "development"}`,
});
import express from "express";
import { connectDb } from "./db";
import { errorHandler } from "./middleware/error-handler";
import { userRoute } from "./routes/user";
import { categoryRoute } from "./routes/category";
import { brandRoute } from "./routes/brand";
import { colorRoute } from "./routes/color";
import { sizeRoute } from "./routes/size";
import { pageRoute } from "./routes/page";
import { productRoute } from "./routes/product";
import { storeRoute } from "./routes/store";

// App
const app = express();
const PORT = process.env.PORT || 4200;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// api
app.get("/api", (req, res, next) => {
	res.send({
		message: "Api is running on...",
	});
});

app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/color", colorRoute);
app.use("/api/size", sizeRoute);
app.use("/api/page", pageRoute);
app.use("/api/product", productRoute);
app.use("/api/store", storeRoute);

app.use(errorHandler);
// server listning
const server = app.listen(PORT, async () => {
	console.log("Api is running on ", PORT);
	await connectDb();
});

// export
export { server, app };
