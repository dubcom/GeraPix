import React from 'react';

interface InputFieldProps {
  label: string;
  placeholder: string;
  type: string; // Adicione o tipo para o campo de entrada
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, type }) => {
  return (
    <label className="block">
      <span className="block ml-2 text-sm font-medium text-slate-300">{label}</span>
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 mb-2 rounded-lg text-sm focus:outline-none"
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
};

export default InputField;

