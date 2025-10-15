import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
const JWT_SECRET = process.env.JWT_SECRET;
let JWT_SECRET_USED;
if (JWT_SECRET) {
    JWT_SECRET_USED = JWT_SECRET;
}
const authService = {
    registerUser: async (userData) => {
        try {
            const { name, lastname, email, phoneNumber, password } = userData;
            if (!email || !name || !phoneNumber || !password || !lastname) {
                throw new Error('Faltan datos por completar');
            }
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Credenciales invalidas');
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                name,
                lastname,
                email,
                phoneNumber,
                password: hashedPassword
            });
            await newUser.save();
            return {
                User: {
                    name: newUser.name,
                    lastname: newUser.lastname,
                    email: newUser.email,
                    phoneNumber: newUser.phoneNumber
                }
            };
        }
        catch (error) {
            console.error(error);
            throw new Error('Error en el registro, intentelo de nuevo');
        }
    },
    loginUser: async (loginUserData) => {
        try {
            const { email, password } = loginUserData;
            if (!email || !password) {
                throw new Error('Faltan credenciales');
            }
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                throw new Error('Mail invalido');
            }
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (!isMatch) {
                throw new Error('Contraseña incorrecta');
            }
            const token = jwt.sign({ userId: existingUser._id, email: existingUser.email }, JWT_SECRET_USED, { expiresIn: '1h' });
            return {
                token,
                User: {
                    id: existingUser._id,
                    name: existingUser.name,
                    lastname: existingUser.lastname,
                    email: existingUser.email,
                    phoneNumber: existingUser.phoneNumber,
                }
            };
        }
        catch (error) {
            console.error(error);
            throw new Error('Error en el inicio de sesion');
        }
    }
};
export default authService;
