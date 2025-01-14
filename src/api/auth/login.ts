import { authenticateService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { userSchema } from "@/schemas/user";
import { NextFunction, Request, Response } from "express";

const loginUser = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const token = await authenticateService?.login({ email, password });

    const response = {
      status: "success",
      statusCode: 200,
      message: "Login successful",
      data: {
        token,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export default requestMiddleware(loginUser, {
  validation: { body: userSchema },
});
