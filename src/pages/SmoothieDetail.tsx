import { useParams } from "react-router-dom";
import { SmoothiesInterface } from "../interface/interface";
import { useEffect, useRef, useState } from "react";
import supabase from "../config/supabaseClient";

export default function SmoothieDetail() {

  const { id } = useParams();
  const [smoothie, setSmoothie] = useState<SmoothiesInterface>();
  const [fetchError, setFetchError] = useState('');

  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const fetchSmoothieById = async () => {
      const { data, error} = await supabase
        .from('smoothies')
        .select('*')
        .eq('id', id)
        .single()

      if(error) {
        setFetchError('Error fetching smoothie detail');
        console.log('error fetching smoothie detail');
      } else {
        setSmoothie(data);
      }
    };

    if(id) {
      fetchSmoothieById();
    }

    // Record the start time when the component mounts
    startTimeRef.current = Date.now();

    return () => {
      // Calculate and log time spent when the user leaves the page
      const leaveTime = Date.now(); // in milliseconds
      const timeSpent = (leaveTime - startTimeRef.current) / 1000;  // Convert from ms to seconds
      if(timeSpent > 0.00) {
        console.log(`Time spent on Detail page ${smoothie ? smoothie.title : id}: ${timeSpent.toFixed(2)} seconds`);
      }
    };
  }, [id, startTimeRef])
  
  if(fetchError && fetchError.length > 0) {
    return <div>{fetchError}</div>
  }

  return (
    <>
    {
      smoothie ?
      <div className="p-3 bg-transparent m-3">
        <div className="flex flex-col space-y-3">
          <h1 className="font-semibold text-white text-4xl">{smoothie.title}</h1>
          <p className="font-normal text-white text-base">{smoothie.method}</p>
          <h3 className="font-semibold text-orange-500 text-5xl">{smoothie.rating} / 5</h3>
        </div>
      </div>
      :
      <div>
        Fetching smoothie
      </div>
    }
    </>
  )
}
