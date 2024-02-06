import { useState, useRef, useEffect, useCallback } from 'react'
import css from './ImageGallery.module.css'
import PropTypes from 'prop-types'
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import { getImages } from 'services/api'
import { Loader } from 'components/Loader/Loader'
import { Button } from 'components/Button/Button'


export const ImageGallery = ({ searchQuery, onImageClick }) => {
    const listRef = useRef();

    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [noResults, setNoResults] = useState('');


    // pozycja scroll
    const handleScroll = () => {
        const newScrollPosition =
            listRef.current.scrollHeight - listRef.current.scrollTop;
        setScrollPosition(newScrollPosition);
    };

    // pobieranie obrazów
    const fetchImages = useCallback(async () => {
        if (!searchQuery) {
            return;
        };

        setIsLoading(true);
        
        try {
            const response = await getImages(query, page);
            const data = response.data.hits;
            const totalPages = Math.floor(response.data.total / 12);
            if (page === 1) {
                if (data.length === 0) {
                    setImages([]);
                    setNoResults(true);
                } else {
                    setImages([...data]);
                    setNoResults(false);
                    setTotalPages(totalPages);
                    setScrollPosition(0);
                }
            } else {
                // pobieranie obrazów na nowe strony
                setImages(images => [...images, ...data]);
                handleScroll();
            }
        } catch (error) {
            console.log('error');
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, page])

    // button load more handler - page + 1
    const handleLoadMore = () => {
        setPage(page + 1);
    };
    
    // ustawienie page = 1 przy zmianie query
    useEffect(() => {
        setPage(1);
    }, [searchQuery]);

    // efekt dla query i page
    useEffect(() => {
        if (searchQuery) {
            fetchImages();
        }
    }, [fetchImages, page, searchQuery]);

    // efekt dla ładowania nowych obrazków
    useEffect(() => {
        if (images.length !== 0) {
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
            });
        }
    }, [images, scrollPosition]);

    return (
        <div>
            <ul className={css.gallery} ref={listRef}>
                {images.map(({ id, ...rest }) => (
                    <ImageGalleryItem
                        key={id}
                        {...rest}
                        onClick={onImageClick}
                    ></ImageGalleryItem>
                ))}
            </ul>

            {isLoading && <Loader />}

            {noResults && (
                <p className={styles.message}>
                    Sorry, there are no images matching your search query. Please try
                    again.
                </p>
            )}

            {page < totalPages && (
                <Button onClick={handleLoadMore}>Load more</Button>
            )}
        </div>
    );
};

ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    onImageClick: PropTypes.func.isRequired,
};
