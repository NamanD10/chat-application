import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
    try {
        const token = generateStreamToken(req.user.id);

        res.status(200).json({ token });
    } catch (error) {
        console.log("error in getStreamToken controller", error);
        res.send(500).json({
            message: "Internal server error"
        });
    }
}