import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Switch, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import NavBar from '../../components/navbar/NavBar';
import photo from '../../../assets/pictures/photo3.png'

const { width, height } = Dimensions.get('window');

const AddMembers = ({ navigation }) => {
    const [allDay, setAllDay] = useState(false);

  return (
    <TouchableWithoutFeedback >
      <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Add member</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                <Text style={styles.headerButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.header2}>

                <View style={styles.switchContainer}>
            <View style={styles.selectionButton}>
              <Text style={styles.switchText}>Turn on bluetooth</Text>
            </View>
            <Switch
              value={allDay}
              onValueChange={(value) => setAllDay(value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={allDay ? '#378461' : '#f4f3f4'}
              ios_backgroundColor="#78788029"
              style={styles.switch}
            />
          </View>
          <Text style={styles.subtitle}>Make sure the other person have join nearby circles enabled on circle section</Text>
        
          <View style={styles.photoContainer}>
            {[...Array(8)].map((_, index) => {
              const radius = 8 + index * 45;
              return (
                <Svg height={radius * 2} width={radius * 2} style={styles.dottedCircle} key={index}>
                  <Circle cx={radius} cy={radius} r={radius - 20} stroke="#49A078" strokeWidth="1" strokeDasharray="5" fill="none" />
                </Svg>
              );
            })}
            <Image source={photo} style={styles.photo} />
          </View>
          </View>

      <NavBar />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    backgroundColor: '#F6F6F6',
  },
  header: {paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  header2: {
    backgroundColor: '#F6F6F6',
    borderTopWidth: 0.5,
    flex: 1,
  },
  title: {
    color: '#2D2D2D',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#2D2D2D',
    fontSize: 18,
    backgroundColor: 'white',
    padding: 16,
    width: '90%',
    marginLeft: '5%',
    borderRadius: 10,
    zIndex: 10
},
  headerButtons: {
    flexDirection: 'row',
  },
  selectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  headerButton: {
    marginLeft: 12,
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
  },
  headerButtonText: {
    color: '#646464',
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  switchText: {
    fontSize: 16,
    color: '#2D2D2D',
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  row: {
    flexDirection: 'row',
    margin: 16
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 'auto',
  },
  photoContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height - 200,
    marginTop: -60
  },
  dottedCircle: {
    position: 'absolute',
  },
});

export default AddMembers;