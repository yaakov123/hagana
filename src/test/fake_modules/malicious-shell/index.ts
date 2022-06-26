import childProcess from "child_process";

export function maliciousShell() {
  const result = childProcess.execSync("node -v; cat /etc/passwd").toString();
  console.log("RESULT=", result);
}
