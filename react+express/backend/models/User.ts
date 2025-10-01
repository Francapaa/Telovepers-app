// models/User.ts - VERSIÓN INICIAL SIMPLE
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // ============ REGISTRO INICIAL (obligatorios) ============
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
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  // ============ ONBOARDING (opcionales al inicio) ============
  profileImage: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: '',
  },
  
  // Ubicación
  location: {
    country: String,
    city: String,
  },
  workPreference: {
    type: String,
    enum: ['remote', 'presencial', 'hybrid'],
  },
  availability: {
    type: String,
    enum: ['full-time', 'part-time', 'weekends', 'flexible'],
  },
  
  // Rol y habilidades
  role: {
    type: String,
    enum: ['technical', 'business', 'product', 'design', 'marketing', 'sales', 'finance'],
  },
  skills: {
    programming: [String],
    tools: [String],
    expertise: [String],
  },
  
  // Idiomas
  languages: [{
    language: String,
    proficiency: {
      type: String,
      enum: ['basic', 'intermediate', 'advanced', 'native'],
    }
  }],
  
  // Lo que busca
  lookingFor: {
    description: String,
    roles: [String],
  },
  
  // ============ ESTADO DEL PERFIL ============
  profileCompleted: {
    type: Number,
    default: 20, // Ya tienen name, email, password = 20%
  },
  onboardingCompleted: {
    type: Boolean,
    default: false,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
export default User;