import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CombinedState } from "../../state/combinedReducers";
import { AppDispatch } from "../../state/store";
import { Status } from "../../state/interfaces/marvelState";
import { fetchCharacterData } from "../../services/api";

const CharactersComponent = () => {
    const dispatch: AppDispatch = useDispatch();
    const characterData = useSelector(
        (state: CombinedState) => state.marvel.characters
    );
    const status = useSelector((state: CombinedState) => state.marvel.status);

    useEffect(() => {
        if (status === Status.Idle) {
            // Waiting for new requests to fetch the API
            dispatch(fetchCharacterData());
        }
    }, [status, dispatch]);

    if (status === Status.Loading) {
        return <div>Loading...</div>;
    }

    if (status === Status.Failed) {
        return <div>Error: Something went wrong</div>;
    }

    return (
        <div>
            <h1>Marvel Characters</h1>
            <ul>
                {characterData &&
                    characterData.map((character) => (
                        <li key={character.id}>{character.name}</li>
                    ))}
            </ul>
        </div>
    );
};

export default CharactersComponent;
