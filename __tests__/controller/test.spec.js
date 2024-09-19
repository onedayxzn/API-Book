const { bookController } = require("../controller/book");
const { memberController } = require("../controller/member");
const { borrowController } = require("../controller/borrow");

describe("Book Controller", () => {
  it("should return status code 200", async () => {
    const response = await bookController.showBook();
    expect(response.statusCode).toBe(200);
  });

  it("should return status code 200", async () => {
    const response = await bookController.addBook();
    expect(response.statusCode).toBe(200);
  });

  it("should return status code 200", async () => {
    const response = await bookController.addStock();
    expect(response.statusCode).toBe(200);
  });
});

describe("Member Controller", () => {
  it("should return status code 200", async () => {
    const response = await memberController.showMember();
    expect(response.statusCode).toBe(200);
  });

  it("should return status code 200", async () => {
    const response = await memberController.addMember();
    expect(response.statusCode).toBe(200);
  });

  it("should return status code 200", async () => {
    const response = await memberController.updateMember();
    expect(response.statusCode).toBe(200);
  });
});

describe("Borrow Controller", () => {
  it("should return status code 200", async () => {
    const response = await borrowController.showBorrow();
    expect(response.statusCode).toBe(200);
  });

  it("should return status code 200", async () => {
    const response = await borrowController.borrowBook();
    expect(response.statusCode).toBe(200);
  });

  it("should return status code 200", async () => {
    const response = await borrowController.bookReturn();
    expect(response.statusCode).toBe(200);
  });
});
