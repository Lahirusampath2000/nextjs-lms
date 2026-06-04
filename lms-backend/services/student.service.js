const pool = require("../config/database");

// Add student 
const addStudent = async (req, res) => {
  try {
    const { student_number, name, grade, phone, email } = req.body;

    // validation
    if (!student_number || !name || !grade || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    // insert student data to database
    const result = await pool.query(
      `INSERT INTO students (student_number, name, grade, phone, email)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [student_number, name, grade, phone, email]
    );

    return res.status(201).json({
      success: true,
      student: result.rows[0],
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getStudent=async(req,res)=>{
    try{
        const result=await pool.query(`SELECT * FROM students`);
        return res.status(200).json({
            success:true,
            students:result.rows
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
}

module.exports = { addStudent, getStudent };