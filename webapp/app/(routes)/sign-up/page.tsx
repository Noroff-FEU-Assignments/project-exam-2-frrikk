import MainPage from "@/app/_components/main-page";
import Splash from "@/app/_components/splash";
import RegisterForm from "@/app/_components/form";

export default function SignUp() {
  return (
    <MainPage>
      <Splash fig={6} />
      <div className="relative bottom-28">
        <RegisterForm />
      </div>
    </MainPage>
  );
}
