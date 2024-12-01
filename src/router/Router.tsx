import LoadingScreen from "@/custom_components/LoadingScreen";
import { lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

const Loadable = (Component: LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component />
    </Suspense>
  );
};

const LoginPage = Loadable(
  lazy(() => import("@/pages/LoginPage"))
);

const SignupPage = Loadable(
  lazy(() => import("@/pages/SignupPage"))
);

const ValidationPage = Loadable(
  lazy(() => import("@/pages/ValidateCodePage"))
);

const MainPage = Loadable(
  lazy(() => import("@/pages/MainPage"))
);

const NotFoundPage = Loadable(
  lazy(() => import("@/pages/NotFound"))
);

const TestPage = Loadable(
  lazy(() => import("@/pages/Test"))
)

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/main"} replace />} />
      <Route path="/main" index element={MainPage} />
      <Route path="/login" element={LoginPage} />
      <Route path="/signup" element={SignupPage} />
      <Route path="/validation" element={ValidationPage} />
      <Route path="/not-found" element={NotFoundPage} />
      <Route path="/test" element={TestPage} />
      <Route path="*" element={<Navigate to={"/not-found"} replace />} />
    </Routes>
  )
}

export default Router;