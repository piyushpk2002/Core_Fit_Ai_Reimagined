import { GoogleGenerativeAI } from "@google/generative-ai";

async function calculateBmi({
    heightInFeet,
    heightInInch,
    wt,
    gender
}){
    try {
        const heightInMeters = Number(heightInFeet)*0.3048 + Number(heightInInch)*0.0254;  
        const weightInKg = Number(wt);
        const bmi = Math.round(weightInKg/Math.pow(heightInMeters, 2));

        console.log(bmi);
       
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });   
        
        let prompt = `Given the Bmi and gender of the user ${bmi}, ${gender}, asses that if the user is overweight, underweight or Normal in one line and don't write anything extra strictly.Eg: underweight`;

        const result = await model.generateContent(prompt);
        const Description = result.response.text();
        return {Description, bmi};
    } catch (e) {
        console.log("Error: ", e.message);
    }
}

export default calculateBmi;