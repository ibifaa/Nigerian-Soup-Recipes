import { useRef, useState } from "react";
import fileIcon from "../assets/images/file.svg";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const CreateRecipe = () => {
  const navigate = useNavigate()
  
  // const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    instruction: "",
    rate: 0,
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
     
    } else {
      setFileName("No file chosen");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData) {
      setError("Please fill in all fields correctly");
      return;
    }

  
const { data, error } = await supabase
  .storage
  .from('uploads')
  .upload(`uploads/${fileName}`, fileName, {
    cacheControl: '3600',
    upsert: false
  })

    // Uploading the file to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(`uploads/${fileName.name}`, fileName);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return;
    }

    // Getting the URL of the uploaded file
    const { data: publicURLData, error: urlError } = supabase.storage
      .from("uploads")
      .getPublicUrl(`uploads/${fileName.name}`);

    if (urlError) {
      console.error("Error getting public URL:", urlError);
      return;
    }

    const publicURL = publicURLData.publicURL;

    // Saving form data and file URL to Supabase
    const { data: insertData, error: insertError } = await supabase
      .from("recipes")
      .insert([
        {
          name: formData.name,
          // src: publicURL,
          instruction: formData.instruction,
          rating: formData.rate,
        },
      ])
      .select();
      navigate("/")

    if (insertError) {
      console.error("Error inserting data:", insertError);
    } else {
      console.log("Data successfully inserted:", insertData);
    }
  };

  return (
    <div className="page create">
      <Header/>
      <h2>Add a Recipe</h2>
      <form onSubmit={handleSubmit} className="shadow-lg w-[40%] p-5">
        <div>
          <label>Name of Recipe</label> <br/>
          <input
            type="text"
            placeholder="Enter name of Recipe"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            // required
          />
        </div>

         <div>
          <label>Upload a file</label>
          <input 
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
           <p type="button" className="custom-button" onClick={handleButtonClick}>
            Choose File
          </p>
          <div>
            <img src={fileIcon} alt="file" /> 
             {fileName && <p>{fileName}</p>} 
           </div> 
        </div> 
   <label>Instruction</label><br/>
        <div>
       
          <textarea
            placeholder="Enter instructions"
            name="instruction"
            onChange={handleInputChange}
            value={formData.instruction}
          ></textarea>
        </div>

        <div>
          <label>Rate</label><br/>
          <input
            type="number"
            placeholder="rating"
            name="rate"
            value={formData.rate}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Add Recipe" />
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default CreateRecipe;
