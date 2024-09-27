export interface SmoothiesInterface {
  id: string;
  created_at: string;
  title: string;
  method: string;
  rating: number;
}

// Questionnaire Interfaces

export interface SurveyType {
  id: string;          // UUID
  type_name: string;    // Name of the survey section
  description?: string; // Optional description
  created_at: string;   // Timestamp when the survey type was created
}

export interface Question {
  id: string;                  // UUID
  survey_type_id: string;       // Foreign key referencing SurveyType
  question_text: string;        // The question text
  question_type: string;        // Type of the question ("text", "number", "boolean", "select", etc.)
  options?: string[];           // Optional: For select/multiple choice questions, options as an array
  created_at: string;           // Timestamp when the question was created
}

export interface User {
  id: string;        // UUID
  email: string;     // User's email
  created_at: string; // Timestamp when the user was created
}

export interface UserResponse {
  id: string;           // UUID
  user_id: string;       // Foreign key referencing User (or auth.users)
  question_id: string;   // Foreign key referencing Question
  response: string;      // The user's response (text format, can be adjusted based on the question type)
  created_at: string;    // Timestamp when the response was created
}

