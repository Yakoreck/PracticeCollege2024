import express, { Request, Response } from "express";
import Comment from "../models/Comment";
import User from "../models/User"; 

export const addComment = async (req: Request, res: Response) => {
  try {
    const { userId, productId, description } = req.body;

    
    const comment = await Comment.create({ userId, productId, description });

    return res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ error: "Error adding comment" });
  }
};

export const getCommentsByProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    
    const comments = await Comment.findAll({ where: { productId } });

    
    const commentsWithUserNames = [];

    
    for (const comment of comments) {
      const user = await User.findByPk(comment.userId); 
      const commentWithUserName = {
        description: comment.description,
        name: user ? user.name : "Unknown",
      }; 
      commentsWithUserNames.push(commentWithUserName);
    }

    return res.status(200).json(commentsWithUserNames);
  } catch (error) {
    console.error("Error getting comments:", error);
    return res.status(500).json({ error: "Error getting comments" });
  }
};
