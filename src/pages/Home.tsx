import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { SmoothiesInterface } from "../interface/interface";

export default function Home() {

  const [fetchError, setFetchError] = useState("");
  const [smoothies, setSmoothies] = useState<SmoothiesInterface[]>([]);
  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data , error } = await supabase
        .from('smoothies')
        .select("*");
        
        if(error) {
          setFetchError('Could not fetch data from table smoothies');
          console.log('error fetching smoothies: ', error);
        }
        if(data) {
          setSmoothies(data);
          console.log('smoothies fetched!', data);
          console.log('smoothies data: ', data);
        }
    }
    fetchSmoothies();
  }, [])
  

  return (
    <>
      <div className="flex-col space-y-3 mx-3 my-2">
        {
          smoothies ?
            smoothies.map((smoothie) => (
              <div key={smoothie.id} className="bg-blue-400 p-3">
                <div className="text-white font-bold">{smoothie.title}</div>
              </div>
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
