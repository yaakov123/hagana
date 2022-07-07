import http from "http";

export function allowedHttp() {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];

    const options = {
      hostname: "jsonplaceholder.typicode.com",
      path: "/todos/1",
    };

    const req = http.request(options, (res) => {
      res.on("data", (chunk: any) => chunks.push(chunk));

      res.once("end", () => {
        resolve("");
      });
    });

    req.once("error", reject);

    req.end();
  });
}
