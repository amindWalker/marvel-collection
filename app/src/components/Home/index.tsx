import { useSelector } from "react-redux";
import CharactersComponent from "../Characters";
import { CombinedState } from "../../state/combinedReducers";
import Card from "../Card";
import MarvelUnavailableImg from "../../../assets/MarvelUnavailable.svg";
import { Status } from "../../state/interfaces/characterState";

const Home = () => {
    const characterData = useSelector(
        (state: CombinedState) => state.marvel.characters
    );
    const status = useSelector((state: CombinedState) => state.marvel.status);

    return (
        <>
            <article className="@apply grid overflow-hidden">
                <div className="absolute w110% justify-self-center h100vh z0 bg-gradient-to-tl from-black via-sky-600"></div>
                <div className="absolute w110% justify-self-center h100vh z0 bg-gradient-to-t from-black via-sky-900 animate-pulse animate-duration-5000"></div>
                <div className="-rotate-2 p4 -ml8 self-center min-h-max grid grid-flow-col overflow-x-scroll overflow-y-hidden">
                    <header className="grid max-w-48">
                        <h1 className="text-center py-16 self-center -rotate-90 font-sans text-white text-6xl animate-pulse animate-ease-in-out">
                            CHOOSE
                            <br />
                            <sup className="text-3xl">YOUR HERO</sup>
                        </h1>
                    </header>
                    {status === Status.Succeeded ? (
                        characterData.map((character, index) => {
                            return (
                                <Card
                                    key={character.id}
                                    index={index}
                                    // linkTo="/hero"
                                    thumb={
                                        `${character.thumbnail.path}.${character.thumbnail.extension}` ==
                                        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                                            ? MarvelUnavailableImg
                                            : `${character.thumbnail.path}.${character.thumbnail.extension}`
                                    }
                                    heroName={character.name}
                                    comicsAvailable={character.comics.available}
                                />
                            );
                        })
                    ) : (
                        <p>Loading</p>
                    )}
                </div>
            </article>
            <CharactersComponent />
        </>
    );
};

export default Home;
