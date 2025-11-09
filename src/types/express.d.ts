import type { JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface UserPayload extends JwtPayload {
            id: number;
            email: string;
            role: "admin" | "customer";
        }

        interface Request {
            user?: UserPayload
        }
    }
}