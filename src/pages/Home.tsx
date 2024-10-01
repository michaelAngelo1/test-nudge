import { useEffect, useRef, useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { SmoothiesInterface } from "../interface/interface";

export default function Home() {

  const [fetchError, setFetchError] = useState("");
  const [smoothies, setSmoothies] = useState<SmoothiesInterface[]>([]);
  const navigate = useNavigate();

  // state variable for time
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data , error } = await supabase
        .from('smoothies')
        .select("*")
        
        if(error) {
          setFetchError('Could not fetch data from table smoothies');
          console.log('error fetching smoothies: ', error);
        }
        if(data) {
          setSmoothies(data);
          // console.log('smoothies fetched!', data);
          // console.log('smoothies data: ', data);
        }
    }
    fetchSmoothies();

    // Record the start time when the component mounts
    startTimeRef.current = Date.now();

    return () => {
      // Calculate and log time spent when the user leaves the page
      const leaveTime = Date.now(); // in milliseconds
      const timeSpent = (leaveTime - startTimeRef.current) / 1000;  // Convert from ms to seconds
      if(timeSpent > 0) {
        console.log(`Time spent on Home page: ${timeSpent.toFixed(2)} seconds`);
      }
    };
  }, [startTimeRef])
  
  
  const handleSmoothieClick = (id: string) => {
    navigate(`/smoothie-detail/${id}`)
  }

  return (
    <>
      <div className="w-screen flex-col space-y-3 mx-3 my-2 max-mobile:w-auto">
        {
          smoothies ?
            smoothies.map((smoothie) => (
                <button onClick={() => handleSmoothieClick(smoothie.id)} key={smoothie.id} className="flex justify-start w-full bg-blue-400 p-3 transform transition duration-300 ease-in-out hover:scale-y-105 hover:bg-blue-500 focus:outline-none">
                  <div className="text-white font-bold">{smoothie.title}</div>
                </button>
            ))
          :
          <div className="bg-blue-400 p-3">
            <div className="text-white font-bold">{fetchError}</div>
          </div>
        }
      </div>
    </>
  )
}
