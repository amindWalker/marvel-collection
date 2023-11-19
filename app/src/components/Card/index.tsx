import { useState } from "react";
import { useSelector } from "react-redux";
import { CharacterState, Status } from "../../state/interfaces/characterState";

interface CardProps {
    index?: number;
    // linkTo: string;
    thumb?: string;
    heroName: string;
    comicsAvailable?: number;
}

const Card: React.FC<CardProps> = ({
    index,
    // linkTo,
    thumb,
    heroName,
    comicsAvailable,
}) => {
    const [isHover, setIsHover] = useState(false);
    const opacity = isHover ? 0 : 1;
    const isLoading = useSelector((state: CharacterState) => state.status);
    const loading =
        isLoading === Status.Loading
            ? "i-line-md:loading-twotone-loop p8 self-center bg-red-700"
            : "bg-white z2 hovercard w64 h64 max-w-64 max-h-64";
    return (
        <ul
            className="@apply self-center bg-[url({backdropImg})]"
            style={{ listStyle: "none" }}
            onPointerDown={() => (isHover ? setIsHover(!isHover) : false)}
            onPointerUp={() => (isHover ? setIsHover(!isHover) : false)}
        >
            <figure
                className="grid max-w-64 m-0.5 animate-fade-in-right"
                // style={{ listStyle: "none", animationDelay: `${index}00ms` }}
            >
                <figcaption
                    className="text-center p4"
                    style={{ opacity: opacity }}
                >
                    <p className="text-white">{heroName}</p>
                        <i
                            className="border-none outline-none appearance-none i-mdi:chevron-up-circle z3 hover:invert fixed m2 ml4 p5 rounded-full"
                            style={{ opacity: opacity }}
                        ></i>
                        <img
                            tabIndex={0}
                            className={loading}
                            src={thumb}
                            alt={heroName}
                            style={{ animationDelay: `${index}00ms` }}
                        />
                        <p className="text-white">{heroName}</p>
                        <legend className="z1 bg-white text-center opacity-0 p4 rounded">
                            Comics available: {comicsAvailable}
                        </legend>
                </figcaption>
            </figure>
        </ul>
    );
};

export default Card;
