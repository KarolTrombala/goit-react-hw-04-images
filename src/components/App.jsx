import { useState } from 'react'
import { Searchbar } from './SearchBar/SearchBar'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Modal, useModal } from './Modal/Modal'

export const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { selectedImage, isModalOpen, openModal, closeModal } = useModal();
    
    const handleSearch = quer => {
        setSearchQuery(query);
    };

    return (
        <div>
            <Searchbar onSubmit={handleSearch} />
            <ImageGallery searchQuery={searchQuery} onImageClick={openModal} />
            {isModalOpen && (
                <Modal
                    largeImageURL={selectedImage.largeImageURL}
                    tags={selectedImage.tags}
                    onClick={closeModal}
                />
            )}
        </div>
    )
}    



