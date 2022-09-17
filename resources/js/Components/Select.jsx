import React from "react";

export default function Input({
    name,
    value,
    className,
    handleChange,
    options,
}) {
    return (
        <div class="flex justify-left ml-10 mt-1">
            <div class="mb-2 xl:w-96">
                <select
                    value={value}
                    name={name}
                    onChange={(event) => handleChange(event)}
                    className="form-select appearance-none block
                    w-full px-3 py-1.5 text-base font-normal text-gray-700
                    bg-white bg-clip-padding bg-no-repeat border border-solid
                    border-gray-300 rounded transition ease-in-out m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600
                    focus:outline-none"
                    aria-label="Default select example"
                >
                    <option value="">-</option>
                    {options}
                </select>
            </div>
        </div>
    );
}
