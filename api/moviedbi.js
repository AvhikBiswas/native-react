// import axios  from "axios";
import axios from "axios";
import { API_KEY } from "../Constans/Constans";

// endpoints
const api_base="https://api.themoviedb.org/3/";

export const trendingEndpoint = `${api_base}/trending/movie/day?api_key=${API_KEY}`;
export const topratedEndpoint=`${api_base}/movie/top_rated?api_key=${API_KEY}`;
export const upcomingEndpoint=`${api_base}/movie/upcoming?api_key=${API_KEY}`;
export const searchMoviesEndpoint = `${api_base}/search/movie?api_key=${API_KEY}`;
// 'https://api.themoviedb.org/3/search/movie?
// endpoints with dynamic params

// movie
export const movieDetailsEndpoint = (id)=> `${api_base}/movie/${id}?api_key=${API_KEY}`;
export const movieCreditsEndpoint = id=> `${api_base}/movie/${id}/credits?api_key=${API_KEY}`;
export const similarMoviesEndpoint = id=> `${api_base}/movie/${id}/similar?api_key=${API_KEY}`;

// person

export const personDetailsEndpoint = (id)=> `${api_base}/person/${id}?api_key=${API_KEY}`;
export const personMoviesEndpoint = id=> `${api_base}/person/${id}/movie_credits?api_key=${API_KEY}`;

export const image500 = path=>path? `https://image.tmdb.org/t/p/w500/${path}`: null;
export const image342 = path=>path? `https://image.tmdb.org/t/p/w342/${path}`: null;
export const image185 = path=>path? `https://image.tmdb.org/t/p/w185/${path}`: null;

export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';




const apiCall = async (endpoint, params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    };

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return {};
    }
}

// search screen apis
export const searchMovies = (params)=>{
    return apiCall(searchMoviesEndpoint, params);
}