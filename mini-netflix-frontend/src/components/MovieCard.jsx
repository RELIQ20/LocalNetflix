import placeholder from '../assets/notfound.png'

const MovieCard = ({ mainClass, imageClass, title, onCardClick, image }) => {
  return (
    <div className={mainClass} onClick={onCardClick}>
      <img
        src={placeholder}
        className={imageClass}
      />
      <h1>
        {title}
      </h1>
    </div>
  )
}

export default MovieCard
