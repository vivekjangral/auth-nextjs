import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export function getDataFromToken(request: NextRequest) {
    try{
        const token = request.cookies.get("token")?.value || "";
        const data: any  = jwt.verify(token, process.env.TOKEN_SECRET!);
        return data.userId;

    } catch(error) {
        throw new Error("Error while decoding token");
    }
}
