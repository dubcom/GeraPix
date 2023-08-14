import React from 'react';

// Adicione o tipo para o campo de entrada
interface InputFieldProps {
    label: string;
    placeholder: string;
    name: string;
    type: string; 
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, type, name, handleOnChange, value }) => {
    return (
        <label className="block">
            <span className="block ml-2 text-sm font-medium text-slate-300">{label}</span>
            <input
                className="border-2 border-gray-300 min-w-full  bg-white h-10 px-5 pr-16 mb-2 rounded-lg text-sm focus:outline-none"
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleOnChange}

            />
        </label>
    );
};

export default InputField;

