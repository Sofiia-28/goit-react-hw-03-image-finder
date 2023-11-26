import './styles.css'
import { Component } from 'react';
import { SearchBar } from './SearchBar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
// import { Modal } from './Modal';
import Notiflix from 'notiflix';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39834161-b44ad9889b268d198aeea1a60';

export class App extends Component {
  state = {
    images: {},
    query: '',
    page: 1,
    isLoading: false,
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
    const fetchPictures = async () => {
      const params = new URLSearchParams({
        key: API_KEY,
        q: this.state.query.split(' ').slice(1).join(" "),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.state.page,
        per_page: 12,
      });
      const { data } = await axios.get(`?${params}`);
    return data;
    };
    try {
      this.setState({ isLoading: true, error: false });
      const initialSearch = await fetchPictures();
      this.setState({ images: initialSearch });
    } catch (error) {
      Notiflix.Notify.failure('Oops, something went wrong, try reloading the page');
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }}
  }

  handleSubmit = newQuery => {
    this.setState({
        query: `${Date.now()} ${newQuery}`,
        page: 1,
        images: [],
    });
  };

  handleLoadMore = () => {
    window.scrollTo(0,0);
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const {images, isLoading} = this.state;

    return (
      <div className="app">
        <SearchBar onSubmit={this.handleSubmit} />
        {images.hits?.length > 0 && (
            <>
              <ImageGallery images={images}/>
              <Button nextPage={this.handleLoadMore} />
            </>
          )}
          {isLoading === true && (
            <>
              <Loader />
            </>
          )}
        {/* <Modal /> */}
      </div>
    );
  }
}
