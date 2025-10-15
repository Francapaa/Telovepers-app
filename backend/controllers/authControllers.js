import authService from "../services/authService";
const authController = {
    register: async (req, res) => {
        try {
            const result = await authService.registerUser(req.body);
        }
        catch (error) {
            console.error('Hubo un error', error);
            return res.status(500).json({ message: 'Hubo un error' });
        }
    },
    login: async (req, res) => {
        try {
            const { token } = await authService.loginUser(req.body);
            res.status(201).json({ token });
        }
        catch (error) {
            console.error('Hubo un error', error);
            return res.status(409).json({ message: 'Hubo un error' + error.message });
        }
    }
};
export default authController;
