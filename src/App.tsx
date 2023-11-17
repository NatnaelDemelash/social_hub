import { Routes, Route } from "react-router-dom";
import SigninForm from "./_auth/form/SigninForm";
import SignupForm from "./_auth/form/signupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { HomePage } from "./_root/pages";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Private Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* Public routes */}
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
