import CardPage from "./CardPage";
import Title from "../components/NavBar";

export default function HomePage() {
    return (
        <div className="container m-10 text-lg">
            <Title />
            <CardPage />
        </div>
    );
}

