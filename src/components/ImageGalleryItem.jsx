import './styles.css';

export const ImageGalleryItem = ({ imageData: { webformatURL, tags } }) => {
  return (
    <li className="imageGalleryItem">
      <img className="imageGalleryItem-image" src={webformatURL} alt={tags} />
    </li>
  );
};
