


const Button = ({onClick, children, type}) => {
    return(
        <button className="bg-blue-600 rounded-sm w-[200px] cursor-pointer text-white" onClick={onClick} type="submit">{children}</button>
    )
}

export default Button;