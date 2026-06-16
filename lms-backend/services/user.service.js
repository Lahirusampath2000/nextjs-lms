const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//register user
const registerUser = async (req, res) => {
    try{
        const {name, email, password, role, subject, grade} = req.body;
        //validation
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Missing fields"
            });
        }

        //check email already exists
        const existingUser = await pool.query(
            `SELECT * FROM users WHERE email=$1`,
            [email]);

        if(existingUser.rows.length > 0){
            return res.status(400).json({
                success:false,
                message:"Email already exists"
            });
        }
        //hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

         const userResult = await pool.query(
            `INSERT INTO users (name, email, password, role, grade)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, name, email, role, grade`,
            [
                name,
                email,
                hashedPassword,
                role || "student",
                grade || null
            ]
        );
        const user = userResult.rows[0];
        //if user role= student save to student table
        if (user.role === "student") {
            await pool.query(
                `INSERT INTO students (user_id, student_number, grade)
                 VALUES ($1, $2, $3)`,
                [
                    user.id,
                    "STU-" + Date.now(),
                    grade || null,
                    
                ]
            );
        }

        //if user role= teacher save to teacher table
        if (user.role === "teacher") {
            await pool.query(
                `INSERT INTO teachers (user_id, subject)
                 VALUES ($1, $2)`,
                [
                    user.id,
                    subject || null
                ]
            );
        }

        return res.status(201).json({
            success:true,
            user
        });

    
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Server error"
        });

    }
    
}

//login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validate email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing fields"
            });
        }
        //check user exists
        const userResult = await pool.query(
            `SELECT * FROM users WHERE email=$1`,
            [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const user = userResult.rows[0];
        //check password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        //create token
        const token = jwt.sign(
            { id: user.id ,role:user.role},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                grade: user.grade
            },
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = { registerUser, loginUser };