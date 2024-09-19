const db = require("../connection");
const response = require("../response");

module.exports = {
  //   table book
  //     code_book varchar(8) UNIQUE,
  //     title varchar(255),
  //     author varchar(25),
  //     stock int,
  //     primary KEY(code_book)
  //     table borrowing
  //     code_borrow varchar(8) unique primary KEY,
  //     code_member varchar(8),
  //     code_book varchar(8),
  //     borrow_date date,
  //     return_date date,
  //     is_returned boolean,
  //     CONSTRAINT FK_member FOREIGN KEY (code_member) references member(code_member),
  //     CONSTRAINT FK_book FOREIGN KEY (code_book) references book(code_book)
  //   tampilkan semua data buku serta jumlahnya tapi buku yang sedang dipinjam tidak dihitung sebagai stock
  showBook: (req, res) => {
    const sql = `SELECT b.code_book, b.title, b.author, b.stock, COUNT(borrowing.code_book) as borrowed FROM book b LEFT JOIN borrowing ON b.code_book = borrowing.code_book GROUP BY b.code_book`;
    db.query(sql, (err, result) => {
      if (err) {
        response(500, err, "error", res);
      } else {
        response(200, result, "success", res);
      }
    });
  },
  addBook: (req, res) => {
    const { code_book, title, author, stock } = req.body;
    const sql = `INSERT INTO book (code_book, title, author, stock) VALUES ('${code_book}', '${title}', '${author}', ${stock})`;
    db.query(sql, (err, result) => {
      if (err) {
        response(500, err, "error", res);
      } else {
        response(200, result, "success", res);
      }
    });
  },
  addStock: (req, res) => {
    const { stock, code_book } = req.body;
    const sql = `UPDATE book SET stock = stock + '${stock}' WHERE code_book = '${code_book}'`;
    db.query(sql, (err, result) => {
      if (err) {
        response(500, err, "error", res);
      } else {
        response(200, result, "success", res);
      }
    });
  },
};
