import { Request, Response, NextFunction } from 'express'
import ValidateAccessToken from '../../../app/usecases/ValidateAccessToken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export default async function RequireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.header("Authorization")
  if (!authorization) {
    const error = accessForbidden()
    return next(error)
  }

  try {
    const [_, token] = authorization.split(" ")

    const user = ValidateAccessToken(token, req.dependencies);
    if (!user) {
      const error = accessForbidden()
      return next(error)
    }

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

function accessForbidden() {
  const error = new Error("Access Forbidden")
  return error
}
