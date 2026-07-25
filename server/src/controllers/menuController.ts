import { Request, Response } from "express";
import Menu from "../models/menuModel.js";
import uploadToCloudinary from "../utils/uploadImage.js";
import Restaurant from "../models/restaurantModel.js";
import mongoose from "mongoose";

export const addMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { name, description, price } = req.body;

    const existingRestaurant = await Restaurant.findOne({ user: id }).exec();
    if (!existingRestaurant) {
      return res.status(404).json({
        success: false,
        message: "You must create a restaurant before adding menu items",
      });
    }

    const result = await uploadToCloudinary(req);
    const imageUrl = result.secure_url;

    const menu = await Menu.create({
      restaurant: existingRestaurant._id,
      name,
      description,
      price: Number(price),
      image: imageUrl,
    });

    const restaurant = await Restaurant.findOne({ user: id }).exec();

    if (restaurant) {
      (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
      await restaurant.save();
    }

    res
      .status(201)
      .json({ success: true, message: "Menu added successfully", menu });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const editMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { menuId } = req.params;
    const { name, description, price } = req.body;

    const existingRestaurant = await Restaurant.findOne({ user: id }).exec();
    if (!existingRestaurant) {
      return res.status(404).json({
        success: false,
        message: "You must create a restaurant before adding menu items",
      });
    }

    const menu = await Menu.findById(menuId).exec();
    if (!menu) {
      return res
        .status(404)
        .json({ success: false, message: "Menu not found" });
    }

    if (req.file) {
      const result = await uploadToCloudinary(req);
      menu.image = result.secure_url;
    }
    menu.name = name || menu.name;
    menu.description = description || menu.description;
    menu.price = Number(price) || menu.price;
    await menu.save();

    res.status(200).json({ success: true, message: "Menu updated ", menu });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { menuId } = req.params;

    const existingRestaurant = await Restaurant.findOne({ user: id }).exec();
    if (!existingRestaurant) {
      return res.status(404).json({
        success: false,
        message: "You must create a restaurant before adding menu items",
      });
    }

    const menu = await Menu.findByIdAndDelete(menuId).exec();
    if (!menu) {
      return res
        .status(404)
        .json({ success: false, message: "Menu not found" });
    }

    res.status(200).json({ success: true, message: "Menu deleted", menu });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const getMenus = async (req: Request, res: Response) => {
  try {
    const { id: userid } = req.user;

    const restaurant = await Restaurant.findOne({ user: userid }).exec();
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Create your restaurant to add menus",
      });
    }

    const menus = await Menu.find({ restaurant: restaurant._id }).exec();
    res.status(200).json({ success: true, menus });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};
