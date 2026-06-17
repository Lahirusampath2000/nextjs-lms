import React from 'react'

interface Step1Props {
  formData: {
    course_name: string;
    description: string;
    grade: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}
function Step1({formData,handleChange}:Step1Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-indigo-950 mb-1.5">
          Course Name
        </label>
        <input
          type="text"
          name="course_name"
          value={formData.course_name}
          onChange={handleChange}
          placeholder="e.g. Introduction to Algebra"
          className="w-full border border-indigo-100 bg-white/80 p-2.5 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all duration-200"
        />
      </div>
 
      <div>
        <label className="block text-sm font-medium text-indigo-950 mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Briefly describe what this course covers"
          rows={4}
          className="w-full border border-indigo-100 bg-white/80 p-2.5 rounded-lg text-sm placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all duration-200"
        />
      </div>
 
      <div>
        <label className="block text-sm font-medium text-indigo-950 mb-1.5">
          Grade
        </label>
        <select
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className="w-full border border-indigo-100 bg-white/80 p-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all duration-200"
        >
          <option value="">Select Grade</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
            <option key={g} value={g}>
              Grade {g}
            </option>
          ))}
        </select>
      </div>
 
      <p className="text-xs text-gray-400 leading-relaxed">
        A unique course code will be generated automatically once you submit.
      </p>
    </div>
  )
}

export default Step1