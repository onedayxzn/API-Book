const db = require("../connection");
const response = require("../response");

module.exports = {
  showMember: (req, res) => {
    const sql = `SELECT m.code_member, m.name, COUNT(b.code_book) as borrowed FROM member m LEFT JOIN borrowing b ON m.code_member = b.code_member GROUP BY m.code_member`;
    db.query(sql, (err, result) => {
      if (err) {
        response(500, err, "error", res);
      } else {
        response(200, result, "success", res);
      }
    });
  },
  addMember: (req, res) => {
    const { code_member, name, is_penalty, penalty_end_date } = req.body;
    const sql = `INSERT INTO member (code_member, name, is_penalty, penalty_end_date) VALUES ('${code_member}', '${name}', '${is_penalty}', '${penalty_end_date}')`;
    db.query(sql, (err, result) => {
      if (err) {
        response(500, err, "error", res);
      } else {
        response(200, result, "success", res);
      }
    });
  },
};
