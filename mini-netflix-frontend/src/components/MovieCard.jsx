import placeholder from '../assets/notfound.png'

const MovieCard = ({ mainClass, imageClass, title, onCardClick, image }) => {
  return (
    <div className={mainClass}>
      <img
        src={image ? image : placeholder}
        className={imageClass}
      />
      <h1 onClick={onCardClick}>
        {title}
      </h1>
    </div>
  )
}

export default MovieCard
