import express from "express";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes";
import { initConnection } from "./db";

const app = express();
const port = process.env.PORT ?? "8080";

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded());
app.use(routes);

export async function main() {
    try {
        const con = await initConnection();
        await con.sync();
        app.listen(port, () => console.log(`App listing on port - ${port}`))
    } catch (error) {
        console.log('error', error);
        process.exit(1);
    };
};

main();
