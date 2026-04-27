import Header from "@/components/Header2";
import Main from "@/components/LogIn";

export const metadata = {
    title: "Sign Up",
};
function LoginPage() {
    return (
        <div className="bg-gray-100 ">
            <Header />
            <Main />
        </div>
    );
}

export default LoginPage;
