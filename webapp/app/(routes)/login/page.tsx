import MainPage from "@/app/_components/main-page";
import Splash from "@/app/_components/splash";
import LoginForm from "@/app/(routes)/login/(components)/form";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/_context/user-context";

export default function Login() {
  return (
    <>
      <Splash fig={6} />
      <div className="relative bottom-28">
        <LoginForm />
      </div>
    </>
  );
}
