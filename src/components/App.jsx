import React from 'react';
import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { fetchImages } from 'httpRequest/fetch';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPicture, setModalPicture] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    setIsBtnVisible(false);

    const fetchData = async () => {
      const { totalHits, hits } = await fetchImages(query, page);
      try {
        if (totalHits === 0) {
          Notiflix.Notify.info('Nothing was found on your request');
          setIsLoading(false);
          setIsBtnVisible(false);
          return;
        } else if (hits < 12) {
          Notiflix.Notify.info('These are all the images we found');
          setIsBtnVisible(false);
          setIsLoading(false);
          return;
        }
        setImages(prevState => [...prevState, ...hits]);
        setIsLoading(false);
        setIsBtnVisible(true);
      } catch (error) {
        Notiflix.Notify.failure(`Oops! Something went wrong! ${error}`);
      }
    };
    fetchData();
  }, [query, page]);

  const onSubmit = query => {
    if (query.trim() === '') {
      setIsLoading(false);
      setIsBtnVisible(false);
      Notiflix.Notify.info('Fill the search form');
      return;
    }
    setQuery(query);
    setPage(1);
    setImages([]);
  };
  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const modalImg = img => {
    setModalPicture(img);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {images && (
        <ImageGallery
          images={images}
          onEnlargingImage={modalImg}
          onClick={toggleModal}
        />
      )}
      {isBtnVisible && <Button onClick={onLoadMore}>Load more</Button>}
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal onCloseModal={toggleModal} onShowImg={modalPicture} />
      )}
    </>
  );
};
