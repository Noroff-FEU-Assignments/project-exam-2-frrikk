import MainPage from "@/app/_components/main-page";
import Splash from "@/app/_components/splash";
import Form from "@/app/_components/form";

export default function SignUp() {
  return (
    <MainPage>
      <Splash fig={9} />
      <div className="relative">
        <Form />
      </div>
    </MainPage>
  );
}
