import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 flex-col py-10 items-center justify-center">
            <Outlet />
          </section>

          <img
            src="/assets/images/sideImg.png"
            alt="side image"
            className="hidden xl:block h-full w-[36%] bg-no-repeat bg-cover"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
