import { Request, Response } from "express";
import Product from "../models/Product";
import Comment from "../models/Comment";
import { Sequelize } from "sequelize";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Comment, as: "comments" }],
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product by id:", error);
    res.status(500).json({ error: "Error fetching product by id" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, imageUrl, category } = req.body;
    const product = await Product.create({
      name,
      price,
      description,
      imageUrl,
      category,
    });
    return res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Error creating product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description, imageUrl, category } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.imageUrl = imageUrl || product.imageUrl;
    product.category = category || product.category;
    await product.save();
    return res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Error updating product" });
  }
};

export const getLatestProducts = async (req: Request, res: Response) => {
  try {
    const latestProducts = await Product.findAll({
      order: [["createdAt", "DESC"]],
      limit: 4,
    });
    res.json(latestProducts);
  } catch (error) {
    console.error("Error fetching latest products:", error);
    res.status(500).json({ error: "Error fetching latest products" });
  }
};

export const getMostPopular = async (req: Request, res: Response) => {
  try {
    const mostPopularProducts = await Product.findAll({
      order: [Sequelize.literal("RAND()")], // RAND() генерує випадкове число
      limit: 4,
    });
    res.json(mostPopularProducts);
  } catch (error) {
    console.error("Error fetching most popular products:", error);
    res.status(500).json({ error: "Error fetching most popular products" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    return res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Error deleting product" });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const products = await Product.findAll({
      where: { category },
    });
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found for this category" });
    }
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ error: "Error fetching products by category" });
  }
};
