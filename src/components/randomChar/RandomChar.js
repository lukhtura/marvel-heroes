//Core
import { Component } from 'react';

//Components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

//Services
import MarvelService from '../../services/MarvelService';

//Styles
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        });
    };

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    };

    onTryRandom = () => {
        this.onCharLoading()
        this.updateChar();
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    };

    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }


    render() {

        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={this.onTryRandom}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki } = char;

    let fixedDescr;

    if (description.length > 1 && description.length <= 226) {
        fixedDescr = description;
    } else if (description.length > 226) {
        fixedDescr = description.slice(0, 226) + '...';
    } else {
        fixedDescr = 'Oops.. there is no data :(';
    }

    return (<div className="randomchar__block">
        {/* <img src={thumbnail} alt="Random character" className="randomchar__img" /> */}
        {fixedImage(thumbnail)}
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{fixedDescr}</p>
            <div className="randomchar__btns">
                <a
                    href={homepage}
                    rel='noreferrer'
                    target='_blank'
                    className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a
                    href={wiki}
                    rel='noreferrer'
                    target='_blank'
                    className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>);
};

const fixedImage = (path) => {

    if (path.slice(-17) === 'not_available.jpg') {
        return  <img src={path} style={{objectFit: 'contain'}} className="randomchar__img" alt="super hero" />
    } else {
        return  <img src={path} className="randomchar__img" alt="super hero" />
    } 
}

export default RandomChar;