import placeholder from '../assets/notfound.png'

const MovieCard = ({ mainClass, imageClass, title, onCardClick, posterImage }) => {
  return (
    <div className={mainClass} onClick={onCardClick}>
      <img
        src={(posterImage && posterImage !== 'N/A') ? posterImage : placeholder}
        className={imageClass}
      />
      <h1>
        {title}
      </h1>
    </div>
  )
}

export default MovieCard
