import css from './Modal.module.css'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'


export const Modal = ({ largeImageURL, tags, onClick }) => {

    const overlayClick = e => {
        if (e.target === e.currentTarget) {
            onClick();
        }
    };

    return (
        <div className={css.overlay} onClick={overlayClick}>
            <div className={css.modal}>
                <img
                    className={css.image}
                    src={largeImageURL}
                    alt={tags}
                    onClick={overlayClick}
                />
            </div>
        </div>
    )
};

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};


export const useModal = () => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = (image) => {
        setSelectedImage(image)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedImage(null)
        setIsModalOpen(false)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                closeModal()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isModalOpen])

    return { selectedImage, isModalOpen, openModal, closeModal }
}