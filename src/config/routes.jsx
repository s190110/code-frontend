import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "../components/popUps/Loading";
import Login from "../components/auth/Login";
import Home from "../components/Home";
import HomeLayout from "../components/layouts/HomeLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import EditorCode from "../components/EditorCode";
import ContestLayout from "../components/layouts/ContestLayout";
import Forbidden from "../components/errorPages/Forbidden";
import PageNotFound from "../components/errorPages/PageNotFound";

// Lazy load components
const Profile = lazy(() => import("../components/Profile"));
const Edit = lazy(() => import("../components/Edit"));
const CodeLayout = lazy(() => import("../components/layouts/CodeLayout"));
const Test = lazy(() => import("../components/test"));
const ProblemTable = lazy(() => import("../components/ProblemTable"));
const SolveProblem = lazy(() => import("../components/SolveProblem"));
const Create = lazy(() => import("../components/contest/Create"));
const SubmissionsTable = lazy(() => import("../components/SubmissionsTable"));
const ContestHome = lazy(() => import("../components/contest/ContestHome"));
const ContestProblems = lazy(() =>
  import("../components/contest/ContestProblems")
);
const ContestStart = lazy(() => import("../components/contest/ContestStart"));
const OrganisedContests = lazy(() =>
  import("../components/organised/OrganisedContests")
);
const AddProblem = lazy(() => import("../components/addProblem/AddProblem"));

const AllRoutes = () => {
  return (
    <div className="relative">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/problems" element={<ProblemTable />} />
            <Route path="/forbidden" element={<Forbidden />} />
          </Route>
          <Route
            path="contest/participate/:contestURL"
            element={<ContestLayout />}
          >
            <Route index element={<ContestProblems />} />
            <Route path="solve/:problemId" element={<SolveProblem />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/addProblem" element={<AddProblem />} />
            <Route path="/organised">
              <Route index element={<OrganisedContests />} />
            </Route>
            <Route path="/contest">
              <Route index element={<ContestHome />} />
              <Route path=":contestURL" element={<ContestStart />} />
              <Route path="create" element={<Create />} />
              <Route
                path="responseClosed"
                element={
                  <div className="h-[90vh] w-full flex justify-center  items-center">
                    <h1 className="text-red-600 text-2xl ">
                      you cant open as you are already opened or made excessive
                      tabswitches
                    </h1>
                  </div>
                }
              />
            </Route>
            <Route path="/profile">
              <Route index element={<Profile />} />
              <Route path="edit" element={<Edit />} />
              <Route path="allsubmissions" element={<SubmissionsTable />} />
            </Route>
          </Route>
          <Route element={<CodeLayout />}>
            <Route path="/playground" element={<EditorCode />} />
            <Route path="/problem/:problemId" element={<SolveProblem />} />
            <Route path="/contest/view/:contestURL">
              <Route index element={<ContestProblems />} />
              <Route path="solve/:problemId" element={<SolveProblem />} />
            </Route>
          </Route>
          <Route path="/load" element={<Loading />} />
          <Route path="/test" element={<Test />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default AllRoutes;
