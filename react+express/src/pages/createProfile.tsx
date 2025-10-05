import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../services/profile';
import {
  ROLES,
  WORK_PREFERENCES,
  AVAILABILITIES,
  PROGRAMMING_SKILLS,
  TOOLS_SKILLS,
  EXPERTISE_SKILLS,
  COUNTRIES,
} from '../constants/onBoardingOptions';
import '../style/createProfile.css';

export function Onboarding () {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    bio: '',
    location: { country: '', city: '' },
    workPreference: '',
    availability: '',
    role: '',
    skills: {
      programming: [] as string[],
      tools: [] as string[],
      expertise: [] as string[],
    },
    lookingFor: {
      description: '',
      roles: [] as string[],
    },
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      await updateProfile(formData);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Error completando perfil:', err);
      setError(err.response?.data?.message || 'Hubo un error. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.bio.length >= 50;
      case 2: return formData.location.country && formData.location.city;
      case 3: return formData.workPreference && formData.availability;
      case 4: return formData.role;
      case 5:
        return (
          formData.skills.programming.length > 0 ||
          formData.skills.tools.length > 0 ||
          formData.skills.expertise.length > 0
        );
      case 6: return formData.lookingFor.roles.length > 0;
      default: return false;
    }
  };

  const toggleSkill = (category: 'programming' | 'tools' | 'expertise', skill: string) => {
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [category]: formData.skills[category].includes(skill)
          ? formData.skills[category].filter((s) => s !== skill)
          : [...formData.skills[category], skill],
      },
    });
  };

  const toggleRole = (role: string) => {
    setFormData({
      ...formData,
      lookingFor: {
        ...formData.lookingFor,
        roles: formData.lookingFor.roles.includes(role)
          ? formData.lookingFor.roles.filter((r) => r !== role)
          : [...formData.lookingFor.roles, role],
      },
    });
  };

  return (
    <div className="onboarding-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      <div className="onboarding-content">
        <p className="step-indicator">Paso {currentStep} de {totalSteps}</p>

        {/* PASO 1: Bio */}
        {currentStep === 1 && (
          <div className="step">
            <h2>Cuéntanos sobre ti</h2>
            <p className="step-description">
              Describe tu experiencia y qué te apasiona (mínimo 50 caracteres)
            </p>

            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Ej: Soy desarrollador full-stack con 5 años de experiencia..."
              rows={6}
              maxLength={500}
            />
            <span className="char-count">
              {formData.bio.length}/500 {formData.bio.length < 50 && `(faltan ${50 - formData.bio.length})`}
            </span>
          </div>
        )}

        {/* PASO 2: Ubicación */}
        {currentStep === 2 && (
          <div className="step">
            <h2>¿Dónde te encuentras?</h2>

            <div className="form-group">
              <label>País</label>
              <select
                value={formData.location.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, country: e.target.value },
                  })
                }
              >
                <option value="">Selecciona tu país</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Ciudad</label>
              <input
                type="text"
                value={formData.location.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.target.value },
                  })
                }
                placeholder="Ej: Buenos Aires"
              />
            </div>
          </div>
        )}

        {/* PASO 3: Trabajo */}
        {currentStep === 3 && (
          <div className="step">
            <h2>Preferencias de trabajo</h2>

            <div className="form-group">
              <label>Modalidad</label>
              <div className="radio-group">
                {WORK_PREFERENCES.map((pref) => (
                  <label key={pref.value} className="radio-card">
                    <input
                      type="radio"
                      name="workPreference"
                      value={pref.value}
                      checked={formData.workPreference === pref.value}
                      onChange={(e) =>
                        setFormData({ ...formData, workPreference: e.target.value })
                      }
                    />
                    <span>{pref.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Disponibilidad</label>
              <div className="radio-group">
                {AVAILABILITIES.map((avail) => (
                  <label key={avail.value} className="radio-card">
                    <input
                      type="radio"
                      name="availability"
                      value={avail.value}
                      checked={formData.availability === avail.value}
                      onChange={(e) =>
                        setFormData({ ...formData, availability: e.target.value })
                      }
                    />
                    <span>{avail.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PASO 4: Rol */}
        {currentStep === 4 && (
          <div className="step">
            <h2>¿Cuál es tu rol principal?</h2>

            <div className="role-grid">
              {ROLES.map((role) => (
                <label key={role.value} className="role-card">
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  <div className="role-content">
                    <span className="role-icon">{role.icon}</span>
                    <span className="role-label">{role.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* PASO 5: Skills */}
        {currentStep === 5 && (
          <div className="step">
            <h2>¿Cuáles son tus habilidades?</h2>
            <p className="step-description">Selecciona al menos 3</p>

            <div className="skills-section">
              <h3>Programación</h3>
              <div className="skills-grid">
                {PROGRAMMING_SKILLS.map((skill) => (
                  <label key={skill} className="skill-pill">
                    <input
                      type="checkbox"
                      checked={formData.skills.programming.includes(skill)}
                      onChange={() => toggleSkill('programming', skill)}
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="skills-section">
              <h3>Herramientas</h3>
              <div className="skills-grid">
                {TOOLS_SKILLS.map((skill) => (
                  <label key={skill} className="skill-pill">
                    <input
                      type="checkbox"
                      checked={formData.skills.tools.includes(skill)}
                      onChange={() => toggleSkill('tools', skill)}
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="skills-section">
              <h3>Expertise</h3>
              <div className="skills-grid">
                {EXPERTISE_SKILLS.map((skill) => (
                  <label key={skill} className="skill-pill">
                    <input
                      type="checkbox"
                      checked={formData.skills.expertise.includes(skill)}
                      onChange={() => toggleSkill('expertise', skill)}
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PASO 6: Lo que busca */}
        {currentStep === 6 && (
          <div className="step">
            <h2>¿Qué tipo de co-founder buscas?</h2>

            <div className="form-group">
              <label>Roles (puedes seleccionar múltiples)</label>
              <div className="checkbox-grid">
                {ROLES.map((role) => (
                  <label key={role.value} className="checkbox-card">
                    <input
                      type="checkbox"
                      checked={formData.lookingFor.roles.includes(role.value)}
                      onChange={() => toggleRole(role.value)}
                    />
                    <div className="checkbox-content">
                      <span className="role-icon">{role.icon}</span>
                      <span>{role.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Descripción adicional (opcional)</label>
              <textarea
                value={formData.lookingFor.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lookingFor: {
                      ...formData.lookingFor,
                      description: e.target.value,
                    },
                  })
                }
                placeholder="Ej: Busco un CTO con experiencia en startups..."
                rows={4}
                maxLength={300}
              />
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          {currentStep > 1 && (
            <button onClick={handleBack} className="btn-secondary" disabled={loading}>
              Atrás
            </button>
          )}

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid() || loading}
              className="btn-primary"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid() || loading}
              className="btn-primary"
            >
              {loading ? 'Guardando...' : 'Finalizar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

