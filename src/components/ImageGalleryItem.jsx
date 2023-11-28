import './styles.css';
import { Component } from 'react';
import { MyModal } from './MyModal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };
  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };
  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const {
      imageData: { webformatURL, tags, largeImageURL },
    } = this.props;
    return (
      <div>
        <li onClick={this.openModal} className="imageGalleryItem">
          <img
            className="imageGalleryItem-image"
            src={webformatURL}
            alt={tags}
          />
        </li>
        <MyModal
          largeImage={largeImageURL}
          tags={tags}
          onClose={this.closeModal}
          isOpen={this.state.isModalOpen}
        />
      </div>
    );
  }
}
