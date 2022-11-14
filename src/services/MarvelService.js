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
    }

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
            comics: char.comics.items
        };
    };

    const _transformComics = (item) => {
        return {
            // id: item.id,
            title: item.title,
            price: item.prices[0].price === 0 ? 'not available' : item.prices[0].price,
            thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension, 
            url: item.urls[0].url
        };
    };

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics}
};

export default useMarvelService;