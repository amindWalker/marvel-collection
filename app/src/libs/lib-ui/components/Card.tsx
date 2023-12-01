import { Link } from "react-router-dom";

interface CardProps {
    id?: number;
    name?: string;
}

export default function Card({ id, name }: CardProps) {
    return (
        <>
            <div className="card">
                <figure>
                    <img
                        src="#"
                        alt="Character Card"
                    />
                </figure>
                <div>
                    <h2 className="card-title">{name}</h2>
                    <p>Comics available</p>
                    <button className="more-btn">
                        <Link to={`characters/${id}`}>More</Link>
                    </button>
                </div>
            </div>
        </>
    );
}
