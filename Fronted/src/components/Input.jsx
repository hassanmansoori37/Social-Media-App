

const Input = ({placeholder, type = "text", value, onChange, label, required}) => {
    return(
        <div className="flex flex-col">
            <p>{label}</p>
        <input className="border-2 rounded-sm p-2 border-blue-600" required={required}
         type={type} placeholder={placeholder} value={value} onChange={onChange} />
         </div>
    )
}

export default Input