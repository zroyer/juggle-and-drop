import express from 'express';
import mongoose from 'mongoose';
import render from './render';
import api from './api';
import getBoard from './getBoard';

const app = express();
const port = process.env.PORT || '1738';

mongoose.connect('mongodb://user:password123@ds263670.mlab.com:63670/juggle-and-drop');
const db = mongoose.connection;

/* eslint-disable no-console */
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("dist/public"));
app.use("/api", api(db));
app.use(getBoard(db));
app.get("*", render);

/* eslint-disable no-console */
app.listen(port, () => console.log(`🚂 server chugging along on port ${port}`));
