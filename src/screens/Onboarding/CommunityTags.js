import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ActionButtonGreen from '../../components/events/ActionButtonGreen';

const CommunityTags = ({ navigation }) => {
  const tags = ["Faith", "Parent-Teacher", "Fitness", "Arts and Culture", "Community Service", "Music", "Books", "Food", "Social", "Health and wellness", "Technology", "Education", "Sports", "Gaming", "Unique"];
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTagSelection = (tag) => {
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter(t => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>One last thing to launch your Realspace experience</Text>

          <Text style={styles.subtitle}>Choose five community interest</Text>
          {/* List of tags */}
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tag, selectedTags.includes(tag) && styles.tagSelected]}
                onPress={() => toggleTagSelection(tag)}
              >
                <Text style={[styles.tagText, selectedTags.includes(tag) && styles.tagTextSelected]}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
        <ActionButtonGreen
          content={'Next'}
          disabled={selectedTags.length === 0}
          onPress={() => navigation.navigate('LastOnboarding')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'flex-start',
    paddingTop: 66,
    paddingHorizontal: 16
  },
  container2: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'space-between',
    paddingBottom: 64,
    paddingTop: 20,
  },
  titleContainer: {
    gap: 10,
  },
  title: {
    color: '#111111',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#111111',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 15,
  },
  content: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    width: '100%',
    borderRadius: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: '#E7E7E8',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  tagSelected: {
    backgroundColor: '#378461',
  },
  tagText: {
    color: '#3C3C4399',
    fontSize: 14,
  },
  tagTextSelected: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  buttonOnboarding: {
    width: 56,
    height: 56,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityTags;