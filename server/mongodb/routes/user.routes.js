import express from "express";

// import all Controllers

import { createUser, getAllUser, getUserInfoById } from '../controllers/user.controller.js';

const router = express.Router();
