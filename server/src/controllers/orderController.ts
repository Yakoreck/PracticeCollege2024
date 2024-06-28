import { Request, Response } from "express";
import Order, { OrderItem } from "../models/Order";
import Product from "../models/Product";
import User from "../models/User";

export const createOrderItem = async (
  orderId: number,
  productId: number,
  quantity: number
) => {
  try {
    const orderItem = await OrderItem.create({
      orderId,
      productId,
      quantity,
    });

    return orderItem;
  } catch (error) {
    console.error("Error creating order item:", error);
    throw new Error("Error creating order item");
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, userId } = req.body;

    // Перевірка існування користувача
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let totalPrice = 0;

    // Перебір елементів замовлення
    for (const item of items) {
      const { productId, quantity } = item;

      const product = await Product.findByPk(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${productId} not found` });
      }

      totalPrice += product.price * quantity;
    }

    const order = await Order.create({ totalPrice, userId });

    // Додавання елементів замовлення
    for (const item of items) {
      const { productId, quantity } = item;
      await createOrderItem(order.id, productId, quantity);
    }

    return res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Error creating order" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: User }, { model: OrderItem, include: [Product] }],
    });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the order by its ID
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Delete associated order items first
    await OrderItem.destroy({ where: { orderId: id } });

    // Delete the order
    await order.destroy();

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Error deleting order" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: User }, { model: OrderItem, include: [Product] }],
    });

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Error fetching order" });
  }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { userId },
      include: [{ model: OrderItem, include: [Product] }],
    });

    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.status(404).json({ message: "No orders found for this user" });
    }
  } catch (error) {
    console.error("Error fetching orders for user:", error);
    res.status(500).json({ error: "Error fetching orders for user" });
  }
};
