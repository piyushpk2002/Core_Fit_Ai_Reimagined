import { useRef, useState } from "react";


function ImageUploadCard({title, description, getData, loading, imgFile ,setImgFile}) {
    const inputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState("");

    const handleImgFileChange = (e) => {
		// console.log(e.target.files[0].name);
		let selectedFile = e.target.files[0];
		if (selectedFile) setImgFile(selectedFile)
		setSelectedImage(selectedFile ? URL.createObjectURL(selectedFile) : undefined)

	}

	const handleDragOver = (e) => {
		e.preventDefault()
	}

	const handleDrop = (e) => {
		e.preventDefault()

		const dropedFile = e.dataTransfer.files?.[0]
		if (dropedFile) setImgFile(dropedFile)
		setSelectedImage(dropedFile ? URL.createObjectURL(dropedFile) : undefined)
	}

  return (
    <div className="flex justify-between h-full w-full">
        <div className="flex flex-col justify-between w-[450px]">
            <h2 className="text-4xl amaranth border-b-2 border-sky-400 w-[365px]">{title}</h2>
            <p>{description}</p>
            <button className="bg-gradient-to-r from-[#77A1D3] via-[#79CBCA] to-[#77A1D3] h-10 w-10/12 font-semibold text-lg rounded tracking-wide" onClick={() => getData(imgFile)}>{!loading ? "Submit" : "Loading..."}</button>
        </div>
        <div className='h-full w-1/3'>
            <input id='image-upload' accept='image/*' className='hidden' type="file" ref={inputRef} onChange={handleImgFileChange} />
            {
                !imgFile ?
                    <label htmlFor='image-upload' className="flex flex-col justify-center items-center border-2 border-dashed border-slate-300 rounded-lg h-full w-full cursor-pointer" onDragOver={handleDragOver} onDrop={handleDrop}>
                        <i className="fi fi-rs-cloud-upload text-6xl"></i>
                        <p className='text-lg text-center'>Drag and Drop or <br /> Click to Upload Image</p>
                    </label> :
                    <div className="h-full w-full flex flex-col justify-between items-center relative">
                        <img src={selectedImage} alt="" className='h-full w-full border rounded-lg' />
                        <p>{imgFile.name}</p>
                        <div  className="h-7 w-7 bg-white border flex justify-center items-center text-black fredoka border-black rounded-full absolute -top-3 -right-3 cursor-pointer" onClick={() => {
                            setImgFile(null);
                            inputRef.current.value = ""
                        }}>X</div>
                    </div>
            }
        </div>
    </div>
  )
}

export default ImageUploadCard
