/* eslint-disable react-hooks/exhaustive-deps */
//Core
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

//Service
import useMarvelService from '../../services/MarvelService';

//Component
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

//Styles
import './charInfo.scss';

const CharInfo = (props) => {

    const { loading, error, getCharacter, clearError} = useMarvelService();
    const [char, setChar] = useState(null);

    useEffect(() => {
        updateChar();
    }, [props.charId]);



    const updateChar = () => {
        const { charId } = props;

        if (!charId) {
            return;
        };

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    };

    const onCharLoaded = (char) => {
        setChar(char);
    };


    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

};


const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const fixedImage = (path) => {

        if (
            path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ||
            path === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif'
        ) {
            return <img src={path} style={{ objectFit: 'contain' }} alt={name} />
        } else {
            return <img src={path} alt="super hero" />
        }
    }

    return (
        <>
            <div className="char__basics">
                {fixedImage(thumbnail)}
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr"> {description ? description : 'there is no decription :('}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'sorry, there is no data'}
                {comics.slice(0, 10).map((item, i) => {
                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;