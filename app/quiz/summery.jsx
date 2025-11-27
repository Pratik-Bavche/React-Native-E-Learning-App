import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constant/Colors';
import Button from '../../components/Shared/Button';

export default function QuizSummery() {
    const { quizResultParam } = useLocalSearchParams();
    const router = useRouter();

    let parsedResult = {};
    try {
        parsedResult = quizResultParam ? JSON.parse(quizResultParam) : {};
    } catch (e) {
        console.log('Failed to parse quizResultParam', e);
        parsedResult = {};
    }

    const resultArray = useMemo(() => {
        return Object.entries(parsedResult || {}).map(([key, value], idx) => ({
            id: key,
            index: idx + 1,
            question: value?.question || `Question ${idx + 1}`,
            userChoice: value?.userChoice ?? value?.userAns ?? value?.selectedAnswer ?? '',
            correctAnswer: value?.answer ?? value?.correctAns ?? '',
            isCorrect: !!value?.isCorrect
        }));
    }, [quizResultParam]);

    const totalQuestion = resultArray.length;
    const correctAns = resultArray.filter(r => r.isCorrect).length;
    const wrongAns = totalQuestion - correctAns;

    const getPerc = () => {
        if (totalQuestion === 0) return 0;
        return Math.round((correctAns / totalQuestion) * 100);
    }

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.itemCard, item.isCorrect ? styles.correctCard : styles.wrongCard]}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemIndex}>Q{item.index}</Text>
                    <Text style={[styles.itemStatus, item.isCorrect ? styles.correctText : styles.wrongText]}>
                        {item.isCorrect ? 'Correct' : 'Wrong'}
                    </Text>
                </View>
                <Text style={styles.questionText}>{item.question}</Text>
                <Text style={styles.answerLabel}>Your answer:</Text>
                <Text style={styles.userAnswer}>{item.userChoice || '-'} </Text>
                <Text style={styles.answerLabel}>Correct answer:</Text>
                <Text style={styles.correctAnswer}>{item.correctAnswer || '-'} </Text>
            </View>
        )
    }

    return (
        <FlatList 
        data={[]}
        ListHeaderComponent={
        <View style={styles.container}>
            <Image source={require('./../../assets/images/wave.png')} style={styles.headerImage} />

            <View style={styles.headerOverlay}>
                <Text style={styles.title}>Quiz Summary</Text>

                <View style={styles.summaryBox}>
                    <Image source={require('./../../assets/images/trophy.png')} style={styles.trophy} />
                    <Text style={styles.resultTitle}>{getPerc() > 50 ? 'Congratulations!' : 'Try Again!'}</Text>
                    <Text style={styles.resultSubtitle}>You scored {getPerc()}%</Text>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{totalQuestion}</Text>
                            <Text style={styles.statLabel}>Questions</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>✅ {correctAns}</Text>
                            <Text style={styles.statLabel}>Correct</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>❌ {wrongAns}</Text>
                            <Text style={styles.statLabel}>Wrong</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 12 }}>
                    <Button text={'Back To Home'} onPress={() => router.replace('/(tabs)/home')} />
                </View>

                <View style={styles.resultsListContainer}>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <FlatList
                        data={resultArray}
                        keyExtractor={(item) => item.id?.toString() ?? item.index.toString()}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 120 }}
                    />
                </View>
            </View>
        </View>
        }/>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.BG_GRAY },
    headerImage: { width: '100%', height: 260, resizeMode: 'cover' },
    headerOverlay: { position: 'absolute', top: 20, left: 0, right: 0, padding: 20 },
    title: { textAlign: 'center', fontFamily: 'outfit-bold', fontSize: 28, color: Colors.WHITE },
    summaryBox: { backgroundColor: Colors.WHITE, padding: 18, borderRadius: 14, marginTop: 24, alignItems: 'center', elevation: 3 },
    trophy: { width: 80, height: 80, marginTop: -50 },
    resultTitle: { fontSize: 22, fontFamily: 'outfit-bold', marginTop: 6 },
    resultSubtitle: { fontFamily: 'outfit', color: Colors.GRAY, fontSize: 16, marginTop: 4 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, width: '100%' },
    statItem: { flex: 1, alignItems: 'center' },
    statNumber: { fontFamily: 'outfit-bold', fontSize: 18 },
    statLabel: { fontFamily: 'outfit', color: Colors.GRAY, fontSize: 12 },

    resultsListContainer: { marginTop: 18 },
    sectionTitle: { fontFamily: 'outfit-bold', fontSize: 20, marginBottom: 8 },

    itemCard: { padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#ddd' },
    itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    itemIndex: { fontFamily: 'outfit-bold' },
    itemStatus: { fontFamily: 'outfit-bold' },
    questionText: { fontFamily: 'outfit', fontSize: 16, marginBottom: 8 },
    answerLabel: { fontFamily: 'outfit', color: Colors.GRAY, fontSize: 12 },
    userAnswer: { fontFamily: 'outfit', fontSize: 15, marginBottom: 6 },
    correctAnswer: { fontFamily: 'outfit-bold', fontSize: 15 },

    correctCard: { backgroundColor: '#e6fbf0', borderColor: '#2ecc71' },
    wrongCard: { backgroundColor: '#fff0f0', borderColor: '#e74c3c' },
    correctText: { color: '#2ecc71' },
    wrongText: { color: '#e74c3c' }
})