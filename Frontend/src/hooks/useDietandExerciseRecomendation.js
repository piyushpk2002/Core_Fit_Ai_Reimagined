import { GoogleGenerativeAI } from "@google/generative-ai";

async function useDietandExerciseRecomendation(userData, Action) {
  //if(bmi == 0) return console.log("provide a valid data");

  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = "";
    if (Action === "diet") {
      	prompt = `
			"Generate a personalized fitness plan based on the following user data:

			Height: ${userData.height}
			Weight: ${userData.weight}
			BMI: ${userData.BMI}
			Hypertension: ${userData.Hypertension}
			Diabetes: ${userData.Sugar}
			Output Format/Example:

			BMI Assessment:

			State whether the user's BMI is in a healthy range (18.5-24.9), underweight (<18.5), overweight (25-29.9), or obese (30 or higher).
			Briefly describe the potential health risks associated with the user's current BMI category.
			Diet Section:

			Provide a 7-day weekly diet chart with specific meal recommendations for each day.
			Consider dietary restrictions (e.g., low-sodium, low-sugar, high-fiber) based on the user's health conditions (hypertension, diabetes).
			Include portion sizes or calorie ranges for each meal.



			Precautions:

			List any necessary precautions or considerations for the user to follow during their fitness journey.
			This may include:
			Hydration guidelines
			Monitoring blood sugar levels (for diabetics)
			Listening to their body and resting when needed
			Consulting a healthcare professional before starting or modifying any exercise or diet plan.
			Example:

			BMI Assessment:

			Your BMI is 26, which falls in the overweight category.
			Being overweight increases the risk of heart disease, type 2 diabetes, and certain types of cancer.
			Diet Section:

			Monday:
			Breakfast: Oatmeal with berries and nuts
			Lunch: Grilled chicken salad with mixed greens and a light vinaigrette
			Dinner: Baked salmon with roasted vegetables
			Tuesday:
			[Continue with similar meal plans for the rest of the week]



			Precautions:

			Drink plenty of water throughout the day.
			Monitor blood sugar levels before and after exercise if you have diabetes.
			Stop exercising if you experience any chest pain or dizziness.
			This plan is a general guideline. Consult a doctor or registered dietitian for personalized advice `;
    } else if (Action === "exercise") {
      	prompt = `
		  	Generate a personalized fitness plan based on the following user data:

		  	Height: ${userData.height}
		  	Weight: ${userData.weight}
		  	BMI: ${userData.BMI}
			Diabetes: ${userData.Sugar}
		  
		  	Output format:
		   	Bmi Assesment 
		   	"Asses the bmi and tell if it is in the healthy range or not"
		  
		   	Exercise Section %
			Monday: Exercise1;Exercise2;Exeercise3;Exercise4 .. |
			Tuesday: Exercise1;Exercise2;Exeercise3;Exercise4 .. |
			and so on for all the days of the week
		  	%
			Note: Remember to close the Exercise section in %% and also to close each day within "|" and include after each day name ":" and don't incluede after last value
			
			Precautions:
			
			Try to incorporate different types of exercise and yoga
			
			Provide a short Description of different Exercise provided and how will it affect the body atlast outside the exercise section`		  
    }
	else{
		prompt = `
		Generate a personalized content based on the following user data about his BMI in details that is he is over weight then why or underweight then why and so on.:

		Height: ${userData.height}
		Weight: ${userData.weight}
		BMI: ${userData.BMI}

		Also include some of the diet and exercise content based on his data.

		At last a precaution which suggest what not to do according to your health and data
		`
	}

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
}

export default useDietandExerciseRecomendation;
