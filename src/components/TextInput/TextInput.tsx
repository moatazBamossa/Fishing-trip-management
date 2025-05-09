import React, { useRef, useState } from 'react';
import { Mail, Eye, EyeOff, Lock, Unlock } from 'lucide-react';

interface TextInputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  placeholder,
  error,
  required = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isIconAnimating, setIsIconAnimating] = useState(false);

  const togglePasswordVisibility = () => {
    setIsIconAnimating(true);
    setShowPassword(!showPassword);

    // Refocus the input after toggling
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative rounded-lg shadow-sm">
        <div
          className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-200 
          ${isFocused ? 'text-blue-600 scale-110' : 'text-gray-400'}`}
        >
          {type === 'password' ? (
            isFocused ? (
              <Unlock size={18} />
            ) : (
              <Lock size={18} />
            )
          ) : (
            <Mail size={18} />
          )}
        </div>
        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          placeholder={placeholder}
          className={`block w-full pl-10 pr-3 py-3 border ${
            error
              ? 'border-red-300'
              : isFocused
              ? 'border-blue-500'
              : 'border-gray-300'
          } 
            rounded-lg focus:outline-none focus:ring-2 ${
              error ? 'focus:ring-red-500' : 'focus:ring-blue-500'
            } 
            focus:border-transparent transition-all duration-200`}
        />
        {type === 'password' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={`text-gray-400 hover:text-gray-600 focus:outline-none transition-all duration-200 
              ${isIconAnimating ? 'transform rotate-12' : ''}`}
            >
              {!showPassword ? (
                <Eye
                  size={18}
                  className={`transition-opacity duration-200 ${
                    isIconAnimating ? 'animate-pulse' : ''
                  }`}
                />
              ) : (
                <EyeOff
                  size={18}
                  className={`transition-opacity duration-200 ${
                    isIconAnimating ? 'animate-pulse' : ''
                  }`}
                />
              )}
            </button>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1 animate-fadeIn">{error}</p>
      )}
    </div>
  );
};

export default TextInput;
