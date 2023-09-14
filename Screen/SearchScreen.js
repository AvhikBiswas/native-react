import { View, Text, SafeAreaView, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { Navigation } from 'react-native-feather';
import { debounce } from 'lodash';
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedbi';
const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
    let movieName = "Ant Man Qantummaniya Wsp";
    const [result, setResult] = useState([]);
    const navigateion = useNavigation();



    const handleInput = search=>{
        if(search && search.length>2){
            // setLoading(true);
            searchMovies({
                query: search,
                include_adult: false,
                language: 'en-US',
                page: '1'
            }).then(data=>{
                console.log('got search results ');
                if(data && data.results) setResult(data.results);
            })
        }else{
            // setLoading(false);
            setResult([])
        }
      }



    // const options = {
    //     method: 'GET',
    //     headers: {
    //         Authorization: API_KEY
    //     }
    // };
    // const handleInput = async (options) => {
    //     fetch('https://api.themoviedb.org/3/search/movie?query=hulk&include_adult=false&language=en-US&page=1', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    // };

    //   fetch('https://api.themoviedb.org/3/search/movie?query=hulk&include_adult=false&language=en-US&page=1', options)
    //   .then(response => response.json())
    //   .then(response => console.log(response))
    //   .catch(err => console.error(err));



    // useEffect(()=>{


    // },[])
    const handaleText = useCallback(debounce(handleInput, 400), []);

    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full my-7">
                <TextInput placeholder='Search Movie'
                    onChangeText={handaleText}
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider" />
                <TouchableOpacity
                    onPress={() => navigateion.navigate('Home')}
                    className="rounded-full p-3 m-1 bg-neutral-500">
                    <XMarkIcon size="25" color="white" />
                </TouchableOpacity>
            </View>
            {
                result.length > 0 ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    className="space-y-3">
                    <Text className="text-white font-semibold ml-1">Result({result.length})</Text>
                    <View className="flex-row justify-between flex-wrap">
                        {
                            result.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => navigateion.push('Movie', item)}
                                    >
                                        <View className="space-y-2 mb-4 ">
                                            <Image className="rounded-3xl"
                                                // source={require("../assets/shutter.jpg")}
                                                source={{uri: image185(item.poster_path) || fallbackMoviePoster}} 
                                                style={{ height: height * 0.3, width: width * 0.44 }} />
                                            <Text className="text-neutral-400 ml-1 ">
                                                {
                                                   item.title.length>17? item.title.slice(0,17)+'...': item.title
                                                }
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )

                            })
                        }

                    </View>
                </ScrollView>

                ) : (
                    <View className="flex-row justify-center">
                        <Image className="w-96 h-96"
                            source={require("../assets/movieTime.png")}
                            style={{ width, height: height * 0.55 }}
                        />
                    </View>
                )
            }

        </SafeAreaView>
    )
}