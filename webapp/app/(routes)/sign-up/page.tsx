import Splash from "@/app/_components/splash";
import RegisterForm from "@/app/(routes)/sign-up/(components)/form";

export default function SignUp() {
  return (
    <>
      <Splash fig={6} />
      <div className="relative bottom-28">
        <RegisterForm />
      </div>
    </>
  );
}
