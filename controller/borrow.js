const db = require("../connection");
const response = require("../response");
const member = require("./member");

module.exports = {
  showBorrow: (req, res) => {
    const sql = `SELECT b.code_borrow, m.name, bo.title, b.borrow_date, b.return_date, b.is_returned FROM borrowing b JOIN member m ON b.code_member = m.code_member JOIN book bo ON b.code_book = bo.code_book`;
    db.query(sql, (err, result) => {
      if (err) {
        response(500, err, "error", res);
      } else {
        response(200, result, "success", res);
      }
    });
  },

  //   member dapat meminjam buku tetapi tidak boleh lebih dari 2 buku
  //  batas waktu peminjaman buku adalah 7 hari jika lebih dari itu maka member tersebut terkena penalty
  //   jika member yang meminjam buku sedang terkena penalty maka tidak bisa meminjam buku
  //  jika member yang meminjam buku melebihi batas waktu peminjaman maka member tersebut terkena penalty yaitu selama 3 hari tidak bisa meminjam buku
  //   kurangi stock buku jika member berhasil meminjam buku
  borrowBook: (req, res) => {
    const code_member = req.params.code_member;
    const { code_book } = req.body;
    const sql = `SELECT COUNT(code_borrow) as borrowed FROM borrowing WHERE code_member = '${code_member}' AND is_returned = 0`;
    db.query(sql, (err, result) => {
      if (err) {
        response(500, err, "error", res);
      } else {
        // jika member sudah meminjam 2 buku baik buku yang sama maupun berbeda maka member tidak bisa meminjam buku
        if (result[0].borrowed >= 2) {
          response(400, [], "Member sudah meminjam 2 buku", res);
        } else {
          const sql = `SELECT is_penalty, penalty_end_date FROM member WHERE code_member = '${code_member}'`;
          db.query(sql, (err, result) => {
            if (err) {
              response(500, err, "error", res);
            } else {
              //  member yang terkena penalty tidak bisa meminjam buku
              if (result[0].is_penalty === 1) {
                response(400, [], "Member terkena penalty", res);
              } else if (result[0].penalty_end_date > new Date()) {
                response(400, [], "Member terkena penalty", res);
              } else {
                const sql = `SELECT stock FROM book WHERE code_book = '${code_book}'`;
                db.query(sql, (err, result) => {
                  if (err) {
                    response(500, err, "error", res);
                  } else {
                    if (result[0].stock <= 0) {
                      response(400, [], "Stock buku habis", res);
                    } else {
                      const sql = `INSERT INTO borrowing (code_borrow, code_member, code_book, borrow_date, return_date, is_returned) VALUES ('${code_member}${code_book}', '${code_member}', '${code_book}', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 0)`;
                      db.query(sql, (err, result) => {
                        if (err) {
                          response(500, err, "error", res);
                        } else {
                          const sql = `UPDATE book SET stock = stock - 1 WHERE code_book = '${code_book}'`;
                          db.query(sql, (err, result) => {
                            if (err) {
                              response(500, err, "error", res);
                            } else {
                              response(200, result, "success", res);
                            }
                          });
                        }
                      });
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
  },

  bookReturn: (req, res) => {
    const code_member = req.params.code_member;
    const { code_book } = req.body;
    const sql = `SELECT DATEDIFF(CURDATE(), borrow_date) as diff FROM borrowing WHERE code_member = '${code_member}' AND code_book = '${code_book}' AND is_returned = 0`;
    db.query(sql, (err, result) => {
      if (err) {
        response(500, err, "error", res);
      } else {
        if (result[0].diff > 7) {
          const sql = `UPDATE member SET is_penalty = 1, penalty_end_date = DATE_ADD(CURDATE(), INTERVAL 3 DAY) WHERE code_member = '${code_member}'`;
          db.query(sql, (err, result) => {
            if (err) {
              response(500, err, "error", res);
            } else {
              response(400, [], "Terlambat mengembalikan buku", res);
            }
          });
        } else {
          const sql = `UPDATE borrowing SET is_returned = 1 WHERE code_member = '${code_member}' AND code_book = '${code_book}'`;
          db.query(sql, (err, result) => {
            if (err) {
              response(500, err, "error", res);
            } else {
              const sql = `UPDATE book SET stock = stock + 1 WHERE code_book = '${code_book}'`;
              db.query(sql, (err, result) => {
                if (err) {
                  response(500, err, "error", res);
                } else {
                  const sql = `UPDATE member SET borrowed = borrowed - 1 WHERE code_member = '${code_member}'`;
                  db.query(sql, (err, result) => {
                    if (err) {
                      response(500, err, "error", res);
                    } else {
                      response(200, result, "success", res);
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
  },
};
