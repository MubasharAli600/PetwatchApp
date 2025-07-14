import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation';
import {Button} from '../components';
import {PETS_DATA, Pet} from '../data/pets';
import {COLORS} from '../constants';

type PetDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PetDetail'>;
type PetDetailScreenRouteProp = RouteProp<RootStackParamList, 'PetDetail'>;

interface Props {
  navigation: PetDetailScreenNavigationProp;
  route: PetDetailScreenRouteProp;
}

const PetDetailScreen = ({navigation, route}: Props) => {
  const {petId} = route.params;
  const pet = PETS_DATA.find(p => p.id === petId);

  if (!pet) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Pet not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const getTypeIcon = (type: Pet['type']) => {
    switch (type) {
      case 'dog': return '🐕';
      case 'cat': return '🐱';
      case 'bird': return '🐦';
      case 'fish': return '🐠';
      default: return '🐾';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: pet.image}} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.typeIcon}>{getTypeIcon(pet.type)}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Breed</Text>
            <Text style={styles.infoValue}>{pet.breed}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>{pet.age} years old</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About {pet.name}</Text>
          <Text style={styles.description}>{pet.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pet Information</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Type:</Text>
            <Text style={styles.detailValue}>{pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Breed:</Text>
            <Text style={styles.detailValue}>{pet.breed}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Age:</Text>
            <Text style={styles.detailValue}>{pet.age} years old</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Adopt Me!"
            onPress={() => {
              navigation.navigate('Adoption', {petId: pet.id});
            }}
          />
          <View style={styles.buttonSpacing} />
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.error,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  typeIcon: {
    fontSize: 32,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoItem: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.darkGray,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  detailLabel: {
    fontSize: 16,
    color: COLORS.gray,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  buttonContainer: {
    marginTop: 32,
    marginBottom: 20,
  },
  buttonSpacing: {
    height: 12,
  },
});

export default PetDetailScreen;
