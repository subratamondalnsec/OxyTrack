import express from 'express';
import { handleChatAssistant } from '../controllers/chatAssistantController.js';

const chatAssistantRouter = express.Router();

chatAssistantRouter.post('/', handleChatAssistant);

export default chatAssistantRouter;
