import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import "./InputStyle.css";
import { CONTACT_REG_EXP } from "../../utils/utils";
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errorRegex?: RegExp;
  errorMessage?: string;
  postFix?: ReactNode;
  handleChange?: (value: string, err: boolean) => void;
};

const InputField: React.FC<InputProps> = ({
  label,
  errorRegex,
  errorMessage,
  handleChange,
  type,
  value,
  ...props
}) => {
  const [error, setError] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (type === 'tel' && !value.match(CONTACT_REG_EXP.onlyNumber)) {
      return;
    }
    const newValue = e.target.value;
    let err = false;

    if (errorRegex && !errorRegex.test(newValue)) {
      err = true;
      setError(true);
    } else {
      setError(false);
    }
    if (handleChange) {
      handleChange(newValue, err);
    }
  };
  return (
    <div className="input-main-container">
      <div className="input-container">
        <input
          type={type ? type : "text"}
          name={props.name}
          id="password-input"
          className="custom-input"
          value={value}
          onChange={handleInputChange}
          defaultValue={props.defaultValue}
        />
        <label htmlFor="password-input">{label}</label>
        {props.postFix}
      </div>
      
      {errorRegex && errorMessage && error ? (
        <p className="errorMessage">{errorMessage}</p>
      ) : null}
    </div>
  );
};

export default InputField;
