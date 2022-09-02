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
import session from "express-session";
import morgan from "morgan";

const sess = {
	secret: process.env.SESSION_SECRET_KEY,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true },
};

// App
const app = express();
const PORT = process.env.PORT || 4200;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
app.use(express.static(path.resolve(__dirname, "..", "public")));

if (app.get("env") === "production") {
	app.set("trust proxy", 1); // trust first proxy
	sess.cookie.secure = true; // serve secure cookies
} else {
	app.use(morgan("dev"));
}

app.use(
	session({
		secret: process.env.SESSION_SECRET_KEY!,
		resave: false,
		saveUninitialized: false,
		cookie: {
			//maxAge: new Date().getHours() + 5,
		},
	})
);

// api
app.get("/api", (req, res, next) => {
	console.log(req.session);
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

// error handler
app.use(errorHandler);
// server listning
const server = app.listen(PORT, async () => {
	console.log("Api is running on ", PORT);
	await connectDb();
});

// export
export { server, app };
