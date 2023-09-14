import { View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import TrendingMoovies from "../Components/TrendingMoovies";
import MovieList from "../Components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Components/Loading";
import { fetchTrending, topratedEndpoint, upcomingEndpoint } from "../api/moviedbi";
import { trendingEndpoint } from "../api/moviedbi";


const ios = Platform.OS == 'ios';
export default function Home() {
    let navigation = useNavigation();
    const [topRated, setTopRated] = useState([]);
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(()=>{
       
        getTrendingMovies();
        getTopratedMovies();
        getUpcomingMOvies();
    },[]);

    // const getTrendingMovies = async ()=>{
    //     const data = await fetchTrending();
    //     console.log('got trending :', data)
    //   }
    const getTrendingMovies = async () => {
        try {
          let response = await fetch(trendingEndpoint);
          let json = await response.json();
        //   console.log("TRENING:",json);
          if(json && json.results) setTrending(json.results);
          setIsLoading(false);
          return json;

        } catch (error) {
           console.error(error);
        }
      };

      const getUpcomingMOvies = async () => {
        try {
          let response = await fetch(upcomingEndpoint);
          let json = await response.json();
        //   console.log("UPCOMMING :",json);
          if(json && json.results) setUpcoming(json.results);
          return json;

        } catch (error) {
           console.error(error);
        }
      };

      const getTopratedMovies = async () => {
        try {
          let response = await fetch(topratedEndpoint);
          let json = await response.json();
        //   console.log("TOPRATED :",json);
          if(json && json.results)  setTopRated(json.results);
          return json;

        } catch (error) {
           console.error(error);
        }
      };
    return (
        <View className="flex-1 bg-neutral-800" >
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <StatusBar style="light" />
                <View className="flex-row items-center mx-4 justify-between">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text className="text-white text-3xl font-semibold">
                        <Text className="text-red-400">M</Text>ovies
                    </Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon onPress={() => navigation.navigate('Search')} size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}   /* trending moovie corosil*/
                    >
                        {
                          trending.length>0 &&  <TrendingMoovies data={trending} />
                        }
                        <MovieList title="Upcoming" data={upcoming} />
                        <MovieList title="Top Rated" data={topRated} />
                    </ScrollView>
                )
            }

        </View>

    )
}