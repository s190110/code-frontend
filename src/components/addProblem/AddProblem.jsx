import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { startDescription } from "../../config/constants";
import AddExamples from "./AddExamples";
import AddTestCases from "./AddTestCases";
import { validateProblem } from "../../services/validation";
import { useMutation } from "@apollo/client";
import { AddProblem as AddProblemMutation } from "../../../graphQL/Mutations";

const AddProblem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: startDescription,
    difficulty: "Medium",
    topics: "",
    createdAt: "",
    examples: [
      {
        input: "",
        output: "",
        explanation: "",
      },
    ],
    testcases: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const [addProblem, { error, data, loading }] =
    useMutation(AddProblemMutation);
  const handleChange = (e) => {
    if (!e.target) {
      setFormData({ ...formData, description: e });
      return;
    }
    const { name, value } = e.target;
    let updatedForm = { ...formData };
    updatedForm[name] = value;
    setFormData(updatedForm);
  };

  const handleAdd = async () => {
    const errors = validateProblem(formData);
    if (errors) {
      setValidationErrors(errors);
      return;
    }
    console.log(formData);
    try {
      const res = await addProblem({ variables: { newProblem: formData } });
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
    setValidationErrors([]);
  };
  return (
    <div className="p-3 text-black">
      <h1 className="text-center text-2xl">Create Problem</h1>
      <div className="flex flex-col items-center w-full sm:p-2 md:w-5xl justify-center">
        <div className="flex items-center gap-2 m-4">
          <label className="w-20 ">Title </label>
          <input
            type="text"
            onChange={handleChange}
            name="title"
            className="text-gray-500 p-1.5 border focus:outline-blue-500 focus:outline rounded bg-white"
            value={formData.title}
          />
        </div>
        <div className="flex items-center gap-2 m-4">
          <label className="w-20">Topics </label>
          <input
            type="text"
            onChange={handleChange}
            name="topics"
            className="text-gray-500 p-1.5 border focus:outline-blue-500 focus:outline rounded bg-white"
            placeholder="ex: array, dp, sorting"
            value={formData.topics}
          />
        </div>
        <div className="flex items-center gap-2 m-4">
          <label className="w-20 ">Difficulty </label>
          <select
            onChange={handleChange}
            name="difficulty"
            className="text-gray-500 p-1.5 border focus:outline-blue-500 focus:outline rounded bg-white"
            value={formData.difficulty}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <p className="text-md pb-2">When Should it be Added to Problem Table</p>
        <div>
          <input
            type="datetime-local"
            onChange={handleChange}
            name="createdAt"
            className="text-gray-500 p-1.5 border px-4 focus:outline-blue-500 focus:outline rounded bg-white"
            placeholder="ex: array, dp, sorting"
            value={formData.createdAt}
          />
        </div>
      </div>
      <div
        data-color-mode="light"
        className="border rounded p-5 flex flex-col gap-3"
      >
        <h1>Description:</h1>
        <span className="text-xs">use tables and image links if necessary</span>
        <div className="h-full">
          <MDEditor
            height="70vh"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <AddExamples setFormData={setFormData} formData={formData} />
      <AddTestCases formData={formData} setFormData={setFormData} />
      {!!validationErrors.length && (
        <div className="border rounded bg-red-300 p-2 m-3">
          {validationErrors.map((er,ind) => (
            <p className="text-sm p-1" key={ind}>{er}</p>
          ))}
        </div>
      )}
      <button
        className="rounded bg-blue-600 p-2 m-5 place-content-center text-white"
        onClick={handleAdd}
      >
        Add Problem
      </button>
    </div>
  );
};

export default AddProblem;

// model Problem {
//   title              String
//   description        String
//   difficulty         String
//   topics             String
//   createdAt          DateTime           @default(now())
//   examples           Example[]          @relation("ProblemExamples")
//   testCases          TestCase[]

//   startCode          String
//   solutionCode       String
//   constraints        String
//   expectedComplexity String
//   contestQuestions   ContestQuestions[]
//   userSubmissions    UserSubmissions[]
//   createdBy          String
// }

// createdAt: "2024-09-27T21:31"
// ​
// description: " <!-- Title of the Problem -->\n# Two sum\n\n<!-- Description of the Problem -->\nGiven an array `nums` of length n and  an integter `target` print true if there are two distinct indices i, j in nums such that nums[i] + nums[j] = traget.\n<!-- input Format -->\n#### Input Format:\n\n- first line contains no of test cases t\n- for each test case t given n length of array follwed by n integers i.e elements of array nums\n- follwed by target\n\n<!-- OutPut Format -->\n#### OutPut Format:\n\n- for each test case print true if there is an pair else false\n- print output of each test case in new line\n\n#### Constraints:\n\n- [ ] `1<t<100000`\n- [ ] `1<n<100000`\n- [ ] `0<=nums[i]<100000`\n"
// ​
// difficulty: "Medium"
// ​
// examples: Array(3) [ {…}, {…}, {…} ]
// ​​
// 0: Object { input: "5 1 2 3 4 5 10", output: "false", explanation: "" }
// ​​​
// explanation: ""
// ​​​
// input: "5 1 2 3 4 5 10"
// ​​​
// output: "false"
// ​​​
// <prototype>: Object { … }
// ​​
// 1: Object { input: "2 3 9 12", output: "true", explanation: "" }
// ​​​
// explanation: ""
// ​​​
// input: "2 3 9 12"
// ​​​
// output: "true"
// ​​​
// <prototype>: Object { … }
// ​​
// 2: Object { input: "9 10 0 9 8 2 17", output: "true", explanation: "" }
// ​​​
// explanation: ""
// ​​​
// input: "9 10 0 9 8 2 17"
// ​​​
// output: "true"
// ​​​
// <prototype>: Object { … }
// ​​
// length: 3
// ​​
// <prototype>: Array []
// ​
// testCases: ""
// ​
// testcases: "5 10 20 30 40 50 90\ntrue\n5 10 20 30 40 50 100\ntrue"
// ​
// title: "Two sum"
// ​
// topics: "array, sorting, hashing"
