/* eslint-disable react-hooks/exhaustive-deps */
//Core
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

//Service
import useMarvelService from '../../../services/MarvelService';

//Component
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

//Style
import './singleComicPage.scss';

const SingleComicPage = () => {

    const { comicId } = useParams();
    const [comic, setComic] = useState();
    const { loading, error, getComic, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);



    const updateComic = () => {

        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    };

    const onComicLoaded = (comic) => {
        setComic(comic);
        console.log(comic)
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ comic }) => {
    const { title, description, price, thumbnail, pageCount, language } = comic;

    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                    <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComicPage;