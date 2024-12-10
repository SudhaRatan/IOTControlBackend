import { NextFunction, Response, Request } from "express"
import { VerifyErrors, verify } from "jsonwebtoken"
import { AuthenticatedRequest } from "../types"

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["x-access-token"] as string ?? ""
    if (!token) {
        res.status(401).json({ message: "no token!" })
    } else {
        verify(token, process.env.access_token!, (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                res.json({ auth: false, message: "Auth failed", err: err })
            } else {
                (req as AuthenticatedRequest).userId = decoded.id
                next()
            }
        })
    }
}

export default verifyJWT