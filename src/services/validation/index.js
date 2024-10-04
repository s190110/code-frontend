import { startDescription } from "../../config/constants";

// const data = {
//   title: "",
//   description: startDescription,
//   difficulty: "Medium",
//   topics: "",
//   createdAt: "",
//   examples: [
//     {
//       input: "",
//       output: "",
//       explanation: "",
//     },
//   ],
//   testCases: "",
// };
export const validateProblem = (formData) => {
  const {
    title,
    description,
    createdAt,
    examples,
    testCases,
  } = formData;
  let errors = [];
  if(description=="" || description==startDescription) errors.push("Description can't ne empty or unmodifies!!");
  if(title.length<=4) errors.push("Title can't be less than 4 chars");
  const addDate=new Date(createdAt);
  if(new Date()-addDate>10000) errors.push("Add Date must be some time in future!!");
  examples.forEach(example => {
    if(example.output==""){
      errors.push("output in example can't be empty!!");
      return errors;
    }
  });
  return errors.length ? errors : null;
};
