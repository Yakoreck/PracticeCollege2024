import jwt from "jsonwebtoken";

const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, process.env.JWTSECRET!, {
    expiresIn: "30d",
  });
};

export default generateToken;
