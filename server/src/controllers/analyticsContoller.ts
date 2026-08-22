import { Request, Response } from "express";
import Order from "../models/orderModel.js";
import Review from "../models/reviewModel.js";
import Restaurant from "../models/restaurantModel.js";

export const getDashboardAnalytics = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;

    const restaurant = await Restaurant.findOne({ user: userId }).exec();
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Create your restaurant to view analytics",
      });
    }

    const restaurantId = restaurant._id;
    const [
      revenueResult,
      orderCount,
      ordersByStatusResult,
      revenueOverTimeResult,
      topSellingItemsResult,
      reviewsResult,
    ] = await Promise.all([
      //* total revenue — only paid orders count
      Order.aggregate([
        { $match: { restaurant: restaurantId, paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),

      //* total order count
      Order.countDocuments({ restaurant: restaurantId }),

      //* orders grouped by status
      Order.aggregate([
        { $match: { restaurant: restaurantId } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),

      //* revenue over the last 30 days, grouped by day
      Order.aggregate([
        {
          $match: {
            restaurant: restaurantId,
            paymentStatus: "paid",
            createdAt: {
              $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            revenue: { $sum: "$totalAmount" },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      //* top 5 selling menu items by quantity
      Order.aggregate([
        { $match: { restaurant: restaurantId, paymentStatus: "paid" } },
        { $unwind: "$cartItems" },
        {
          $group: {
            _id: "$cartItems.name",
            quantitySold: { $sum: "$cartItems.quantity" },
          },
        },
        { $sort: { quantitySold: -1 } },
        { $limit: 5 },
      ]),

      //* average rating across all reviews for this restaurant
      Review.aggregate([
        { $match: { restaurant: restaurantId } },
        { $group: { _id: null, avgFood: { $avg: "$foodRating" } } },
      ]),
    ]);

    //* shape ordersByStatus into the fixed object the frontend expects
    const statusDefaults = {
      pending: 0,
      confirmed: 0,
      preparing: 0,
      outfordelivery: 0,
      delivered: 0,
    };
    ordersByStatusResult.forEach((entry: { _id: string; count: number }) => {
      if (entry._id in statusDefaults) {
        statusDefaults[entry._id as keyof typeof statusDefaults] = entry.count;
      }
    });

    res.status(200).json({
      success: true,
      totalRevenue: revenueResult[0]?.total || 0,
      totalOrders: orderCount,
      averageRating: reviewsResult[0]?.avgFood
        ? Number(reviewsResult[0].avgFood.toFixed(1))
        : 0,
      ordersByStatus: statusDefaults,
      revenueOverTime: revenueOverTimeResult.map(
        (r: { _id: string; revenue: number }) => ({
          date: r._id,
          revenue: r.revenue,
        }),
      ),
      topSellingItems: topSellingItemsResult.map(
        (item: { _id: string; quantitySold: number }) => ({
          name: item._id,
          quantitySold: item.quantitySold,
        }),
      ),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};
