import { useState } from "react";
import ToggleButton from "../components/ToggleButton"
import ImageUploadCard from "../components/ImageUploadCard";
import useImageRecomendation from "../hooks/useImageRecomendation";
import { useSelector } from "react-redux";

function ImageRecommendation() {
	const [isToggled, setIsToggled] = useState(false);
    const [imgFile, setImgFile] = useState(null);
	const [text, setText] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showTextBox, setShowTextBox] = useState(false);
	const { userData } = useSelector(state => state.auth);

	const getData = async (img) => {
		if(!img){
			setLoading(false);
			alert("Please select an image");
			return;
		}

		setLoading(true);
		setShowTextBox(true);
		setTimeout(()=> {
			scrollBy({
				top: 100,
				behavior: "smooth"
			})
		}, 200)

		let action = isToggled ? "recipe": "menu";

		let data = await useImageRecomendation(userData, img, action);

		let temp = data.split("");
		let Data = "";
		for(let i=0; i<temp.length; i++){
			if(temp[i] !== "*" && temp[i] !== "#" && temp[i] !== "%"){
				Data += temp[i];
			}
		}

		const textArr = Data.split("\n");
        let newData = textArr.map((e, index) => {
            const formatedText = e.replace(
                /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|BMI Classification|BMI Interpretation|Tailored Exercise and Diet Plan|Exercise Plan|Additional Tips|Benefits of Exercise|BMI Assessment|Personalized Fitness Plan|Diet Section|Precautions|Exercise Section|Recommendation|Recipe|Ingredients|Instructions|Important Note)/g,
                "<strong>$1</strong>"
            );
    
            return (
                <p
                    key={index}
                    dangerouslySetInnerHTML={{ __html: formatedText }}
                    className="mt-8"
                />
            );
        });
		setText(newData);
		setLoading(false);
		scrollBy({
			top: 500,
            behavior: "smooth"
		})
	}
	
	return (
		<>
			<div className="flex justify-between items-center p-10 mb-10">
				<h2 className="text-5xl text-[#97fffd] text- pl-40 berkshire-swash">Upload Your Image and See The Magic !!</h2>
				<ToggleButton isToggled={isToggled} setIsToggled={setIsToggled} setShowTextBox={setShowTextBox} setImgFile={setImgFile} setText={setText} />
			</div>
			<div className="border-l-[18px] border border-sky-500 rounded-3xl h-96 w-10/12 mx-auto p-10 backdrop-blur-sm bg-[rgba(255,255,255,0.05)] flex justify-between items-center">
				{
					!isToggled ? 

					<ImageUploadCard title="Upload Your Menu Here" description="Just upload your menu card here and get the recommended food from the menu as per your health and diet.." getData={getData} loading={loading} imgFile={imgFile} setImgFile={setImgFile} /> 
					:
					<ImageUploadCard title="Upload Your Food Item" description="Here you can upload your food item of any ingredient and get the recipe of that food with included ingredients..." getData={getData} loading={loading} imgFile={imgFile} setImgFile={setImgFile} />
				}
			</div>
			{
				showTextBox ? (
					<div className="min-h-screen w-full py-5 px-28 mt-10">
						{
							text ? (
								<div className="bg-white rounded-xl h-full w-full border min-h-32 p-14 text-black text-lg">{text}</div>
							) : (
								<div className="p-4 h-auto w-full mx-auto">
									<div className="border border-gray-200 shadow rounded h-full p-4 w-full animate-pulse bg-gray-100 flex justify-center items-center text-black">
										<p>Please Wait..</p>
									</div>
								</div>
							)
						}
					</div>
				) : null
			}
		</>
	)
}

export default ImageRecommendation
