import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import NavBar from '../../components/navbar/NavBar';
import Hosting from './Hosting';
import FriendsEvents from './FriendsEvents';
import PublicEvents from './PublicEvents';
import CircleEvents from './CircleEvents';

const LandingPageEvents = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('hosting');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setSelectedTab('hosting')}
          style={[styles.tab, selectedTab === 'hosting' && styles.selectedTab, styles.borderLeftRadius]}
        >
          <Text style={[styles.tabText, selectedTab === 'hosting' && styles.tabTextSelected]}>Hosting</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => setSelectedTab('public')}
          style={[styles.tab, selectedTab === 'public' && styles.selectedTab]}
        >
          <Text style={[styles.tabText, selectedTab === 'public' && styles.tabTextSelected]}>Public</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => setSelectedTab('friends')}
          style={[styles.tab, selectedTab === 'friends' && styles.selectedTab]}
        >
          <Text style={[styles.tabText, selectedTab === 'friends' && styles.tabTextSelected]}>Friends</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => setSelectedTab('circle')}
          style={[styles.tab, selectedTab === 'circle' && styles.selectedTab, styles.borderRightRadius]}
        >
          <Text style={[styles.tabText, selectedTab === 'circle' && styles.tabTextSelected]}>Circle</Text>
        </TouchableOpacity>
      </View>
      {selectedTab === 'hosting' && <Hosting />}
      {selectedTab === 'public' && <PublicEvents />}
      {selectedTab === 'friends' && <FriendsEvents />}
      {selectedTab === 'circle' && <CircleEvents />}
      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateEvent')}>
        <Text style={styles.createText}>Create event</Text>
      </TouchableOpacity>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '92%',
    borderColor: '#646464',
    borderWidth: 1,
    borderRadius: 100,
    overflow: 'hidden',
  },
  title: {
    color: '#2D2D2D',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  selectedTab: {
    backgroundColor: '#378461',
    borderColor: '#0000000A',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  borderLeftRadius: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  borderRightRadius: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  tabText: {
    fontSize: 16,
    color: '#646464'
  },
  tabTextSelected: {
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#8E8E93',
    marginLeft: -1,
    marginRight: -1,
  },
  createButton: {
    backgroundColor: '#378461',
    position: 'absolute',
    bottom: 120,
    right: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50
  },
  createText: {
    color: 'white',
    fontSize: 15
  }
});

export default LandingPageEvents;