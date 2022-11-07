//Core
import { Component } from 'react';

//Services
import MarvelService from '../../services/MarvelService';

//Styles
import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';


class CharList extends Component {

    state = {
        list: [],
    };

    marvelService = new MarvelService();

    onCharListLoaded = (charList) => {
        this.setState({
            list: charList
        })
    };

    updateList = () => {
        this.marvelService.getAllCharacters().then(this.onCharListLoaded)
    };

    componentDidMount() {
        this.updateList()
    };


    render() {

        const fixedImage = (path) => {

            if (path.slice(-17) === 'not_available.jpg') {
                return  <img src={path} style={{objectFit: 'contain'}} alt="super hero" />
            } else {
                return  <img src={path} alt="super hero" />
            } 
        }
    
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.state.list.map(item => (
                        <li
                        className="char__item"
                        key={item.id}
                        onClick={() => this.props.onCharSelected(item.id)}>
                            {fixedImage(item.thumbnail)}
                            <div className="char__name">{item.name}</div>
                        </li>
                    ))}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    };
};


export default CharList;