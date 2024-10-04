import { gql } from "@apollo/client";

export const LoginUser = gql`
  query LoginUser($email: String!, $password: String!) {
    user: loginUser(email: $email, password: $password) {
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
export const RunCode = gql`
  query RunCode($input: codeInput) {
    output: runCode(input: $input) {
      stdout
      error
      stderr
      testCasesResult
      testcaseOutput
    }
  }
`;

// export const GetAllSubmitions = gql`
//   query GetAllSubmissions($userId: ID!) {
//     getAllSubmissions(userId: $userId) {
//       id
//       userId
//       problemId
//       isAccepted
//       isInContest
//       errorDetails
//       submittedAt
//       code
//       language
//     }
//   }
// `;

export const GetUser = gql`
  query GetUser {
    user: getUser {
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
export const GetAllProblems = gql`
  query GetAllProblems($pagination: Pagination) {
    problems: getAllProblems(Pagination: $pagination) {
      id
      title
      description
      difficulty
      topics
      createdAt
      createdBy
      status
    }
  }
`;

export const GetProblem = gql`
  query GetProblem($getProblemId: ID!) {
    problem: getProblem(id: $getProblemId) {
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

export const isnameAvailable = gql`
  query IsContestNameAvailable($contestName: String!) {
    isContestNameAvailable(contestName: $contestName) {
      ok
      error
    }
  }
`;
export const GetAllSubmissions = gql`
  query GetAllSubmissions($userId: ID!, $pagination: Pagination) {
    submissions: getAllSubmissions(userId: $userId, Pagination: $pagination) {
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
      testCasesResult
      problem {
        title
      }
    }
  }
`;
export const GetContests = gql`
  query GetContests {
    contests: getContests {
      upComing {
        id
        name
        url
        startTime
        endTime
        owner
        mediators
        organisation
      }
      pastParticipated {
        id
        name
        url
        startTime
        endTime
        owner
        mediators
        organisation
      }
      registered {
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
  }
`;

export const GetContestProblems = gql`
  query GetContestProblems($contestUrl: String!) {
    contest: getContestProblems(contestURL: $contestUrl) {
      id
      name
      url
      startTime
      endTime
      owner
      mediators
      organisation
      contestQuestions {
        id
        contestId
        problem {
          id
          title
          description
          difficulty
          startCode
          constraints
          examples {
            id
            input
            output
            explanation
            problemId
          }
        }
        problemId
      }
    }
  }
`;

export const IsRigistered = gql`
  query Query($contestId: ID!) {
    isRigistered(contestId: $contestId)
  }
`;

export const PastParticipated = gql`
  query Query($userId: ID!) {
    contests: getAllParticipatedContests(userId: $userId) {
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
export const GetContestDetails = gql`
  query GetContestDetails($contestUrl: String!) {
    contest: getContestDetails(contestUrl: $contestUrl) {
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
export const GetProblemSubmissions = gql`
  query GetProblemSubmissions($problemId: ID!, $pagination: Pagination) {
    submissions: getProblemSubmissions(
      problemId: $problemId
      Pagination: $pagination
    ) {
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
      testCasesResult
    }
  }
`;
export const GetOrganised = gql`
  query GetAllOrganisedContests {
    contests: getAllOrganisedContests {
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
export const ContestRankings = gql`
  query GetContestRankings($contestUrl: String!) {
    rankings: getContestRankings(contestUrl: $contestUrl) {
      id
      userId
      contestId
      lastSubmitted
      isJoined
      isBlocked
      score
      User {
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
