import React from "react";
import { Eye, EyeSlash, Lock } from 'react-bootstrap-icons';

export default function PasswordInput({ placeholder, id, value, onChange }) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className='relative mb-1 my-2 mt-2 2xl:text-xl text-lg'>
            <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-9 h-15 text-color-icons" />
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                id={id}
                className="2xl:text-lg rounded-b-2xl rounded-t-2xl h-7 my-1.5 w-full bg-gris-claro text-black py-5 p-14 placeholder-white"
                value={value}
                onChange={onChange}
            />
            {showPassword ? (
                <EyeSlash onClick={handleShowPassword} className="absolute right-4 top-1/2 transform -translate-y-1/2 w-9 h-15 text-color-icons hover:cursor-pointer" />
            ) : (
                <Eye onClick={handleShowPassword} className="absolute right-4 top-1/2 transform -translate-y-1/2 w-9 h-15 text-color-icons hover:cursor-pointer" />
            )}
        </div>
    );
}
