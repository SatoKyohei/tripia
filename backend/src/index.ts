import express, {
    json,
    Request as ExRequest,
    Response as ExResponse,
    urlencoded,
    NextFunction,
} from "express";
import { RegisterRoutes } from "../build/routes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
import cookieParser from "cookie-parser";

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({ message: "health check OK" });
});

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    const swaggerDocument = await import("../build/swagger.json");
    res.send(swaggerUi.generateHTML(swaggerDocument));
});

RegisterRoutes(app);

app.use(((err: unknown, _req: ExRequest, res: ExResponse, next: NextFunction) => {
    if (err instanceof ValidateError) {
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }

    if (err instanceof Error) {
        console.error(err);
        return res.status(500).json({
            message: err.message || "Internal Server Error",
        });
    }

    next();
}) as express.ErrorRequestHandler);

const port = process.env.PORT || 8080;
app.listen(port);
