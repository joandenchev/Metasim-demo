import path from "node:path";
import {fileURLToPath} from "node:url";
import {config} from "dotenv";

export const dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

config({path: path.join(dirname, 'env', '.env')})

export const secure = process.env.USE_HTTP !== 'ALLOW' || process.argv[2] === '-s'