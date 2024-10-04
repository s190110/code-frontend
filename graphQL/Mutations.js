import { gql } from "@apollo/client";

export const registerUser = gql`
  mutation RegisterUser($newUser: userInput) {
    user: registerUser(newUser: $newUser) {
      token
      user {
        id
        firstName
        lastName
        userName
        email
        createdAt
        profileLink
        linkedinLink
        githubLink
        instagramLink
        portfolioLink
      }
    }
  }
`;
export const editProfile = gql`
  mutation EditProfile($input: minput) {
    user: editProfile(input: $input) {
      id
      firstName
      lastName
      userName
      email
      createdAt
      profileLink
      linkedinLink
      githubLink
      instagramLink
      portfolioLink
    }
  }
`;
export const AddContest = gql`
  mutation AddContest($newContest: contestInput) {
    addContest(newContest: $newContest) {
      id
      name
      url
      startTime
      endTime
      owner
      mediators
      organisation
    }
  }
`;

export const SubmitCode = gql`
  mutation SubmitCode($input: submitInput) {
    submitCode(input: $input) {
      id
      userId
      problemId
      isAccepted
      isInContest
      errorDetails
      submittedAt
      code
      language
      inputCase
      output
      expectedOutput
    }
  }
`;
export const RegisterToContest = gql`
  mutation RegisterToContest($contestId: ID!) {
    contest: registerToContest(contestId: $contestId) {
      id
      name
      url
      startTime
      endTime
      owner
      mediators
      organisation
    }
  }
`;
export const BlockUser = gql`
  mutation BlockUser($contestId: ID!) {
    blockUser(contestId: $contestId)
  }
`;
export const AddProblem = gql`
  mutation AddProblem($newProblem: problemInput) {
    addProblem(newProblem: $newProblem) {
      id
      title
      description
      difficulty
      startCode
      topics
      solutionCode
      createdAt
      createdBy
      constraints
      expectedComplexity
      examples {
        id
        input
        output
        explanation
        problemId
      }
    }
  }
`;
