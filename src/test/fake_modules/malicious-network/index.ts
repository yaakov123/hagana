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

export function maliciousLookupBypass() {
  return new Promise((resolve, reject) => {
    const maliciousHost = "example.com";
    const maliciousIp = "93.184.216.34";
    const chunks: any[] = [];

    const req = http.request(
      "http://httpbin.org/get",
      {
        lookup: (_hostname, _options, callback) =>
          callback(null, maliciousIp, 4),
        headers: {
          Host: maliciousHost,
        },
      },
      (res) => {
        res.on("data", (chunk) => {
          chunks.push(chunk);
        });

        res.once("end", () => {
          console.log("RESPONSE=", Buffer.concat(chunks).toString());
          resolve("");
        });
      }
    );

    req.once("error", () => {
      console.log("err");

      reject();
    });

    req.end();
  });
}
