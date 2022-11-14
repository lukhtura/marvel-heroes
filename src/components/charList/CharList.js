/* eslint-disable react-hooks/exhaustive-deps */
//Core
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'

//Components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

//Services
import useMarvelService from '../../services/MarvelService';

//Styles
import './charList.scss';

const CharList = (props) => {

    const { loading, error, getAllCharacters } = useMarvelService();
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);


    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) :  setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
    };


    const onCharListLoaded = (newCharList) => {

        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    };

    const itemsRefs = useRef([]);

    const focusOnItem = (id) => {
        itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRefs.current[id].classList.add('char__item_selected');
        itemsRefs.current[id].focus();
    };


    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                || item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
                imgStyle = { 'objectFit': 'unset' };
            };

            return (
                <li
                    ref={el => itemsRefs.current[i] = el}
                    tabIndex='1'
                    className="char__item"
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        focusOnItem(i)
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });


        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    };

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
}

export default CharList;