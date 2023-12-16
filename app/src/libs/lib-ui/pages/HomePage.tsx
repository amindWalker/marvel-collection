import { useEffect } from "react";
import { AppDispatch } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { selectCharacters } from "../../../store/characterSlice";
import { Status } from "../../../types";
import { Outlet } from "react-router-dom";
import { fetchCharactersData } from "../../../services";
import { CharacterList } from "../components";

export default function Home() {
    const dispatch: AppDispatch = useDispatch();
    const { characters, status } = useSelector(selectCharacters);

    useEffect(() => {
        dispatch(fetchCharactersData());
    }, [dispatch]);

    return (
        <div className="base-all">
            <div className="h-80vh overflow-y-scroll">
                <Outlet />
                <h1>CHOOSE YOUR HERO</h1>
                {status == Status.Idle ? (
                    characters.map((char) => {
                        return (
                            <div key={char.id}>
                                <CharacterList
                                    id={char.id}
                                    name={char.name}
                                    comics={char.comics}
                                    thumbnail={char.thumbnail}
                                />
                            </div>
                        );
                    })
                ) : (
                    <i className="i-line-md:loading-twotone-loop bg-red-700 p-8 m-4" />
                )}
            </div>
        </div>
    );
}
