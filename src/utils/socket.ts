import { VerifyErrors, verify } from "jsonwebtoken"

export const verifyJWT = (token: string) => {
    return new Promise<boolean | string>((resolve, reject) => {
        verify(token, process.env.access_token!, (err: VerifyErrors | null, decoded: any) => {
            if (err) reject(false)
            resolve(decoded.id)
        })
    })
}