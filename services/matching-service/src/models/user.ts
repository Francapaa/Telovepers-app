import mongoose, {Types, Document} from 'mongoose';

interface Language {
  language?: string;
  proficiency?: "basic" | "intermediate" | "advanced" | "native";
}
interface Skills {
  programming?: string[];
  tools?: string[];
  expertise?: string[];
}
interface LookingFor {
  description?: string;
  roles?: string[];
}

export interface UserDocument extends Document {
  _id: Types.ObjectId; 
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;

  profileImage?: string | null;
  bio?: string;

  location?: { country?: string; city?: string };
  workPreference?: "remote" | "presencial" | "hybrid";
  availability?: "full-time" | "part-time" | "weekends" | "flexible";

  role?: "technical" | "business" | "product" | "design" | "marketing" | "sales" | "finance";
  skills?: Skills;
  languages?: Language[];
  lookingFor?: LookingFor;

  profileCompleted?: number;
  onboardingCompleted?: boolean;

}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },

    profileImage: { type: String, default: null },
    bio: { type: String, default: "" },

    location: {
      country: String,
      city: String,
    },
    workPreference: {
      type: String,
      enum: ["remote", "presencial", "hybrid"],
    },
    availability: {
      type: String,
      enum: ["full-time", "part-time", "weekends", "flexible"],
    },

    role: {
      type: String,
      enum: ["technical", "business", "product", "design", "marketing", "sales", "finance"],
    },
    skills: {
      programming: [String],
      tools: [String],
      expertise: [String],
    },

    languages: [
      {
        language: String,
        proficiency: {
          type: String,
          enum: ["basic", "intermediate", "advanced", "native"],
        },
      },
    ],

    lookingFor: {
      description: String,
      roles: [String],
    },

    profileCompleted: { type: Number, default: 20 },
    onboardingCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, 
  }
);

export const User = mongoose.model("User", userSchema); 