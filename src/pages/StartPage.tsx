import { Link } from "react-router-dom";


export default function StartPage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center p-4">
      <Link className='btn btn-primary text-xl' to='/questionnaire'>Start Form</Link>
    </div>
  )
}
