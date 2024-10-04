import React from "react";

const AddExamples = ({ setFormData, formData }) => {
  const { examples } = formData || { examples: [] };
  const handleChange = (e, ind) => {
    const { name, value } = e.target;
    let updated = { ...formData };
    updated.examples = [...formData.examples];
    updated.examples[ind][name] = value;
    setFormData(updated);
  };
  const handleAdd = () => {
    let updated = { ...formData };
    updated.examples = [
      ...formData.examples,
      { input: "", output: "", explanation: "" },
    ];
    setFormData(updated);
  };
  const handleDelete = (indTobeDeleted) => {
    let updated = { ...formData };
    updated.examples = formData.examples.filter(
      (ex, ind) => ind != indTobeDeleted
    );
    setFormData(updated);
  };
  return (
    <div className="sm:p-3 w-6xl flex flex-col items-center" >
      {examples?.map((example, ind) => (
        <div key={ind}>
          <ExampleForm
            example={example}
            ind={ind}
            handleChange={handleChange}
          />
          <div className="flex justify-end">
          <button
            onClick={() => handleDelete(ind)}
            disabled={examples.length === 1}
            className="border p-2 bg-red-800 rounded text-white disabled:bg-opacity-30"
          >
            Delete
          </button>
        </div>
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="border p-2 bg-green-800 rounded text-white"
      >
        Add
      </button>
    </div>
  );
};

const ExampleForm = ({ example, ind, handleChange }) => {
  return (
    <div className="">
      <h1>Example {ind+1} : </h1>
      <div className="flex items-center gap-2 m-4">
        <label className="w-24 ">input </label>
        <input
          type="text"
          onChange={(e) => handleChange(e, ind)}
          name="input"
          className="text-gray-500 p-1.5 border focus:outline-blue-500 focus:outline rounded bg-white"
          value={example.input}
        />
      </div>
      <div className="flex items-center gap-2 m-4">
        <label className="w-24 ">output </label>
        <input
          type="text"
          onChange={(e) => handleChange(e, ind)}
          name="output"
          className="text-gray-500 p-1.5 border focus:outline-blue-500 focus:outline rounded bg-white"
          value={example.output}
        />
      </div>
      <div className="flex items-center gap-2 m-4">
        <label className="w-24 ">explanation </label>
        <input
          type="text"
          onChange={(e) => handleChange(e, ind)}
          name="explanation"
          className="text-gray-500 p-1.5 border focus:outline-blue-500 focus:outline rounded bg-white"
          value={example.explanation}
        />
      </div>
    </div>
  );
};

export default AddExamples;
