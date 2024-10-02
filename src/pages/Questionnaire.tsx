import { useQuery } from "@tanstack/react-query"
import supabase from "../config/supabaseClient"
import { Question } from "../interface/interface";
import { useEffect, useState } from "react";
import { PersonalInfo } from "../interface/questionnaire/personalInfoInterface";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Questionnaire() {

  const [questions, setQuestions] = useState<Question[]>([]); 
  const [fetchError, setFetchError] = useState('');
  const navigate = useNavigate();

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
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit } = useForm<PersonalInfo>();
  const onSubmitPersonalInfo: SubmitHandler<PersonalInfo> = async (data) => {
    console.log('responses inputted: ', data);

    // submit responses to supabase
    const { error } = await supabase
      .from('users')
      .insert([
        { 
          name: data.name,
          age: data.age
        }
      ])

    if(error) {
      console.log('error submit data')
      alert('Error submit data');
    } else {
      setSuccess(true);
    }
  }

  // Redirect to StartPage if the page was refreshed
  useEffect(() => {
    if (sessionStorage.getItem('fromQuestionnaire') === 'true') {
      sessionStorage.removeItem('fromQuestionnaire'); // Clear flag after check
      window.location.href = '/'; // Redirect to StartPage
    }
  }, [navigate]);

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
        {success && <div>Successful submission</div> }
      </form>
    </div>
  )
}
