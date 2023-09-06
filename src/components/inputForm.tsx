import React from 'react';

interface InputFieldProps {
    label: string;
    placeholder: string;
    name: string;
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Deve ser uma função que recebe um evento
    value: string; // Deve ser uma string
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, type, name, onChange, value }) => {
    return (
        <label className="block">
            <span className="block ml-2 text-sm font-medium text-slate-300">{label}</span>
            <input
                className="border-2 border-gray-300 min-w-full text-slate-800 bg-white h-10 px-5 pr-16 mb-2 rounded-lg text-sm focus:outline-none"
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
        </label>
    );
};

export default InputField;
