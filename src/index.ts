import express from "express";
import connectDB from "./config/dbConnect";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import deliveryPersonRoute from "./routes/deliveryPerson.route";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("BYTEATS backend on notch");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/deliveryPerson", deliveryPersonRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

export default app;
