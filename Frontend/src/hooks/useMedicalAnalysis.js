import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';



async function useMedicalAnalysis(img){
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    try {

        //converting image into canvas
        // Create an in-memory image to avoid needing a DOM element
        const preview = new Image();
        const imageUrl = URL.createObjectURL(img);
        preview.src = imageUrl;

        //const image = img; 
        
        
        preview.src = imageUrl;

        await new Promise((resolve) => {
        preview.onload = resolve;
        });

        // Set canvas size to match image
        canvas.width = preview.naturalWidth;
        canvas.height = preview.naturalHeight;

        ctx.drawImage(preview, 0, 0, canvas.width, canvas.height);
    
        const modelUrl = "https://teachablemachine.withgoogle.com/models/6shN7UI25/model.json";
        const metaDataUrl = "https://teachablemachine.withgoogle.com/models/6shN7UI25/metadata.json";
    
        const model = await tmImage.load(modelUrl, metaDataUrl);
        const maxPredictions = model.getTotalClasses();
        
        console.log("model", model);
    
        const prediction = model.predict(canvas);
        console.log("prediciton: ", prediction);
        
        return prediction
    } catch (error) {
        console.log("error: ", error); 
    }

    
}

export default useMedicalAnalysis