import { useNavigate } from "react-router-dom";

function Button({ id, name, icon, handleChange, info, className }) {
  const navigate = useNavigate();
  return (
    <>
      <label
        htmlFor={name}
        className={` bg-slate-800 cursor-pointer ${className} ${
          info === name ? "border border-lime-200" : ""
        }`}
      >
        <i className={`${icon} mt-1 text-lg`}></i> {name}
      </label>
      <input
        id={name}
        value={name}
        className="hidden"
        checked={info === name}
        type="radio"
        name={id}
        onChange={handleChange}
      />
    </>
  );
}

export default Button;
