import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation';
import {Button} from '../components';
import {COLORS} from '../constants';

type AdoptionSuccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdoptionSuccess'>;
type AdoptionSuccessScreenRouteProp = RouteProp<RootStackParamList, 'AdoptionSuccess'>;

interface Props {
  navigation: AdoptionSuccessScreenNavigationProp;
  route: AdoptionSuccessScreenRouteProp;
}

const AdoptionSuccessScreen = ({navigation, route}: Props) => {
  const {petName, amount} = route.params;

  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successIcon}>🎉</Text>
      <Text style={styles.title}>Adoption Successful!</Text>
      <Text style={styles.message}>
        Congratulations! You have successfully adopted {petName}.
      </Text>
      
      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Adoption Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Pet Name:</Text>
          <Text style={styles.detailValue}>{petName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount Paid:</Text>
          <Text style={styles.detailValue}>${amount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Transaction ID:</Text>
          <Text style={styles.detailValue}>TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.nextStepsCard}>
        <Text style={styles.cardTitle}>Next Steps</Text>
        <Text style={styles.stepText}>• Check your email for adoption confirmation</Text>
        <Text style={styles.stepText}>• Schedule a pickup time within 3 days</Text>
        <Text style={styles.stepText}>• Bring a valid ID and this confirmation</Text>
        <Text style={styles.stepText}>• Prepare your home for your new pet!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Return to Home"
          onPress={handleGoHome}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    justifyContent: 'center',
  },
  successIcon: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.success,
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  detailsCard: {
    backgroundColor: COLORS.lightGray,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  nextStepsCard: {
    backgroundColor: COLORS.success,
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: COLORS.gray,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  stepText: {
    fontSize: 14,
    color: COLORS.white,
    marginBottom: 6,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AdoptionSuccessScreen;