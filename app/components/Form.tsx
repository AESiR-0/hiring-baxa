"use client";
import React, { useState } from "react";

type FocusedFields = {
  [key: string]: boolean;
};

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  experience: number;
  jobTitle: string | null;
  CV: File | null;
  aboutExperience: string;
};

const formFields = [
  { type: "text", name: "name", label: "Full Name" },
  { type: "email", name: "name", label: "Email" },
  { type: "tel", label: "Mobile" },
  { type: "number", label: "Years of Experience" },
];

const Form: React.FC = () => {
  const [focused, setFocused] = useState<FocusedFields>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [CV, setCV] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    experience: 0,
    jobTitle: null,
    CV: null,
    aboutExperience: "",
  });

  const handleFocus = (field: string) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field: string, value: string) => {
    if (!value) {
      setFocused({ ...focused, [field]: false });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      fullName,
      email,
      phoneNumber,
      experience,
      jobTitle,
      aboutExperience,
    } = formData;
    // Create an object to send to the Sheets API or any backend
    const dataToSend = {
      fullName,
      email,
      phoneNumber,
      experience,
      jobTitle,
      CV, // This would likely be uploaded as a file and the URL sent here
      aboutExperience,
    };

    // Here, you would call the Sheets API or your backend
    try {
      const response = await fetch("/your-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white px-4">
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold mb-6 pr-32">
          <span className="text-[#80D3FF]">Salary</span> kitni loge usse pehele
          <span className="text-[#80D3FF]"> CV</span> dekhle?
        </h1>
        <form onSubmit={handleSubmit}>
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
                  if (selected === formData.jobTitle) {
                    setSelected(null);
                  }
                  setSelected(option);
                  setFormData((prev) => ({
                    ...prev,
                    jobTitle: prev.jobTitle === option ? null : option,
                  }));
                }}
                className={`${
                  selected === option ? "bg-gray-400 text-white" : ""
                } bg-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="grid gap-x-10 gap-y-4 py-5 grid-cols-1 md:grid-cols-2">
            {formFields.map((field, index) => (
              <div key={index} className="relative mb-6">
                <input
                  required
                  type={field.type}
                  name={field.label.toLowerCase().replace(" ", "")}
                  value={formData[name]}
                  onFocus={() => handleFocus(field.label)}
                  onBlur={(e) => handleBlur(field.label, e.target.value)}
                  onChange={handleChange}
                  className="w-full bg-gray-900 rounded-none text-white py-3 px-2 outline-none border border-t-0 border-l-0 border-r-0 border-[#80D3FF] transition"
                />
                <label
                  className={`absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-200 ${
                    focused[field.label]
                      ? "-translate-y-10 left-0 text-sm text-[#80D3FF]"
                      : ""
                  }`}
                >
                  {field.label}*
                </label>
              </div>
            ))}
          </div>

          <div className="mb-6 flex w-full flex-row-reverse gap-5 justify-end">
            <input
              type="file"
              name="CV"
              id="CB"
              className={`customfile ${CV ? "block" : "hidden"}`}
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setCV(file);
                setFormData((prev) => ({ ...prev, CV: file }));
              }}
            />
            <label htmlFor="CB" className="text-lg font-normal text-[#80D3FF]">
              Upload Your CV
            </label>
          </div>

          <div className="mb-6">
            <textarea
              placeholder="Tell Us About Your Experience!"
              name="aboutExperience"
              rows={4}
              value={formData.aboutExperience}
              onChange={handleChange}
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
