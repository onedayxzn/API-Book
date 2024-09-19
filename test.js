const app = require("./app");
const request = require("supertest")(app);

describe("Test endpoint POST /member", () => {
  it("It should have status code 200", (done) => {
    request
      .post("/member")
      .send({
        code_member: "M001",
        name: "John Doe",
        is_penalty: 0,
        penalty_end_date: "2021-01-01",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("Test endpoint GET /member", () => {
  it("It should have status code 200", (done) => {
    request
      .get("/member")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("Test endpoint POST /borrow/M001", () => {
  it("It should have status code 200", (done) => {
    request
      .post("/borrow/M001")
      .send({
        code_book: "B001",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("Test endpoint POST /borrow/return/M001", () => {
  it("It should have status code 200", (done) => {
    request
      .post("/borrow/return/M001")
      .send({
        code_book: "B001",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("Test endpoint GET /borrow", () => {
  it("It should have status code 200", (done) => {
    request
      .get("/borrow")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("Test endpoint GET /book", () => {
  it("It should have status code 200", (done) => {
    request
      .get("/book")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("Test endpoint POST /book", () => {
  it("It should have status code 200", (done) => {
    request
      .post("/book")
      .send({
        code_book: "B001",
        title: "The Great Gatsby",
        stock: 10,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("Test endpoint PUT /book", () => {
  it("It should have status code 200", (done) => {
    request
      .put("/book")
      .send({
        code_book: "B001",
        stock: 15,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("Test endpoint GET /", () => {
  it("It should have status code 200", (done) => {
    request
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

d;
