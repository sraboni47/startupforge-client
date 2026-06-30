import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex items-center justify-center px-4 py-10">
      <LoginForm />
    </div>
  );
};

export default LoginPage;