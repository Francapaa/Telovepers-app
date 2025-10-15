// models/User.js
const mongoose = require('mongoose');
// Definición del esquema del usuario
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Esto asegura que cada email sea único
    },
    phoneNumber: {
        type: String,
        required: false, // Puedes hacerlo opcional
    },
    password: {
        type: String,
        required: true,
    },
    // Puedes añadir otros campos, como la fecha de creación
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// Creación del modelo a partir del esquema
const User = mongoose.model('User', userSchema);
export default User;
