import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation';
import {PetCard, Button} from '../components';
import {PETS_DATA, Pet} from '../data/pets';
import {COLORS} from '../constants';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({navigation}: Props) => {
  const handlePetPress = (pet: Pet) => {
    navigation.navigate('PetDetail', {petId: pet.id});
  };

  const renderPetItem = ({item}: {item: Pet}) => (
    <PetCard pet={item} onPress={() => handlePetPress(item)} />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Available Pets</Text>
      <Button
        title="📍 Find Nearby Services"
        onPress={() => navigation.navigate('Location')}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={PETS_DATA}
        renderItem={renderPetItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: COLORS.black,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
