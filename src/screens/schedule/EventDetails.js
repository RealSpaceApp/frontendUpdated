import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import NavBar from '../../components/navbar/NavBar';
import { SvgXml } from 'react-native-svg';
import Arrow from '../../../assets/onboarding/Arrow';
import Clock from '../../../assets/events/Clock';
import photo from  '../../../assets/pictures/photo6.png';
import image from  '../../../assets/pictures/eventImage1.jpg';
import Tags from  '../../components/events/cards/Tags';
import { useNavigation } from '@react-navigation/native';
import Location from '../../../assets/events/Location';

const EventDetails = ({ route }) => {
  const { name, eventTitle, time, text, location, creator } = route.params;
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header}  onPress={() => navigation.goBack()}>
        <SvgXml xml={Arrow} style={styles.arrow} />
        <Text style={styles.title}>{eventTitle}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.container2}>
            
        <View>
        <View style={styles.header2}>
          {photo && <Image source={photo} style={styles.photo} />}
          {name && <Text style={styles.name}>{name}</Text>}
        </View>
        {eventTitle && <Text style={styles.title}>{eventTitle}</Text>}
        {time && (
          <View style={styles.timeContainer}>
            <View style={styles.timeContent}>
              <SvgXml xml={Clock} style={styles.clock} />
              <Text style={styles.timeText}>{time}</Text>
            </View>
          </View>
        )}
      </View>
      <View>
        <View style={styles.expandedText}>
          {location && (
            <View style={styles.timeContent}>
              <SvgXml xml={Location} style={styles.clock} />
              <Text style={styles.timeText}>{location}</Text>
            </View>
          )}
          {text && (
            <Text style={[styles.text,  { maxHeight: 40, overflow: 'hidden' }]}>
              {text}
            </Text>
          )}
          {image && (
            <Image source={image} style={styles.image} />
          )}
        </View>
      </View>
      <View style={styles.bottomRow}>
        {creator ? (
          <View style={styles.tagsContainer}>
            <Tags text="Delete event" />
            <Tags text="Edit event" />
            <Tags text="View notes" />
          </View>
        ) : (
          attending !== undefined && (
            <View style={styles.tagsContainer}>
              {attending ? (
                <>
                  <Tags text="Attending" checked={true} />
                  <Tags text="Cancel" />
                </>
              ) : (
                <>
                  <Tags text="Not attending" checked={true} />
                  <Tags text="Attend" />
                </>
              )}
              {addNotes && <Tags text="Add notes" />}
            </View>
          )
        )}
        </View>
        </View>
      </View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#F6F6F6',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopColor: '#AEB0AF',
    borderTopWidth: 0.5,
    flex: 1
  },
  container2: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 12,
    gap: 12,
    borderRadius: 20,
  },
  arrow: {
    transform: [{ rotate: '180deg' }],
    marginRight: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  name: {
    color: '#2D2D2D',
    fontSize: 18,
    fontWeight: '700',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  timeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expandedText: {
    gap: 8
  },
  clock: {
    opacity: 0.4,
  },
  timeText: {
    opacity: 0.7,
    fontWeight: '600',
    fontSize: 14,
    color: '#2D2D2D',
  },
  expandIcon: {
    fontSize: 17.7,
    color: '#49A078',
    fontWeight: '600',
    transform: [{ rotate: '180deg' }],
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeIcon: {
    fontSize: 17.7,
    color: '#49A078',
    fontWeight: '600',
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#2D2D2D'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8
  },
  expandButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 191,
    borderRadius: 8
  }
});

export default EventDetails;