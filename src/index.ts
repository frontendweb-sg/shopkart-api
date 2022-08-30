import { config } from "dotenv";
config({
	path: `.env.${process.env.production ? "production" : ".development"}`,
});
import express from "express";
