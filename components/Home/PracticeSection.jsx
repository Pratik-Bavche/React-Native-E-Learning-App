import { FlatList, Image, Text, View } from 'react-native'
import React, { Component } from 'react'
import { PraticeOption } from '../../constant/Option'
import Colors from '../../constant/Colors'

export default class PracticeSection extends Component {
  render() {
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
              <View key={index} style={{margin:5,flex:1,aspectRatio:1}}>
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

              </View>
            )}
          />
        </View>
      </View>
    )
  }
}