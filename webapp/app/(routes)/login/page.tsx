import MainPage from "@/app/_components/main-page";
import Splash from "@/app/_components/splash";
import LoginForm from "@/app/(routes)/login/(components)/form";

export default function Login() {
  return (
    <MainPage>
      <Splash fig={6} />
      <div className="relative bottom-28">
        <LoginForm />
      </div>
    </MainPage>
  );
}
