const supertest = require("supertest");
const router = require("./router.js");

test("1- Test Default route returns a status code of 404", (done) => {
    supertest(router)
        .get("/unknown-uri")
        .expect(404)
        .expect("Content-Type", /html/)
        .end((error, response) => {
            if (response) return done(error);
            expect(response.statusCode).toBe(404);
            expect(response.text).toBe("NOT FOUND PAGE");
            done();
        });
});

test("2- Test blog route (GET) returns a status code of 202", (done) => {
    supertest(router)
        .get("/blog")
        .expect(200)
        .expect("Content-Type", /html/)
        .end((error, response) => {
            if (response) return done(error);
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe(["one", "two", "three"]);
            done();
        });
});

test("3- Test blog route (POST) returns a status code of 202", (done) => {
    supertest(router)
        .post("/blog")
        .expect(200)
        .send(JSON.stringify(["a", "b"]))
        .set({ password: "Ahmed" })
        .expect("Content-Type", "application/json")
        .end((error, response) => {
            if (response) return done(error);
            expect(response.statusCode).toBe(200);
            expect(response.text).toEqual(["a", "b"]);
            done();
        });
});

test("4- Test if no Body and noHeaders in POST /blog  returns a status code of 403 Forbidden ", (done) => {
    supertest(router)
        .post("/blog")
        .expect(403)
        .expect("Content-Type", /html/)
        .end((error, response) => {
            if (response) return done(error);
            expect(response.statusCode).toBe(403);
            expect(response.text).toBe("Forbidden 403");
            done();
        });
});

// test("5- Test if Headers in POST /blog  returns a status code of 302 Redirection ", (done) => {
//     supertest(router)
//         .post("/blog")
//         .expect(302)
//         .expect("Content-Type", /html/)
//         .end((error, response) => {
//             if (response) return done(error);
//             expect(response.statusCode).toBe(302);
//             expect(response.text).toEqual(["one", "two", "three"]);
//             done();
//         });
// });
