import Container from "./Container2";
import Controle from "./Controle";
import UsersBlock from "./UsersBlock";

function Main() {
    return (
        <div>
            <Container>
                <div className="min-h-[calc(100vh-102px)]">
                    <UsersBlock
                        users={[
                            { name: "1 D", color: "#7dd3fc" }, // sky-300
                            { name: "2 D", color: "#fecaca" }, // red-200
                            { name: "3 D", color: "#f1faca" }, 
                            { name: "4 D", color: "#fecf1a" },
                            { name: "5 D", color: "#11caca" },
                            { name: "6 D", color: "#1131ca" },
                            { name: "7 D", color: "#11c179" },
                        ]}
                    />
                    <Controle/>
                </div>
            </Container>
        </div>
    );
}

export default Main;