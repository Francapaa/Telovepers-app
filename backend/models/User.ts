
import mongoose, { Document, Types } from "mongoose";

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

  calculateProfileCompletition(): number;
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


userSchema.methods.calculateProfileCompletition = function (this: UserDocument) {
  let completed = 20; // base: nombre, apellido, email, password, telefono

  if (this.profileImage) completed += 10;
  if (this.bio && this.bio.length >= 20) completed += 15; // 👈 Cambiá a >= 20 para ser consistente
  
  if (this.location?.country && this.location?.city) completed += 10;
  if (this.workPreference) completed += 10;
  if (this.availability) completed += 10;
  if (this.role) completed += 15; // 👈 Mantené el mismo peso que tenías

  // Skills con el mismo cálculo que tenías
  const totalSkills = 
    (this.skills?.programming?.length || 0) +
    (this.skills?.tools?.length || 0) +
    (this.skills?.expertise?.length || 0);
  
  if (totalSkills >= 3) {
    completed += 15;
  } else if (totalSkills > 0) {
    completed += (totalSkills / 3) * 15;
  }

  if (this.languages && this.languages.length > 0) {
    const someWithProficiency = this.languages.some((l) => !!l.proficiency);
    if (someWithProficiency) completed += 5;
  }
  if (this.lookingFor?.roles?.length &&  this.lookingFor?.roles?.length > 0) completed += 15;

  return Math.min(completed, 100);
};


userSchema.pre<UserDocument>("save", function (next) {
  this.profileCompleted = this.calculateProfileCompletition();
  this.onboardingCompleted = this.profileCompleted == 100; 
  next();
});
userSchema.virtual("id").get(function(){
  return this._id.toHexString(); 
})

userSchema.set("toJSON", {
  virtuals: true
});

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
