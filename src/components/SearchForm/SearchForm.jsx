import css from './SearchForm.module.css'
import PropTypes from 'prop-types'
import { useState } from 'react';

export const SearchForm = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = e => {
        e.preventDefault()
        const subQuery = query.trim();
        if (subQuery) {
            onSubmit(subQuery)
        }
        setQuery('');
    };

    const inputChange = e => {
        setQuery(e.target.value);
    };

    return (
        <form className={css.searchform} onSubmit={handleSubmit}>
            <button type="submit" className={css.searchform__button}>
                <span className={css.searchform__label}>Search</span>
            </button>

            <input
                name="search"
                className={css.searchform__input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={query}
                onChange={inputChange}
            />
        </form>
    )
}

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
