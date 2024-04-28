import React, { useRef, useState } from 'react'
import Carousel from '../../modules/carousel/carousel'
import MovieList from '../../modules/movieList/movieList'

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <MovieList />
    </div>
  )
}
