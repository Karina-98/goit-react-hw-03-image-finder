import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getIMG } from './getIMG/getIMG';
import { Loader } from './Loader/Loader';
import { ErrorCard } from './Error/Error';
import { ButtonLoardMore } from './LoadMore/LoadMore.styled';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    textContext: '',
    imgs: [],
    status: STATUS.IDLE,
    error: null,
    currentPage: 1,
    totalPage: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.textContext !== this.state.textContext ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.setState({ status: STATUS.PENDING });
      getIMG(
        this.state.textContext,
        this.state.currentPage,
        this.state.totalPage
      )
        .then(response => {
          if (!response.ok) {
            throw new Error(' ERROR! Smth went wrong! ');
          } else return response.json();
        })
        .then(imgs => {
          if (imgs.hits.length === 0) {
            throw new Error('No matches found');
          } else
            this.setState({
              imgs: [...this.state.imgs, ...imgs.hits],
              status: STATUS.RESOLVED,
              totalPage: Math.ceil(imgs.totalHits / 12),
            });
        })
        .catch(error => {
          this.setState({ error: error.message, status: STATUS.REJECTED });
        })
        .finally(() => this.setState({}));
    }
  }

  handelTextContext = textContext => {
    this.setState({ textContext, imgs: [], currentPage: 1 });
  };

  handleLoardMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    const { imgs, error, status, currentPage, totalPage, textContext } =
      this.state;
    const loading = status === STATUS.PENDING;
    const buttonSeeLoardMore =
      imgs.length > 0 && currentPage !== totalPage && !loading;

    return (
      <>
        <Searchbar handelTextContext={this.handelTextContext} />

        {status === STATUS.PENDING && <Loader />}

        {status === STATUS.RESOLVED &&   (
          <ImageGallery textContext={textContext} imgs={imgs} />
        ) }

        {buttonSeeLoardMore && (
          <ButtonLoardMore
            type="button"
            disabled={status === STATUS.PENDING ? true : false}
            onClick={this.handleLoardMore}
          >
            {status === STATUS.PENDING ? 'Loading...' : 'Loard More'}
          </ButtonLoardMore>
        )}

        {status === STATUS.REJECTED && <ErrorCard>{error}</ErrorCard>}
      </>
    );
  }
}
