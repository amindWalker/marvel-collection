import { Link } from "react-router-dom";
import { Character } from "../../../types";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { Card } from ".";
import { modalOpen } from "../../../store/modalSlice";

export default function CharacterList(character: Character) {
    const dispatch: AppDispatch = useDispatch();

    function handleMoreButton() {
        dispatch(modalOpen(character.id));
    }

    return (
        <div key={character.id}>
            <Card
                style={{
                    container: "@apply bg-red-500 rounded-xl m-4",
                    layout: "grid grid-flow-col place-items-center",
                    mainTitle: "text-2xl",
                    textContent: "text-xl p-4",
                    separator: "ring h-80%",
                }}
                mainTitle={character.name}
            >
                Comics avaiable: {character.comics?.available}
                <Link
                    to={`characters/${character.id}`}
                    className="i-mdi:information-slab-circle text-4xl"
                    onClick={handleMoreButton}
                />
            </Card>
        </div>
    );
}
