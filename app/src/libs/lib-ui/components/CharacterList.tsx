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
    const avatarImg = `w-min h-min ${character.thumbnail?.path}.${character.thumbnail?.extension}`;
    return (
        // @apply
        <div key={character.id}>
            <Card
                style={{
                    container: "rounded-xl m-4 overflow-hidden w-64 h-96 ring grid place-items-center",
                    layout: "grid place-items-center ring ring-red-400",
                    content: "text-xl",
                    avatarImage: avatarImg,
                }}
            >
                Comics available: {character.comics?.available}
                <Link
                    to={`characters/${character.id}`}
                    className="i-mdi:information-slab-circle text-4xl"
                    onClick={handleMoreButton}
                />
            </Card>
        </div>
    );
}
