import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      
      // Allow static frontend admin bypass token
      if (token === "mock-frontend-admin-token") {
        req.adminId = "static-admin-id";
        return next();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
      req.adminId = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

