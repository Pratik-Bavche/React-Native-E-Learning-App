import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { PraticeOption } from '../../constant/Option'
import Colors from '../../constant/Colors'
import {useRouter} from 'expo-router'
export default class PracticeSection extends Component {
  render() {
    const router=useRouter();
    return (
      <View style={{marginTop:10}}>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:25
        }}>Practice</Text>


        <View>
          <FlatList data={PraticeOption}
          numColumns={3}
            renderItem={({item,index})=>(   

              <TouchableOpacity onPress={()=>router.push('/practice/'+item.name)} key={index} style={{margin:5,flex:1,aspectRatio:1}}>
                 <Image source={item?.image} style={{
                  width:'100%',
                  height:'100%',
                  borderRadius:15,
                 }}/>

                  <Text style={{
                      position:'absolute',
                      padding:15,
                      fontFamily:'outfit',
                      fontSize:16,
                      color:Colors.WHITE,
                  }}>
                    {item?.name}
                  </Text>

              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    )
  }
}