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

const MainPage = Loadable(
  lazy(() => import("@/pages/MainPage"))
);

const NotFoundPage = Loadable(
  lazy(() => import("@/pages/NotFound"))
);

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/main"} replace />} />
      <Route path="/main" element={MainPage} />
      <Route path="/not-found" element={NotFoundPage} />
      <Route path="*" element={<Navigate to={"/not-found"} replace />} />
    </Routes>
  )
}

export default Router;