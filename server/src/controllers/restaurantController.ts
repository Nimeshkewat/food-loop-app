import { Request, Response } from "express";
import Restaurant from "../models/restaurantModel.js";
import uploadToCloudinary from "../utils/uploadImage.js";
import Order from "../models/orderModel.js";
import Menu from "../models/menuModel.js";
import Cart from "../models/cartModel.js";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;

    const restaurant = await Restaurant.findOne({ user: id }).exec();
    if (restaurant) {
      return res
        .status(400)
        .json({ success: false, message: "Restaurant already exists" });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Restaurant image is required",
      });
    }

    const result = await uploadToCloudinary(req);
    const imageUrl = result.secure_url;

    await Restaurant.create({
      user: id,
      restaurantName,
      city,
      country,
      deliveryTime: Number(deliveryTime),
      cuisines: JSON.parse(cuisines),
      imageUrl,
    });

    const updatedRestaurant = await Restaurant.findOne({ user: id }).exec();

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const restaurant = await Restaurant.findOne({ user: id }).exec();
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, restaurant });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;

    const restaurant = await Restaurant.findOne({ user: id }).exec();
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    if (req.file) {
      const result = await uploadToCloudinary(req);
      restaurant.imageUrl = result.secure_url;
    }

    restaurant.restaurantName = restaurantName || restaurant.restaurantName;
    restaurant.city = city || restaurant.city;
    restaurant.country = country || restaurant.country;
    restaurant.deliveryTime = deliveryTime || restaurant.deliveryTime;

    if (cuisines) {
      restaurant.cuisines = JSON.parse(cuisines);
    }

    await restaurant.save();

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const getRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const restaurant = await Restaurant.findOne({ user: id }).exec();
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("user restaurant")
      .exec();

    res.status(200).json({ success: true, orders });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const restaurant = await Restaurant.findOneAndDelete({ user: id }).exec();
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    await Promise.all([
      await Menu.deleteMany({ restaurant: restaurant._id }),
      await Cart.deleteMany({ restaurant: restaurant._id }),
    ]);

    res
      .status(200)
      .json({ success: true, message: "Restaurant deleted successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

//*
export const getRestaurantWithFilters = async (req: Request, res: Response) => {
  try {
    const { searchText } = req.params;
    const { searchQuery } = req.query;

    const cuisinesQuery = req.query.selectedCuisines as string;
    const selectedCuisines = cuisinesQuery
      ? cuisinesQuery.split(",").filter(Boolean)
      : [];

    const query: any = {};

    if (searchText) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } },
      ];
    }

    if (searchQuery) {
      query.cuisines = { $regex: searchQuery, $options: "i" };
    }

    if (selectedCuisines.length > 0) {
      query.cuisines = { $in: selectedCuisines };
    }

    const restaurants = await Restaurant.find(query)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json({ success: true, restaurants });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const getSingleRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId)
      .populate("menus")
      .exec();

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, restaurant });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "restaurant",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: [
              { $eq: [{ $size: "$reviews" }, 0] },
              0,
              { $avg: "$reviews.foodRating" },
            ],
          },
        },
      },
      { $sort: { averageRating: -1 } },
      { $limit: 5 },
      { $project: { reviews: 0 } },
    ]);

    res.status(200).json({ success: true, restaurants });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};
