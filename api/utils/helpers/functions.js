import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

export const sanitizeObject = (obj, rule) => {
  if (typeof obj !== "object" && typeof rule !== "object") {
    throw new Error("obj or rule is not an object"); 
  }

  for (const key of Object.keys(rule)) {
    if (obj.hasOwnProperty(key)){
      if (typeof obj[key] === rule[key]) {
        return true;
      }
      throw new Error(`Wrong type for property ${key}`);
    }
    throw new Error(`Missing property ${key}`);
  }
};