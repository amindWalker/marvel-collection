import { Link } from "react-router-dom";
import { Character } from "../../../types";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { Card } from ".";
import { modalOpen } from "../../../store/modalSlice";
import { useState } from "react";

export default function CharacterList(character: Character) {
    const [hasFocus, setHasFocus] = useState(false);
    const dispatch: AppDispatch = useDispatch();

    function handleMoreButton() {
        dispatch(modalOpen(character.id));
    }

    const avatarUrl =
        `${character.thumbnail?.path}.${character.thumbnail?.extension}`!;
    return (
        // @apply
        <div
            key={character.id}
            onPointerDown={() => setHasFocus(!hasFocus)}
            onPointerUp={() => setHasFocus(!hasFocus)}
            className={`max-w-max max-h-max text-center ${
                hasFocus ? "-translate-y-2" : "-translate-y-0"
            }`}
        >
            <p className={hasFocus ? "opacity-100" : "opacity-0"}>
                {character.name}
            </p>
            <span
                onFocus={() => setHasFocus(!hasFocus)}
                onBlur={() => setHasFocus(!hasFocus)}
            >
                <Card
                    style={{
                        container: "rounded overflow-hidden w-min h-min",
                        layout: "",
                        children: "text-xl",
                        profileImage: `card-profile-img ${
                            hasFocus
                                ? "outline-red-700 brightness-125 -translate-y-2"
                                : ""
                        }`,
                        figureContainer: "leading-0 mx-1 my-6",
                    }}
                    profileURL={avatarUrl}
                >
                    <dialog
                        className={`relative rounded m-0 ${
                            hasFocus ? "opacity-100" : "opacity-0"
                        }`}
                        open={true}
                    >
                        Comics available: {character.comics?.available}
                        <Link
                            to={`characters/${character.id}`}
                            className="i-mdi:information-slab-circle text-4xl"
                            onClick={handleMoreButton}
                        />
                    </dialog>
                </Card>
            </span>
        </div>
    );
}
