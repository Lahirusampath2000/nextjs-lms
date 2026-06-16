const pool = require("../config/database");

const getTeacher = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                u.id,
                u.name,
                t.subject,
                t.phone,
                t.qualification
            FROM users u
            JOIN teachers t ON t.user_id = u.id
            WHERE u.role = 'teacher'
        `);

        return res.status(200).json({
            success: true,
            teachers: result.rows
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = { getTeacher };