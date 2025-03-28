"use server";

import { ApiResponse } from "@/types/api.types";
import { Order } from "@/types/api.types";
import axios from "axios";
import nodemailer from "nodemailer";

type CreateOrder = {
  name: string;
  phone: string;
  pickup: string;
  items: string;
  delivery: string;
};

type OrderResponse = {
  success: boolean;
  message: string;
};

export async function createOrder(order: CreateOrder): Promise<OrderResponse> {
  try {
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.zoho.in",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: process.env.NEXT_PUBLIC_EMAIL_USER,
    //     pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD, // Use App Password for Gmail
    //   },
    //   debug: true,
    //   logger: true,
    // });

    // const mailOptions = {
    //   from: process.env.NEXT_PUBLIC_EMAIL_USER,
    //   to: process.env.NEXT_PUBLIC_EMAIL_TO || "support@faztro.com",
    //   subject: `New Delivery Request from ${order.name}`,
    //   html: `
    //     <h2>New Delivery Request</h2>
    //     <p><strong>Customer Name:</strong> ${order.name}</p>
    //     <p><strong>Phone Number:</strong> ${order.phone}</p>
    //     <h3>Order Details:</h3>
    //     <p><strong>Items to Deliver:</strong><br>${order.items}</p>
    //     <h3>Locations:</h3>
    //     <p><strong>Pickup Address:</strong><br>${order.pickup}</p>
    //     <p><strong>Delivery Address:</strong><br>${order.delivery}</p>
    //   `,
    // };

    // await transporter.sendMail(mailOptions);

    const { data } = await axios.post<ApiResponse<Order>>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/orders`,
      order
    );

    console.log(data, "data");

    if (data.success) {
      return {
        success: true,
        message:
          data.message ||
          "Your delivery request has been sent successfully! We'll contact you shortly.",
      };
    }

    return {
      success: false,
      message: data.message || "Unable to process your request at the moment.",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message:
        "Unable to process your request at the moment. Please try again later.",
    };
  }
}
