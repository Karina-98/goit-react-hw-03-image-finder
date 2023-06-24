import { Component } from "react"
import { ImageGalleryIMG, ImageGalleryLi } from "./ImageGalleryItem.styled"
import { ModalIMG } from "components/Modal/Modal";
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {

    state = {
        showModal: false,
    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({
          showModal: !showModal, 
        }));
      };

    render (){
   const {img} = this.props;
   const {showModal} = this.state;
    return  <ImageGalleryLi><ImageGalleryIMG src={img.webformatURL} alt={img.tags} onClick={this.toggleModal}/>
    {showModal && <ModalIMG  largeImageURL={img.largeImageURL} tag={img.tags} onClose={this.toggleModal}/>}
    </ImageGalleryLi>}
}

ImageGalleryItem.propTypes = {
    img: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  };