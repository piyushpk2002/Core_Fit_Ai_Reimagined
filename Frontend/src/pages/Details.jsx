import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import useDietandExerciseRecomendation from "../hooks/useDietandExerciseRecomendation";
import { setUserTodo } from "../store/features/authSlice";

function Details() {
	const { state, userData } = useSelector(state => state.auth);
	const [exerciseChart, setExerciseChart] = useState("loading...");
	const [text, setText] = useState("");
	const dispatch = useDispatch();

	const handleHeaderContent = (state) => {
		switch (state) {
			case "detail":
				return "Here's Your BMI Explaination";
			case "diet":
				return "Here's Your Diet Plan";
			case "weight":
				return "exercise";
			default:
				return "Here's Your Exercise Plan";
		}
	}

	const getData = async () => {
		let data = await useDietandExerciseRecomendation(userData, state);

		let temp = data.split("");
		let Data = "";
		for (let i = 0; i < temp.length; i++) {
			if (temp[i] !== "*" && temp[i] !== "#") {
				Data += temp[i];
			}
		}

		setExerciseChart(Data);

		const textArr = Data.split("\n");
		let newData = textArr.map((e, index) => {
			const formatedText = e.replace(
				/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|BMI Classification|BMI Interpretation|Tailored Exercise and Diet Plan|Exercise Plan|Additional Tips|Benefits of Exercise|BMI Assessment|Personalized Fitness Plan|Diet Section|Precautions|Exercise Section|Important Note)/g,
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

		setText(newData)

		setTimeout(() => {
			scrollBy({
				top: -370,
				behavior: "smooth"
			})
		}, 100)
	}

	if(state === "exercise"){

		useMemo((data = exerciseChart) => {
	
			if (data === "loading...") {
				return ;
			}
			//seperating exercise section from whole data
			const ExerciseSection = data.split("%")[1];
	
			//seperating each day
			const dayWiseExercises = ExerciseSection.split("|");
	
			//dispatching values to global state
			dispatch(setUserTodo(dayWiseExercises));
	
		}, [exerciseChart])
	}
	

	useEffect(() => {
		getData()
	}, [state])

	return (
		<div className="min-h-screen w-full py-5 px-28">
			<h2 className="text-5xl mb-12 border-b-2 pb-2 text-cyan-200 text-center fredoka font-semibold tracking-wide">{handleHeaderContent(state)}</h2>
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
	)
}

export default Details
