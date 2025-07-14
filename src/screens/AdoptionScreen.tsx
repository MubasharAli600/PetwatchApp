import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation';
import {Button} from '../components';
import {PETS_DATA} from '../data/pets';
import {COLORS} from '../constants';

type AdoptionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Adoption'>;
type AdoptionScreenRouteProp = RouteProp<RootStackParamList, 'Adoption'>;

interface Props {
  navigation: AdoptionScreenNavigationProp;
  route: AdoptionScreenRouteProp;
}

const AdoptionScreen = ({navigation, route}: Props) => {
  const {petId} = route.params;
  const pet = PETS_DATA.find(p => p.id === petId);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!pet) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Pet not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const adoptionFee = 150; // Mock adoption fee

  const handleProceedToPayment = () => {
    navigation.navigate('Payment', {
      petId: pet.id,
      amount: adoptionFee,
      petName: pet.name,
    });
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Adoption',
      'Are you sure you want to cancel the adoption process?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => navigation.goBack()},
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{uri: pet.image}} style={styles.petImage} />
        <View style={styles.headerInfo}>
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petBreed}>{pet.breed}</Text>
          <Text style={styles.petAge}>{pet.age} years old</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Adoption Details</Text>
        
        <View style={styles.detailCard}>
          <Text style={styles.cardTitle}>What's Included</Text>
          <Text style={styles.listItem}>• Vaccinations up to date</Text>
          <Text style={styles.listItem}>• Spayed/Neutered</Text>
          <Text style={styles.listItem}>• Microchipped</Text>
          <Text style={styles.listItem}>• Health certificate</Text>
          <Text style={styles.listItem}>• 30-day health guarantee</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.cardTitle}>Adoption Requirements</Text>
          <Text style={styles.listItem}>• Must be 18+ years old</Text>
          <Text style={styles.listItem}>• Valid ID required</Text>
          <Text style={styles.listItem}>• Home visit may be required</Text>
          <Text style={styles.listItem}>• Commitment to pet's wellbeing</Text>
        </View>

        <View style={styles.feeContainer}>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Adoption Fee:</Text>
            <Text style={styles.feeAmount}>${adoptionFee}</Text>
          </View>
          <Text style={styles.feeNote}>
            This fee helps cover medical care, food, and shelter costs.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={`Proceed to Payment - $${adoptionFee}`}
            onPress={handleProceedToPayment}
          />
          <View style={styles.buttonSpacing} />
          <Button
            title="Cancel"
            onPress={handleCancel}
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
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: COLORS.lightGray,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  petBreed: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 2,
  },
  petAge: {
    fontSize: 14,
    color: COLORS.gray,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 20,
  },
  detailCard: {
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 12,
  },
  listItem: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginBottom: 6,
    lineHeight: 20,
  },
  feeContainer: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  feeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  feeAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  feeNote: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonSpacing: {
    height: 12,
  },
});

export default AdoptionScreen;