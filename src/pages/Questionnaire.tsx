import { useQuery } from "@tanstack/react-query"
import supabase from "../config/supabaseClient"
import { Question } from "../interface/interface";
import { useState } from "react";

export default function Questionnaire() {

  const [questions, setQuestions] = useState<Question[]>([]); 
  const [fetchError, setFetchError] = useState('');

  const questionsQuery = useQuery({
    queryKey: ['questions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
      
      if(questionsQuery.error) {
        setFetchError('An error has occured.');
      }

      if(data) {
        setQuestions(data);
      }

      return data;
    }
  })

  if(questionsQuery.isLoading) return <div className="text-2xl text-white">Loading...</div>

  if(questionsQuery.error) return <div className="text-2xl text-blue-200">{fetchError}</div>

  return (
    <div className="w-screen flex-col space-y-3 px-3 py-2">
      {
        questions.map((question) => (
          <div className="p-3 bg-blue-900 w-auto">
            <div className="text-xl text-start font-medium text-white">{question.question_text}</div>
          </div>
        ))
      }
    </div>
  )
}
