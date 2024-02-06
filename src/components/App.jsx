import { useState } from 'react'
import { Searchbar } from './SearchBar/SearchBar'
import { ImageGallery } from './ImageGallery/ImageGallery'
// import { Modal } from './Modal/Modal'

export const App = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = quer => {
        setSearchQuery(query);
    };

    return (
        <div>
            <Searchbar onSubmit={handleSearch} />
            <ImageGallery searchQuery={searchQuery} />
        </div>
    )
}    



