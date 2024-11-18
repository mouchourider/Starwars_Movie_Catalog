import axios from "axios";
import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import DataList from "./DataList";

function MovieCard({ movie }) {
  return (
    <div className={`bg-gray-800 p-4 rounded-lg shadow-lg`}>
      <h2 className="text-xl font-bold">{movie.title}</h2>
      <p className="text-sm text-gray-400">
        Release Date: {movie.release_date}
      </p>
      <p className="text-sm mt-2">{movie.opening_crawl.slice(0, 100)}...</p>
      <p className="text-sm text-gray-400 mt-2">Director: {movie.director}</p>
      <p className="text-sm text-gray-400">Producer: {movie.producer}</p>
      <DataList
        dataName="Characters"
        dataUrls={movie.characters}
        keysToShow={[
          "name",
          "height",
          "hair_color",
          "skin_color",
          "eye_color",
          "birth_year",
        ]}
      />
      <DataList
        dataName="Starships"
        dataUrls={movie.starships}
        keysToShow={[
          "name",
          "model",
          "manufacturer",
          "hyperdrive_rating",
          "starship_class",
          "crew",
        ]}
      />
      <DataList
        dataName="Vehicles"
        dataUrls={movie.vehicles}
        keysToShow={[
          "name",
          "model",
          "manufacturer",
          "max_atmosphering_speed",
          "crew",
        ]}
      />
      <DataList
        dataName="Species"
        dataUrls={movie.species}
        keysToShow={[
          "name",
          "language",
          "air_colors",
          "max_atmosphering_speed",
          "eye_colors",
          "average_lifespan",
          "average_height",
        ]}
      />
    </div>
  );
}

export default MovieCard;
