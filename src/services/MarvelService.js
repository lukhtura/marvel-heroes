import { useHttp } from './../hooks/http.hook';


const useMarvelService = () => {
    
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d0199fee7225209f60b0c56942eb3de0';
    const _baseOffset = 210;



    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?limit=9&offset=210&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    };

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?limit=8&offset=210&${_apiKey}`);
        return _transformComics(res.data.results[0])
    };

    const _transformCharacter = (char) => {

        let transformedDescription;

        if (char.description.length > 1 && char.description.length <= 226) {
            transformedDescription = char.description
        } else if (char.description.length > 226) {
            transformedDescription = char.description.slice(0, 226) + '...';
        } else {
            transformedDescription = 'Oops.. there is no data :(';
        };

        return {
            id: char.id,
            name: char.name,
            description: transformedDescription,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension, 
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        };
    };

    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description ? comic.description : 'Oops.. there is no data :(' ,
            pageCount: comic.pageCount ? `${comic.pageCount} p.` : 'No information about the number of pages',
            price: comic.prices[0].price === 0 ? 'not available' : '$' + comic.prices[0].price,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension, 
            language: comic.textObjects[1] ? comic.textObjects[1] : 'en-us'
        };
    };

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic}
};

export default useMarvelService;