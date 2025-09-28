import React, { useEffect, useRef, useState } from 'react'
import ImageUploadCard from '../components/ImageUploadCard'
import useMedicalAnalysis from '../hooks/useMedicalAnalysis';



const MedicalAnalysis = () => {
    const [loading, setLoading] = useState(false);
    const [imgFile, setImgFile] = useState(null);
    const [result, setResult] = useState([]);
    const [tuberWidth, setTuberWidth] = useState(0);
    const [normalWidth, setNormalWidth] = useState(0);
    const mydivref = useRef(null);

    useEffect(() => {
        if (mydivref.current) {
            mydivref.current.scrollIntoView({ behaviour: "smooth" })
        }
        setTimeout(() => {
            setTuberWidth(result[0].probability * 100)
            setNormalWidth(result[1].probability * 100)
        }, 50);

    }, [result])

    const getData = async (imgFile) => {
        setLoading(true);
        console.log(imgFile);

        if (!imgFile) return;

        const data = await useMedicalAnalysis(imgFile);
        console.log("data: ", data);
        setResult(data);


        setLoading(false)
    }


    return (
        <div className='w-full'>
            <div className='w-[80%] mx-auto '>
                <div className="heading-section my-[3rem]">
                    <h1 className='text-center my-[2rem] berkshire-swash text-[2rem]'>Medical Image Analysis (Experimental !!)</h1>
                    <h3 className='text-center berkshire-swash text-xl'>Upload your X-ray for tuberculosis analysis</h3>
                </div>
                <div className='className="border-l-[18px] border border-sky-500 rounded-3xl h-96 w-10/12 mx-auto p-10 backdrop-blur-sm bg-[rgba(255,255,255,0.05)] flex justify-between items-center"'>
                    <ImageUploadCard title="Upload Your X-ray here" description="Just upload your menu card here and get the recommended food from the menu as per your health and diet.." getData={getData} loading={loading} imgFile={imgFile} setImgFile={setImgFile} />
                </div>
            </div>

            {/* if results loaded */}
            {(result.length > 0) && (
                <div className='w-[68%] mx-auto h-[450px] flex flex-col justify-center px-[10%] mt-[4rem] mb-[4rem] border border-sky-500 rounded-3xl' ref={mydivref}>
                    <div className='mb-[3rem] w-[25rem]'>
                        <h1 className="berkshire-swash text-[2rem] border-b-2 border-sky-500">Here are your predictions !!!</h1>
                    </div>

                    <div className='results flex flex-col mt-4 mb-8'>
                        <h1 className='berkshire-swash text-xl mb-4 border-2 rounded-lg border-sky-500 p-2 w-[8rem]'>Predictions :</h1>
                        <div className='w-full flex flex-col'>
                            <div>
                                <p className='berkshire-swash border-b-2 w-[4rem] border-sky-500'>Tuberculosis: </p>
                                <div className="w-full bg-gray-200 rounded-md h-[2rem] dark:bg-gray-700 mt-4">
                                    <div className="bg-red-600 h-[2rem] rounded-md"
                                        style={{
                                            width: `${tuberWidth}%`,
                                            transition: 'width 3s ease-in-out'
                                        }}></div>


                                </div>
                                <p className='font-bold w-full text-center'>{tuberWidth} %</p>
                            </div>

                            <div className='mt-4'>
                                <p className='berkshire-swash border-b-2 w-[2.5rem] border-sky-500'>Normal:</p>
                                <div className="w-full bg-gray-200 rounded-md h-[2rem] dark:bg-gray-700 mt-4">
                                    <div className="bg-green-600 h-[2rem] rounded-md"
                                        style={{
                                            width: `${normalWidth}%`,
                                            transition: 'width 3s ease-in-out'
                                        }}></div>

                                    <p className='w-full text-center font-bold'>{normalWidth} %</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MedicalAnalysis