import { Component } from 'react';
import { Modal, Overlay } from './Modal.styled';

export class ModalIMG extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentDidUpdate() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'visible';
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tag } = this.props;
    return (
      <>
        <Overlay onClick={this.handleBackdropClick}>
          <Modal>
            <img src={largeImageURL} alt={tag} />
          </Modal>
        </Overlay>
      </>
    );
  }
}
