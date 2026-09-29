

// const Input = ({placeholder, type = "text", value, onChange, label, required}) => {
//     return(
//         <div className="flex flex-col">
//             <p>{label}</p>
//         <input className="border-2 rounded-sm p-2 border-blue-600" required={required}
//          type={type} placeholder={placeholder} value={value} onChange={onChange} />
//          </div>
//     )
// }

// export default Input

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  placeholder,
  type = "text",
  value,
  onChange,
  label,
  required,
   autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          className="w-full h-12 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 pr-11 text-sm text-gray-800
          outline-none transition-all duration-200
          focus:border-[#1877F2] focus:bg-white focus:ring-4 focus:ring-[#1877F2]/10
          hover:border-gray-300
          placeholder:text-gray-400"
          required={required}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
           autoComplete={autoComplete}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2
            text-gray-400 hover:text-[#1877F2] transition-colors cursor-pointer text-lg"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;