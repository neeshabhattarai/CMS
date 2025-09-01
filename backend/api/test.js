
const sequelize = require("../model/database");

 async function handler(req, res) {
  try {
    await sequelize.authenticate();
    const [rows] = await sequelize.query("SELECT NOW() as time");
    console.log("worked")
    res.status(200).json({ ok: true, time: rows[0].time });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
module.exports=handler;
