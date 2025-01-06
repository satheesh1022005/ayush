const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Use `mongoose.set` to suppress the `strictQuery` deprecation warning
    mongoose.set("strictQuery", false);

    // Ensure MONGO_URI does not include a trailing slash or database name
    const dbURI = process.env.MONGO_URI; // Ensure this does not end with a slash
    const databaseName = "ayushRegistration";
    console.log(dbURI);
    await mongoose.connect(`${dbURI}${databaseName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
