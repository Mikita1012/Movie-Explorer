import React from 'react'


interface MovieCardProps {
    title: string;
    year: string;
    poster: string;
    onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, year, poster, onClick }) => {
    return (
    <div className='movie-card' onClick={onClick}>
        <img src={poster} alt={title} />
        <h3>{title} ({year})</h3>
    </div>
    )
}

export default MovieCard;