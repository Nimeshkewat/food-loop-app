import { Request, Response } from "express";
import Menu from "../models/menuModel.js";
import Cart from "../models/cartModel.js";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { menuId, quantity } = req.body;

    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    const qty = Number(quantity) > 0 ? Number(quantity) : 1;
    let cart = await Cart.findOne({ user: userId });

    //* no cart yet — create a fresh one for this restaurant
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        restaurant: menu.restaurant,
        items: [
          {
            menuId: menu._id,
            name: menu.name,
            image: menu.image,
            price: menu.price,
            quantity: qty,
          },
        ],
      });

      return res.status(201).json({
        success: true,
        message: "Item added to cart",
        cart,
      });
    }

    //* cart exists but belongs to a different restaurant
    if (!cart.restaurant.equals(menu.restaurant)) {
      return res.status(409).json({
        success: false,
        message:
          "Your cart contains items from another restaurant. Please clear your cart to order from here.",
      });
    }

    //* same restaurant — check if item already exists in cart
    const existingItem = cart.items.find((item: any) =>
      item.menuId.equals(menu._id),
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({
        menuId: menu._id,
        name: menu.name,
        image: menu.image,
        price: menu.price,
        quantity: qty,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknwon error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknwon error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknwon error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknwon error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};
