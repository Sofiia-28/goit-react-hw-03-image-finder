import './styles.css';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images: { hits } }) => {
  return (
    <ul className="imageGallery">
      {hits.map(hit => {
        return <ImageGalleryItem key={hit.id} imageData={hit} />;
      })}
    </ul>
  );
};
