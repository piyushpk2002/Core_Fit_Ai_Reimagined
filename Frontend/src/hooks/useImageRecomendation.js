import { GoogleGenerativeAI } from "@google/generative-ai";

async function useImageRecomendation(userData, file, action) {
  console.log(userData);
  
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  //this is how data Url looks
  //data:[<mime-type>][;base64],<base64-data>
  //data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEB...
  //after comma we have base64 data

  const fileToBase64 = (file) => {

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      //onload function is an event which is triggered when an fileReader operation is triggered.

      reader.onload = () => {
        try {
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        } catch (error) {
          console.log("error in base64", error);
          reject("Error in onload", error.message);
        }
      };
      reader.onerror = (error) =>
        reject("FileReader error encountered", error.message);
      reader.readAsDataURL(file);
    });
  };

  try {
    const baseTo64Image = await fileToBase64(file);

    const prompt = action === "menu" ? 
    `Analyze the image of the food menu and provide me the food which would be suitable for a person who has a bmi of ${userData ? userData.BMI : "22"} and suitable for a person with Hypertension = ${userData ? userData.Hypertension: "no"}, Diabetes = ${userData?userData.Sugar:"no" } ` : `Analyze the image of the food and provide me the overall recipe with the ingredients which is used to make it.
    And also provide the amount of protein, carbohydrates, vitamine and other information with their respective quantity`
    const image = {
      inlineData: {
        data: baseTo64Image,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, image]);

    return result.response.text();
  } catch (error) {
    console.log("Error in processing image", error);
    return null;
  }
}

export default useImageRecomendation;
