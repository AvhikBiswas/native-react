import { View, Text, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import MovieList from '../Components/MovieList';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fallbackPersonImage, image342, personDetailsEndpoint, personMoviesEndpoint } from '../api/moviedbi';
var { width, height } = Dimensions.get("window");


export default function PersonScreen() {
   
    const { params: item } = useRoute();
    let navigation = useNavigation();
    const [isFavrate, toggleFavrate] = useState(false);
    const [personMovies,setPersonMovies]=useState([]);
    const [person,setPerson]=useState({});

    useEffect(()=>{
    getPerson(item.id);
    getPersonMovies(item.id);
    console.log("item :",item.id);
    
    },[item])


    const getPerson = async id => {
        try {
          const similarResponse = await fetch(personDetailsEndpoint(id));
          const Data = await similarResponse.json();
          if(Data){
            setPerson(Data);
          }
          
          console.log(Data);
          return Data;
        } catch (error) {
          console.error('Error PersonMovieDetails :', error);
        }
      };
      const getPersonMovies = async id => {
        try {
          const similarResponse = await fetch(personMoviesEndpoint(id));
          const Data = await similarResponse.json();
          if(Data && Data.cast ){
            setPersonMovies(Data.cast);
          }
          
          console.log(Data);
          return Data;
        } catch (error) {
          console.error('Error PersonMovieDetails :', error);
        }
      };

    return (
        <ScrollView
            className="flex-1 bg-neutral-900 "
            contentContainerStyle={{ paddingBottom: 20 }}

        >
            <SafeAreaView className=" z-20 w-full flex-row justify-between items-center px-4 my-7">
                <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl p-1 bg-red-500 ">
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className="rounded-xl p-1 " onPress={() => toggleFavrate(!isFavrate)}>
                    <HeartIcon size={35} color={isFavrate ? "red" : "white"} />
                </TouchableOpacity>


            </SafeAreaView>

            <View>
                <View className="flex-row justify-center  "

                    style={{
                        shadowColor: 'gray',
                        shadowRadius: 40,
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 1,
                        elevation: 5

                    }} >

                    <View className="items-center rounded-full overflow-hidden h-72 w-72 border-3 border-neutral-500">

                        <Image 
                        
                        // source={require("../assets/antman.jpg")}
                        source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}

                            style={{ height: height * 0.42, width: width * 0.74 }}
                        />

                    </View>

                </View>
                <View className="mt-6">
                    <Text className='text-white text-center text-3xl font-bold'>{person?.name}</Text>

                    <Text className='text-neutral-500 text-center text-base font-bold'>{person?.place_of_birth}</Text>
                </View>
                <View className="mx-3 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full h-16 px-3">
                    <View className="border-r-2 border-r-neutral-400 px-2 items-center ">
                        <Text className="text-white font-semibold">Gender</Text>
                        <Text className="text-neutral-300 text-sm">{person?.gender==1?"Female":"Male"}</Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-400 px-2 items-center ">
                        <Text className="text-white font-semibold">Birthday</Text>
                        <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-400 px-2 items-center ">
                        <Text className="text-white font-semibold">Known For</Text>
                        <Text className="text-neutral-300 text-sm">{person?.known_for_department}</Text>
                    </View>
                    <View className=" border-r-neutral-400 px-2 items-center ">
                        <Text className="text-white font-semibold">Popularity</Text>
                        <Text className="text-neutral-300 text-sm">{person?.popularity?.toFixed(2)}</Text>
                    </View>
                </View>
                <View className="my-6 mx-4 space-y-2">
                    <Text className="text-white text-lg">Biography</Text>
                    <Text className="text-neutral-400 tracking-wide ">
                    {person?.biography || "N/A"}
                    </Text>
                </View>
                <MovieList data={personMovies}  title={"Movies"} hideSeeAll={true}/>
            </View>
        </ScrollView>
    )
}