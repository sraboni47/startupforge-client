import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register | StartupForge",
};

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-10">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
