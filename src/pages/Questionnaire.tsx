import { useQuery } from "@tanstack/react-query"
import supabase from "../config/supabaseClient"
import { Question } from "../interface/interface";
import { useState } from "react";
import { PersonalInfo } from "../interface/questionnaire/personalInfoInterface";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Questionnaire() {

  const [questions, setQuestions] = useState<Question[]>([]); 
  const [fetchError, setFetchError] = useState('');

  const questionsQuery = useQuery({
    queryKey: ['questions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
      
      if(error) {
        setFetchError('An error has occured while fetching from Supabase.');
      }

      if(data) {
        setQuestions(data);
      }

      return data;
    }
  });

  // Submit responses
  const { register, handleSubmit } = useForm<PersonalInfo>();
  const onSubmitPersonalInfo: SubmitHandler<PersonalInfo> = (data) => {
    console.log('responses inputted: ', data);

    // submit responses to supabase
    
  }

  if(questionsQuery.isLoading) return <div className="text-2xl text-white">Loading...</div>

  if(questionsQuery.error) return <div className="text-2xl text-blue-200">{fetchError}</div>

  return (
    <div className="w-screen flex-col space-y-3 px-3 py-2">
      <form onSubmit={handleSubmit(onSubmitPersonalInfo)}>
        { questions.filter((question) => {return question.question_text.includes('name')}).map((question) => ( <div>{question.question_text}</div> ))}
        <input 
          className="w-full mt-3 px-2 py-1" 
          {...register("name", { required: false })} 
        />
        { questions.filter((question) => {return question.question_text.includes('age')}).map((question) => ( <div>{question.question_text}</div> ))}
        <input 
          className="w-full mt-3 px-2 py-1"
          type='number' 
          {...register("age", { required: false })} 
        />
        <div className='btn btn-primary mt-3'>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}
