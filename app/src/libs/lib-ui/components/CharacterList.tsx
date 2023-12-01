import { useDispatch, useSelector } from "react-redux";
import { Status, selectCharacters } from "../../../store/characterSlice";
import { useEffect } from "react";
import { AppDispatch } from "../../../store";
import { Card } from ".";
import { fetchCharactersData } from "../../../services/fetchAndCache";

export default function CharacterList() {
    const dispatch: AppDispatch = useDispatch();
    const charactersData = useSelector(selectCharacters);
    const characters = charactersData.characters;
    const status = charactersData.status;

    if (status === Status.Failed) {
        // TODO: dedicated error page.
        return <div>Error: Something went wrong</div>;
    }
    useEffect(() => {
        dispatch(fetchCharactersData());
    }, [dispatch]);
    console.log(charactersData);

    return (
        <>
            {status === Status.Idle &&
                characters.map((char) => {
                    return (
                        <ul key={char.id}>
                            <Card
                                key={char.id}
                                id={char.id}
                                name={char.name}
                            />
                            {char.name}
                        </ul>
                    );
                })}
        </>
    );
}
