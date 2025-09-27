import express from 'express'
import listContent from '../../controller/admin/ContentlistController.js'
import verifyToken from '../../middleware/Tokenvarify.js';
import deleteContent from '../../controller/admin/deletecontroller.js';
import EditContent from '../../controller/admin/editContent.controller.js';
import upload from '../../middleware/multer.middleware.js';

let listrouter = express.Router()

listrouter.get("/all",verifyToken,listContent);
listrouter.delete("/delete/:id",deleteContent)
listrouter.put("/edit/:id",verifyToken, upload.single("file"),EditContent)

export default listrouter;