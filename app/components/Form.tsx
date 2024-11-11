"use client";
import React, { useState } from "react";

type FocusedFields = {
  [key: string]: boolean;
};

const Form: React.FC = () => {
  const [focused, setFocused] = useState<FocusedFields>({});

  const handleFocus = (field: string) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field: string, value: string) => {
    if (!value) {
      setFocused({ ...focused, [field]: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white px-4">
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold mb-6 pr-32">
          <span className="text-[#80D3FF]">Salary</span> kitni loge usse pehele
          <span className="text-[#80D3FF]"> CV</span> dekhle?
        </h1>
        <form>
          <div className="flex justify-between gap-2 mb-6">
            {[
              "Event",
              "Website",
              "Social Media",
              "Content Creation",
              "Other",
            ].map((option) => (
              <button
                key={option}
                type="button"
                className="bg-gray-700 py-2 px-4 rounded-lg hover:bg-gray-600 transition"
              >
                {option}
              </button>
            ))}
          </div>

          {[
            "Full Name",
            "Email ID",
            "Phone Number",
            "Company/Project Name",
          ].map((label) => (
            <div key={label} className="relative mb-6">
              <input
                type="text"
                onFocus={() => handleFocus(label)}
                onBlur={(e) => handleBlur(label, e.target.value)}
                className="w-full bg-gray-700 text-white py-3 px-4 rounded-md outline-none border border-transparent focus:border-blue-500 transition"
              />
              <label
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-200 ${
                  focused[label] ? "-top-3 text-xs text-blue-500" : ""
                }`}
              >
                {label}*
              </label>
            </div>
          ))}

          <div className="mb-6">
            <label className="block mb-2">What's Your Budget?</label>
            <input type="range" min="0" max="100000" className="w-full" />
            <div className="flex justify-between text-sm mt-2">
              <span>0</span>
              <span>Ambani</span>
            </div>
          </div>

          <div className="mb-6">
            <textarea
              placeholder="Tell Us About Your Project!"
              rows={4}
              className="w-full bg-gray-700 text-white py-3 px-4 rounded-md outline-none border border-transparent focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 py-3 rounded-lg text-white font-semibold hover:bg-blue-600 transition"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
