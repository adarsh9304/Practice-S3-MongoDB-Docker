import express from 'express'
import * as dotenv from 'dotenv'
import databaseConnect from './config/database.js';
import bodyParser from 'body-parser'; 
import { addUser } from './controller/userData.js';
import upload from './config/imageUploadS3.js';
import { profilePresignedUrl } from './controller/profilePresignedUrl.js';

const app=express();

dotenv.config()

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(bodyParser.json());

databaseConnect();

app.post('/user',upload.single('profilephoto') ,addUser)
app.get('/presignedUrlForProfile',profilePresignedUrl)

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})