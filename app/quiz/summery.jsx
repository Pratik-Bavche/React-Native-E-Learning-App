import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constant/Colors';
import Button from '../../components/Shared/Button';

export default function QuizSummery() {
    const { quizResultParam } = useLocalSearchParams();
    const quizResult = JSON.parse(quizResultParam)
    const [correctAns, setCorrectAns] = useState(0);
    const [totalQuestion, setTotalQuestion] = useState(0);
    const router=useRouter();

    useEffect(() => {
        CalculateResult();
    }, [quizResult])

    const CalculateResult = () => {
        if (quizResult !== undefined) {
            const correctAns = Object.entries(quizResult)?.filter(([key, value]) => value?.isCorrect == true)
            const totalQ = Object.keys(quizResult).length;
            setCorrectAns(correctAns.length);
            setTotalQuestion(totalQ)
        }
    }

    const getPerc = () => {
        if (totalQuestion === 0) return 0;
        return ((correctAns / totalQuestion) * 100).toFixed(0);
    }

    return (
        <FlatList 
        data={[]}
        ListHeaderComponent={
        <View>
            <Image source={require('./../../assets/images/wave.png')} style={{
                width: '100%',
                height: 700
            }} />

            <View style={{
                position: 'absolute',
                width: '100%',
                padding: 35
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: 'outfit-bold',
                    fontSize: 30,
                    color: Colors.WHITE
                }}>Quiz Summery</Text>

                <View style={{
                    backgroundColor: Colors.WHITE,
                    padding: 20,
                    borderRadius: 20,
                    marginTop: 55,
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Image source={require('./../../assets/images/trophy.png')} style={{
                        width: 100,
                        height: 100,
                        marginTop: -60
                    }} />
                    <Text style={{
                        fontSize: 26,
                        fontFamily: 'outfit-bold',
                    }}>{getPerc() > 50 ? 'Congratulations!' : 'Try Again!'}</Text>
                    <Text style={{
                        fontFamily:'outfit',
                        color:Colors.GRAY,
                        fontSize:18
                    }}>You gave {getPerc()}% Correct Ans</Text>

                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:10,gap:30}}>
                        <View style={styles.resultTextContainer}>
                            <Text style={
                                styles.resultText
                            }>Q{totalQuestion}</Text>
                        </View>
                         <View style={styles.resultTextContainer}>
                            <Text style={
                                styles.resultText
                            }>✅{correctAns}</Text>
                        </View>
                         <View style={styles.resultTextContainer}>
                            <Text style={
                                styles.resultText
                            }>❌{totalQuestion-correctAns}</Text>
                        </View>
                    </View>
                </View>
                    <Button text={'Back To Home'} onPress={()=>router.replace('/(tabs)/home')}/>
                    <View style={{
                        marginTop:25,
                        flex:1
                    }}> 
                    <Text style={{
                        fontFamily:'outfit-bold',
                        fontSize:25
                    }}>Summery</Text>
                        <FlatList>
                        data={Object.entries(quizResult)}
                        renderItem={({item,index})=>{
                            const quizItem=item[1];
                            return(
                            <View style={{
                                padding:15,
                                borderWidth:1,
                                marginTop:5,
                                borderRadius:15,
                                backgroundColor:quizItem?.isCorrect==true?'lighhtgreen':'lightred',
                                borderColor:quizItem?.isCorrect==true?'green':'red',
                            }}>
                                <Text style={{
                                    fontFamily:'outfit',
                                    fontSize:20
                                }}>{quizItem.question}</Text>
                                <Text style={{
                                    fontFamily:'outfit',
                                    fontSize:15
                                }}>Ans: {quizItem?.correctAns}</Text>
                            </View>
                            )
                        }}
                    </FlatList>
                    </View>
            </View>
        </View>
        }/>
    )
}

const styles = StyleSheet.create({
    resultTextContainer:{
        padding:15,
        backgroundColor:Colors.WHITE,
        elevation:1
    },
    resultText:{
        fontFamily:'outfit',
        fontSize:20
    }
})