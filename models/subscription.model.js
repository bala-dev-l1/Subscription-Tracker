import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EURO", "INR"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "finance",
        "politics",
        "other",
      ],
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Start date cannot be in the future",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto-calculate renewalDate if not provided
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate && this.startDate && this.frequency) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }
  //Auto-update the satus if renewal date has not passed
  if(this.renewalDate && this.renewalDate < new Date()) {

    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
