import { useSelector } from "react-redux";
import CharactersComponent from "../Characters";
import { CombinedState } from "../../state/combinedReducers";

const Home = () => {
    const characterData = useSelector(
        (state: CombinedState) => state.marvel.characters
    );
    const status = useSelector((state: CombinedState) => state.marvel.status);

    return (
        <>
            <CharactersComponent />
        </>
    );
};

export default Home;
