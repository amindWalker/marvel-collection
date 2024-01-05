import { Link } from "react-router-dom";
import { Character } from "../../../types";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { Card } from ".";
import { modalOpen } from "../../../store/modalSlice";
import { useState } from "react";
import MarvelPlaceholder from "../../../assets/MarvelUnavailable.svg";

export default function CharacterList(character: Character) {
    const [hasFocus, setHasFocus] = useState(false);
    const dispatch: AppDispatch = useDispatch();

    function handleMoreButton() {
        dispatch(modalOpen(character.id));
    }

    const avatarUrl =
        `${character.thumbnail?.path}.${character.thumbnail?.extension}`!;

    const placeholderOrAvatar =
        avatarUrl ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ||
        avatarUrl ===
            "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
            ? MarvelPlaceholder
            : avatarUrl;
    return (
        // @apply
        <div
            onPointerDown={() => setHasFocus(!hasFocus)}
            onPointerUp={() => setHasFocus(!hasFocus)}
            className={`max-w-max max-h-max text-center ${
                hasFocus ? "-translate-y-2" : "-translate-y-0"
            }`}
        >
            <p className={`h-1rem ${hasFocus ? "opacity-100" : "opacity-0"}`}>
                {character.name}
            </p>
            <span
                onFocus={() => setHasFocus(!hasFocus)}
                onBlur={() => setHasFocus(!hasFocus)}
                className="grid"
            >
                <Link
                    to={`characters/${character.id}`}
                    className={`i-mdi:chevron-up-circle text-5xl bg-black z-2 hover:invert fixed place-self-start m-4 mt-6 ${
                        hasFocus ? "opacity-100 z-2" : "opacity-0"
                    }`}
                    onClick={handleMoreButton}
                />
                <Card
                    style={{
                        container: "rounded overflow-hidden w-max h-max",
                        layout: "",
                        children: "text-center",
                        profileImage: `card-profile-img ${
                            hasFocus
                                ? "outline-red-700 brightness-125 -translate-y-2"
                                : ""
                        }`,
                        figureContainer: "leading-0 mx-1 my-6",
                    }}
                    profileURL={placeholderOrAvatar}
                >
                    <dialog
                        className={`grid relative rounded -mt-6 bg-white ${
                            hasFocus ? "opacity-100" : "opacity-0"
                        }`}
                        open={true}
                    >
                        <label className="text-black text-center w-58">
                            Comics found: {character.comics?.available}
                        </label>
                    </dialog>
                </Card>
            </span>
        </div>
    );
}
