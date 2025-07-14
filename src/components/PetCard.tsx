import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Pet} from '../data/pets';
import {COLORS} from '../constants';

interface PetCardProps {
  pet: Pet;
  onPress: () => void;
}

const PetCard = ({pet, onPress}: PetCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: pet.image}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.breed}>{pet.breed}</Text>
        <Text style={styles.age}>{pet.age} years old</Text>
        <Text style={styles.description} numberOfLines={2}>
          {pet.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  breed: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
  },
  age: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: COLORS.darkGray,
    lineHeight: 16,
  },
});

export default PetCard;