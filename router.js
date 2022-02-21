// This Function To handle the router , Used into ./src/server.js
const router = (request, response) => {
    const endpoint = request.url;
    const method = request.method;

    if (endpoint === "/" && method === "GET") {
        response.writeHead(200, { "content-type": "text/html" });
        response.end();
    } else if (endpoint === "/blog" && method === "GET") {
        response.writeHead(200, { "content-type": "text/html" });
        response.end(JSON.stringify(["one", "two", "three"]));
    } else if (
        endpoint === "/blog" &&
        method === "POST" &&
        request.headers.password &&
        request.headers.password === "Ahmed"
    ) {
        let data = "";
        request.on("data", (chunk) => {
            data += chunk;
        });
        request.on("end", () => {
            response.writeHead(200, { "content-type": "application/json" });
            response.end(JSON.stringify(JSON.parse(data)));
        });
    }
    // else if (
    //     request.url === "/blog" &&
    //     request.method === "POST" &&
    //     request.headers.password
    // ) {
    //     let data;

    //     request.on("data", (chunk) => {
    //         data += chunk;
    //     });

    //     request.on("end", () => {
    //         if (!data) {
    //             response.writeHead(302, { Location: "/blog" });
    //         }
    //         response.end();
    //     });
    // }
    else if (endpoint === "/blog" && method === "POST") {
        response.writeHead(403, { "content-type": "text/html" });
        response.end("Forbidden 403");
    } else {
        response.writeHead(404, { "content-type": "text/html" });
        response.end("NOT FOUND PAGE");
    }
};

module.exports = router;
