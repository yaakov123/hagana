import fs from "fs";
import path from "path";

export function allowedReadFileSync() {
  const fileContents = fs.readFileSync(
    path.resolve(__dirname, "../../overrides/allowed/.env"),
    "utf-8"
  );
}
