import {
  createConversationsService,
  getRecentConversationRows,
} from "../service/chat.service.js";

async function createConversationsController(req, res, next) {
  try {
    const { question } = req.body;

    const result = await createConversationsService(question);
    res.status(201).json({
      success: true,
      message: "Conversation posted successfully",
      data: result,
    });
  } catch (error) {
    throw error;
  }
}

async function getConversationsController(req, res, next) {
  try {
    const result = await getRecentConversationRows(100);
    res.status(200).json({
      success: true,
      message: "Conversations fetched successfully",
      data: {
        conversations: result,
      },
    });
  } catch (error) {
    throw error;
  }
}

export { createConversationsController, getConversationsController };
