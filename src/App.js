import React from 'react';
import axios from 'axios';
import Movie from "./Movie";
import "./App.css"

class App extends React.Component{
    state =  {
        isLoading: true,
        movies: [],
    };
    getMovies = async () => {
        //const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
        /** 위 내용을 아래와 같이 바꿀 수 있음 : ES6 */
        const {data: {data : {movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json");
        console.log("get movie data :>>", movies);
        this.setState({movies, isLoading : false}) ;
    }
    componentDidMount() {
        this.getMovies();
    }

    render() {
        const { isLoading, movies } = this.state;
    return (
        <section className={"container"}>
            {isLoading
                ? (
                    <div className={"loader"}>
                        <span className={"loader_text"}>Loading...</span>
                    </div>
                )
                : ( /** html css */
                    <div className={"movies"}>
                        {movies.map(movie => (
                         <Movie
                             key={movie.id}
                             id={movie.id}
                             year={movie.year}
                             title={movie.title}
                             summary={movie.summary}
                             poster={movie.medium_cover_image}
                             genres={movie.genres}
                         />
                         ))}
                    </div>
                )}
        </section>
    )
  }
}


export default App;
