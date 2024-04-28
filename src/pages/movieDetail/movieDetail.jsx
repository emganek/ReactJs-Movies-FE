import { useEffect } from 'react';
import MovieDetail from '../../modules/movieDetail/movieDetail'
import ShowTime from '../../modules/showTime/showTime'
export default function MovieDetailPage() {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    return (
        <div className="py-5 mt-md-5">
            <div className="container">
                <div className="row">
                    <div id="movie-detail" className="col-12">
                        <MovieDetail />
                    </div>
                    <div id="showtime" className="col-12 mt-4">
                        <ShowTime />
                    </div>
                </div>
            </div>
        </div>
    )
}
