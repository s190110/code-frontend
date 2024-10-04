import React from "react";

function Question({ inputs, setInputs }) {
  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        title: "",
        description: "",
        difficulty: "",
        startCode: "",
        solutionCode: "",
        expectedComplexity: "",
        constraints: "",
        topics: "",
        examples: [{ input: "", output: "", explanation: "" }],
      },
    ]);
  };
  const handleAddExample = (index) => {
    let x = [...inputs];
    x[index].examples.push({ input: "" });
    setInputs(x);
  };
  const handleDeleteExample = (index, idx) => {
    let x = [...inputs];
    let y = x[index].examples;
    y.splice(idx, 1);
    setInputs(x);
  };
  const handleExampleChange = (event, index, idx) => {
    let { name, value } = event.target;
    let onChangeValue = [...inputs];
    onChangeValue[index].examples[idx][name] = value;
    setInputs(onChangeValue);
  };

  const handleChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...inputs];
    onChangeValue[index][name] = value;
    setInputs(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };
  return (
    <>
      <div
        id="#addQuestion"
        className="flex flex-col w-full my-4 gap-6 items-center bg-white"
      >
        <h1 className="text-center font-bold text-3xl my-4 text-gray-500">
          Add questions
        </h1>
        {inputs.map((item, index) => (
          <div
            className="w-10/12 mx-auto bg-green-400 p-5 rounded-md"
            key={index}
          >
            <h1 className="font-semibold text-center text-3xl text-black">{`Question ${
              index + 1
            }`}</h1>
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-xl font-semibold text-black mb-2"
              >
                Question Title :{" "}
              </label>
              <input
                name="title"
                type="text"
                value={item.title}
                onChange={(event) => handleChange(event, index)}
                className="input input-bordered w-full bg-gray-800 text-white"
                placeholder="Question title"
              />
            </div>
            <label className="form-control">
              <div className="label">
                <span className="label-text font-semibold text-xl text-black">
                  Description :{" "}
                </span>
              </div>
              <textarea
                name="description"
                value={item.description}
                className="textarea textarea-bordered h-24 bg-gray-800 text-white"
                placeholder="Description"
                onChange={(event) => handleChange(event, index)}
              ></textarea>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text font-semibold text-xl text-black">
                  Start code :{" "}
                </span>
              </div>
              <textarea
                name="startCode"
                value={item.startCode}
                className="textarea textarea-bordered h-24 bg-gray-800 text-white"
                placeholder="Start code"
                onChange={(event) => handleChange(event, index)}
              ></textarea>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text font-semibold text-xl text-black">
                  Solution code :{" "}
                </span>
              </div>
              <textarea
                name="solutionCode"
                value={item.solutionCode}
                className="textarea textarea-bordered h-24 bg-gray-800 text-white"
                placeholder="Solution"
                onChange={(event) => handleChange(event, index)}
              ></textarea>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text font-semibold text-xl text-black">
                  Constraints :{" "}
                </span>
              </div>
              <textarea
                name="constraints"
                value={item.constraints}
                className="textarea textarea-bordered h-24 bg-gray-800 text-white"
                placeholder="constraints"
                onChange={(event) => handleChange(event, index)}
              ></textarea>
            </label>
            <div className="flex flex-col my-2">
              <label
                htmlFor=""
                className="text-xl font-semibold text-black mb-3"
              >
                Topics :{" "}
              </label>
              <input
                name="topics"
                type="text"
                value={item.topics}
                onChange={(event) => handleChange(event, index)}
                className="input input-bordered w-full bg-gray-800 text-white"
                placeholder="ex:  [array, string, binarysearch]"
              />
            </div>
            <p className="text-xl font-semibold my-4 text-black">Examples : </p>
            <div
              style={{ border: "1px solid green" }}
              className="p-3 rounded-md bg-green-300 flex flex-col gap-5"
            >
              {item.examples.map((e, idx) => (
                <div key={idx} className="border-red-100">
                  <p className="font-semibold text-lg underline text-black">{`Example ${
                    idx + 1
                  }`}</p>
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text font-semibold text-lg text-black">
                        Input :{" "}
                      </span>
                    </div>
                    <textarea
                      onChange={(event) =>
                        handleExampleChange(event, index, idx)
                      }
                      value={item.examples[idx].input}
                      name="input"
                      className="textarea textarea-bordered h-24 bg-gray-800 text-white"
                      placeholder="input"
                    ></textarea>
                  </label>
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text font-semibold text-lg text-black">
                        Output :{" "}
                      </span>
                    </div>
                    <textarea
                      onChange={(event) =>
                        handleExampleChange(event, index, idx)
                      }
                      value={item.examples[idx].output}
                      name="output"
                      className="textarea textarea-bordered h-24 bg-gray-800 text-white"
                      placeholder="output"
                    ></textarea>
                  </label>
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text font-semibold text-lg text-black">
                        Explanation :{" "}
                      </span>
                    </div>
                    <textarea
                      onChange={(event) =>
                        handleExampleChange(event, index, idx)
                      }
                      value={item.examples[idx].explanation}
                      name="explanation"
                      className="textarea textarea-bordered h-24 bg-gray-800 text-white"
                      placeholder="explanation"
                    ></textarea>
                  </label>
                  {item.examples.length > 1 && (
                    <button
                      className="btn mt-3 mr-2 bg-gray-800 text-white hover:text-black"
                      onClick={() => handleDeleteExample(index, idx)}
                    >
                      Delete
                    </button>
                  )}
                  {idx === item.examples.length - 1 && (
                    <button
                      className="btn mt-3 bg-gray-800 text-white hover:text-black"
                      onClick={() => handleAddExample(index)}
                    >
                      Add Example
                    </button>
                  )}
                </div>
              ))}
            </div>

            {inputs.length > 1 && (
              <button
                className="btn mt-3 mr-2 bg-gray-800 text-white hover:text-black"
                onClick={() => handleDeleteInput(index)}
              >
                Delete
              </button>
            )}
            {index === inputs.length - 1 && (
              <button
                className="btn mt-3 bg-gray-800 text-white hover:text-black"
                onClick={() => handleAddInput()}
              >
                Add Question
              </button>
            )}
          </div>
        ))}

        {/* <div className="body"> {JSON.stringify(inputs)} </div> */}
      </div>
    </>
  );
}

export default Question;
