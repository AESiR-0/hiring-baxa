"use client";
import React, { useState } from "react";

type FocusedFields = {
  [key: string]: boolean;
};

const formFields = [
  { type: "text", label: "Full Name" },
  { type: "email", label: "Email ID" },
  { type: "number", label: "Phone Number" },
  { type: "number", label: "Years of Experience" },
];

const Form: React.FC = () => {
  const [focused, setFocused] = useState<FocusedFields>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [CV, setCV] = useState<File | null>(null);

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
          <div className="grid grid-cols-4 md:grid max-md:grid-cols-2 justify-between gap-2 mb-6">
            {[
              "Front-end Developer",
              "Sales and BD Intern",
              "Content Writer",
              "Ui intern",
            ].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSelected(option);
                  if (selected === option) {
                    setSelected(null);
                  }
                }}
                className={` ${
                  selected === option ? "bg-gray-400 text-white" : ""
                } bg-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="grid gap-x-10 gap-y-4 py-5 grid-cols-1 md:grid-cols-2">
            {[
              "Full Name",
              "Email ID",
              "Phone Number",
              "Company/Project Name",
            ].map((label) => (
              <div key={label} className="relative  mb-6">
                <input
                  type={`${
                    label === "Phone Number"
                      ? "number"
                      : label === "Email ID"
                      ? "email"
                      : "text"
                  }}`}
                  onFocus={() => handleFocus(label)}
                  onBlur={(e) => handleBlur(label, e.target.value)}
                  className="w-full bg-gray-900 rounded-none  text-white py-3 px-2 outline-none border border-t-0 border-l-0 border-r-0  border-[#80D3FF]  transition"
                />
                <label
                  className={`absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-200 ${
                    focused[label]
                      ? "-translate-y-10 left-0 text-sm text-[#80D3FF]"
                      : ""
                  }`}
                >
                  {label}*
                </label>
              </div>
            ))}
          </div>
          <div className="mb-6">
            <input
              type="file"
              name="CV file"
              id="CB"
              className={`${CV ? "block" : "hidden"}`}
              onChange={(e) => {
                setCV(e.target.files[0]);
              }}
            />
            <label htmlFor="CB" className="text-[#80D3FF]">
              Upload Your CV
            </label>
          </div>

          <div className="mb-6">
            <textarea
              placeholder="Tell Us About Your Experience!"
              rows={4}
              className="w-full bg-gray-700 text-white py-3 px-4 rounded-md outline-none border border-transparent focus:border-[#80D3FF] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#80D3FF] py-3 rounded-lg text-white font-semibold hover:bg-[#80D3FF] transition"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
