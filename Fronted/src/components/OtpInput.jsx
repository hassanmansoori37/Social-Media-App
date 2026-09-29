
import ReactOtpInput from 'react-otp-input';

export  default function OtpInput({value, onChange}) {

  return (
    <div className="w-full flex justify-center">
    <ReactOtpInput
      value={value}
      onChange={onChange}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} className="border-2 rounded-sm border-blue-600" 
      style={{
        width: "26px",
        textAlign: 'center',
        margin: '4px'
      }}/>}
      inputType='tel'
      
    />
    </div>
  );
}