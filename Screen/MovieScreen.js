import { Dimensions, Image, ScrollView, TouchableOpacity, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../Components/Cast.js';
import MovieList from '../Components/MovieList.js';
import Loading from '../Components/Loading.js';
import { fallbackMoviePoster, image500, movieCreditsEndpoint, movieDetailsEndpoint, similarMoviesEndpoint } from '../api/moviedbi.js';

const { width, height } = Dimensions.get("window");


export default function MovieScreen() {
  const { params: item } = useRoute();
  const [isloading, setIsLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [similer, setSimiler] = useState([]);

  const [movieS, setMovieS] = useState({});



  let navigation = useNavigation();

  const [isFavrate, toggleFavrate] = useState(false);

  useEffect(() => {
    //movie detail api calling
    getMovieDetials(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
    // console.log("ID",item.id);

  }, [item])

  const getMovieDetials = async (id) => {
    try {
      const similarResponse = await fetch(movieDetailsEndpoint(id));
      const similarData = await similarResponse.json();
      if (similarData) setMovieS(similarData);
      setIsLoading(false)
      return similarData;
    } catch (error) {
      console.error('Error fetchingMovieDetails movies:', error);
    }
  };

const getSimilarMovies = async (id) => {
  try {
    const similarResponse = await fetch(similarMoviesEndpoint(id));
    const similarData = await similarResponse.json();

    // console.log("SIMILAR DATA:", similarData);

    if (similarData && similarData.results) {
      setSimiler(similarData.results);
    }

  } catch (error) {
    console.error('Error fetching similar movies:', error);
  }
};


  const getMovieCredits = async (id) => {
    try {
      const Response = await fetch(movieCreditsEndpoint(id));
      const Data = await Response.json();

      setCast(Data.cast)
      // console.log("data :",Data);
      return Data.cast;
    } catch (error) {
      console.error('Error getMoviecredits movies:', error);
    }
  };


  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900">

      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 mt-3">
          <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl p-1 bg-red-500 ">
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-xl p-1 " onPress={() => toggleFavrate(!isFavrate)}>
            <HeartIcon size={35} color={isFavrate ? "red" : "white"} />
          </TouchableOpacity>

        </SafeAreaView>

        {
          isloading ? (
            <Loading />
          ) : (
            <View>
              <Image
                // source={require("../assets/quantum.jpeg")}
                source={{ uri: image500(movieS?.poster_path)}}
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                style={{ width, height: height * 0.40 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className=" absolute bottom-0"
              />
            </View>
          )

        }


      </View>
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wide">{
          movieS?.title
        }
        </Text>
        <Text className="text-neutral-400 font-semibold text-base text-center">
          {movieS?.status} • {movieS?.release_date?.split('-')[0] || 'N/A'} • {movieS?.runtime} min
        </Text>
        <View className="flex-row justify-center mx-4 space-x-2">
          {

            movieS?.genres?.map((genres, index) => {
              let showDot = index + 1 != movieS.genres.length;
              return (
                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                  {genres?.name} {showDot ? "•" : null}
                </Text>
              )

            })

          }
          {/* Description */}



        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {
            movieS?.overview

          }
        </Text>
      </View>
    { cast.length>0 ? <Cast navigation={navigation} cast={cast} /> : <Loading/>}
      {/* similer movies */}
     { similer.length>0? <MovieList hideSeeAll={true} title="Similer Movies" data={similer}  /> : null}
    </ScrollView>

  )

}
