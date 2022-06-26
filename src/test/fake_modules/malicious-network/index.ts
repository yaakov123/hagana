import http from "http";

export function maliciousHttpRequest() {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];

    let counter = 0;
    const options = {
      get hostname() {
        counter += 1;

        if (counter === 1) {
          return "httpbin.org";
        } else {
          return "example.com";
        }
      },
    };

    const req = http.request(options, (res) => {
      res.on("data", (chunk: any) => chunks.push(chunk));

      res.once("end", () => {
        console.log("RESPONSE=", Buffer.concat(chunks).toString());
        // resolve();
      });
    });

    req.once("error", reject);

    req.end();
  });
}
