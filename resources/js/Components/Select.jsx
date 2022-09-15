import React from "react";

export default function Input({
    name,
    value,
    className,
    handleChange,
    options,
}) {
    return (
        <div className="">
            <select
                value = {value} 
                name={name} 
                className={`` + className} 
                onChange={(event) => handleChange(event)}
            >
                {options}
            </select>
        </div>
    );
}