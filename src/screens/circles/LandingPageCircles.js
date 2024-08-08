import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity, Alert } from 'react-native';
import NavBar from '../../components/navbar/NavBar';
import CirclesCard from '../../components/circles/CirclesCard';
import { friendEventData } from './CirclesList';
import axiosInstance from '../../config/AxiosInstance';

const LandingPageCircles = ({ navigation }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [circles, setCircles] = useState(friendEventData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCircles = async () => {
      try {
        const response = await axiosInstance.get('/circles/joined-circles');

        if (response.status === 202) {
          console.log("circles")
          console.log("circles", response.data)
          const circleData = { ...response.data, tags: JSON.parse(response.data.tags || "[]") };
          setCircles((prevCircles) => [...prevCircles, circleData]);
        } else {
          console.warn('Failed to fetch circles');
        }
      } catch (error) {
        console.error('Error fetching circles:', error);
        setError('Failed to fetch circles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCircles();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.friendsContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Your Circles</Text>
          </View>
          <Text style={styles.subtitle}>{circles.length}/10</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={isSwitchOn ? styles.textSelectActive : styles.textSelect}>
            {isSwitchOn ? "Waiting Invitation" : "Join a Nearby Circle"}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#34C759" }}
            thumbColor={"white"}
            ios_backgroundColor="gray"
            onValueChange={() => setIsSwitchOn(previousState => !previousState)}
            value={isSwitchOn}
          />
        </View>
        <FlatList
          data={circles}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          renderItem={({ item }) => (
            <CirclesCard
              id={item.id}
              photo={item.photo}
              name={item.name}
              image={item.image}
              eventTitle={item.name}
              style={styles.eventCard}
              tags={item.tags || []}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => <View style={styles.bottom}></View>}
        />
        <View style={styles.bottom}></View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateCircle')}>
        <Text style={styles.textAdd}>Create circle</Text>
      </TouchableOpacity>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  },
  friendsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'start',
    padding: 16,
    paddingBottom: 0,
    paddingTop: 66,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 16,
    borderRadius: 20,
    paddingHorizontal: 16
  },
  subtitle: {
    color: '#BABBBA',
    fontSize: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  searchBar: {
    width: '100%',
    backgroundColor: '#7676801F',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  selectButton: {
    backgroundColor: '#E7E7E8',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 40,
  },
  textSelect: {
    color: '#2d2d2d',
    fontSize: 16,
  },
  textSelectActive: {
    color: '#378461',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 111,
    right: 16,
    backgroundColor: '#378461',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 40,
  },
  textAdd: {
    color: '#FFFFFF',
  },
  separator: {
    height: 16,
  },
  bottom: {
    padding: 50,
  }
});

export default LandingPageCircles;