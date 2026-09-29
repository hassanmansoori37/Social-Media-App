


// const Button = ({onClick, children, type}) => {
//     return(
//         <button className="bg-blue-600 rounded-sm w-[200px] cursor-pointer text-white" onClick={onClick} type="submit">{children}</button>
//     )
// }

// export default Button;

const Button = ({ onClick, children, type = "submit" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full h-12 rounded-xl
      bg-gradient-to-r from-[#1877F2] to-[#0A66C2]
      text-white font-bold text-base tracking-wide
      shadow-md shadow-[#1877F2]/30
      hover:shadow-lg hover:shadow-[#1877F2]/40 hover:-translate-y-0.5
      active:scale-[0.98] active:translate-y-0
      transition-all duration-200
      cursor-pointer
      focus:outline-none focus:ring-4 focus:ring-[#1877F2]/30"
    >
      {children}
    </button>
  );
};

export default Button;