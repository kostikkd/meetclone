import Header from "@/components/Header2";
import Main from "@/components/SingUp";

export const metadata = {
    title: "Sign In",
};
function SingUpPage() {
    return (
        <div className="bg-gray-100 ">
            <Header />
            <Main />
        </div>
    );
}

export default SingUpPage;
