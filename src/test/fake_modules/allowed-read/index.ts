import fs from "fs";
import path from "path";

export function allowedReadFileSync() {
  const fileContents = fs.readFileSync(
    path.resolve(
      "/Users/yaakovbeckerman/projects/hagana/core/src/test/overrides/allowed/.env"
    ),
    "utf-8"
  );
}
