import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import Header from "../components/Header";



const UpdateRecipe = () => {
  const [formData, setFormData] =useState({
    name:"",
    instruction: "",
    rate:""
  })

  const [error, setError] = useState(null)

  const { id } = useParams()
  // console.log(id)

  const navigate = useNavigate();


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    // Fetching a particular data from the database
useEffect(()=>{ const fetchRecipes = async()=>{
  const {data, error} = await supabase
  .from("recipes")
  .select()
  .eq('id', id) // this will return an array
  .single() // if you want just a single row

  if(error){
     navigate("/" , {replace:true}) // replace this route in history with the home route
  }

  // update the state of the form data
  if(data){
    setFormData({
      name:data.name,
      instruction: data.instruction,
      rate:data.rating
    })

    // console.log(data)
  }
}
fetchRecipes()
  
},[id, navigate])


  const handleSubmit = async(event)=>{
    event.preventDefault();

    if(!formData){
      setError("Please fill all inputs correctly")
      return
    }
// Sending the update data back to superbase
const {data, error} = await supabase
    .from("recipes")
    .update({
      name:formData.name, 
      instruction: formData.instruction,
      rating: formData.rate})
    .eq('id', id)
    .select()

    if(error){
      setError("Please fill all inputs correctly")
      console.log(error)
    }

    if(data){
      navigate("/")
      setError(null)
    }

  }



 
  return (
    <div className="page update">
      <Header/>
      <h2>Update {id}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name of Recipe</label>
          <input
            type="text"
            placeholder="Enter name of Recipe"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            // required
          />
        </div>

        {/* <div>
          <label>Upload a file</label>
          <input 
            // type="file"
            // ref={fileInputRef}
            // style={{ display: "none" }}
            // onChange={handleFileChange}
          />
          {/* <p type="button" className="custom-button" onClick={handleButtonClick}>
            Choose File
          </p>
          <div>
            <img src={fileIcon} alt="file" /> */}
            {/* {fileName && <p>{fileName}</p>} */}
          {/* </div>
        </div> */}
   <label>Instruction</label>
        <div>
       
          <textarea
            placeholder="Enter instructions"
            name="instruction"
            onChange={handleInputChange}
            value={formData.instruction}
          ></textarea>
        </div>

        <div>
          <label>Rate</label>
          <input
            type="number"
            placeholder="rating"
            name="rate"
            value={formData.rate}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="bg-red-600 text-white text-[1rem]">Submit Recipe</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default UpdateRecipe