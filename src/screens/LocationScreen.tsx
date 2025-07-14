import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ActivityIndicator, Dimensions, PermissionsAndroid, Platform} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation';
import {Button} from '../components';
import {COLORS} from '../constants';
import Geolocation from '@react-native-community/geolocation';

type LocationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Location'>;

interface Props {
  navigation: LocationScreenNavigationProp;
}

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

const LocationScreen = ({navigation}: Props) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to location to show nearby pet services.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setError('Location permission denied');
      Alert.alert('Permission Required', 'Location permission is required to show nearby services.');
      return;
    }

    setLoading(true);
    setError(null);

    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude, accuracy} = position.coords;
        setLocation({
          latitude,
          longitude,
          accuracy,
          timestamp: position.timestamp,
        });
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        let errorMessage = 'Unable to get location';
        
        switch (error.code) {
          case 1:
            errorMessage = 'Location permission denied';
            break;
          case 2:
            errorMessage = 'Location unavailable';
            break;
          case 3:
            errorMessage = 'Location request timeout';
            break;
        }
        
        setError(errorMessage);
        Alert.alert('Location Error', errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const formatCoordinate = (coord: number, type: 'lat' | 'lng') => {
    const direction = type === 'lat' ? (coord >= 0 ? 'N' : 'S') : (coord >= 0 ? 'E' : 'W');
    return `${Math.abs(coord).toFixed(6)}° ${direction}`;
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Location</Text>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Getting your location...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ {error}</Text>
          <Button title="Try Again" onPress={getCurrentLocation} />
        </View>
      )}

      {location && (
        <>
          <View style={styles.coordinatesCard}>
            <Text style={styles.cardTitle}>📍 Coordinates</Text>
            <View style={styles.coordinateRow}>
              <Text style={styles.coordinateLabel}>Latitude:</Text>
              <Text style={styles.coordinateValue}>
                {formatCoordinate(location.latitude, 'lat')}
              </Text>
            </View>
            <View style={styles.coordinateRow}>
              <Text style={styles.coordinateLabel}>Longitude:</Text>
              <Text style={styles.coordinateValue}>
                {formatCoordinate(location.longitude, 'lng')}
              </Text>
            </View>
            <View style={styles.coordinateRow}>
              <Text style={styles.coordinateLabel}>Accuracy:</Text>
              <Text style={styles.coordinateValue}>±{location.accuracy.toFixed(0)}m</Text>
            </View>
            <View style={styles.coordinateRow}>
              <Text style={styles.coordinateLabel}>Updated:</Text>
              <Text style={styles.coordinateValue}>
                {formatTimestamp(location.timestamp)}
              </Text>
            </View>
          </View>

          <View style={styles.mapContainer}>
            <Text style={styles.mapTitle}>🗺️ Simulated Map View</Text>
            <View style={styles.mapSimulation}>
              <View style={styles.mapGrid}>
                {Array.from({length: 10}).map((_, i) => (
                  <View key={i} style={[styles.gridLine, {top: `${i * 10}%`}]} />
                ))}
                {Array.from({length: 10}).map((_, i) => (
                  <View key={`v${i}`} style={[styles.gridLineVertical, {left: `${i * 10}%`}]} />
                ))}
              </View>
              
              <View style={styles.userMarker}>
                <Text style={styles.markerText}>📍</Text>
                <Text style={styles.markerLabel}>You are here</Text>
              </View>
              
              <View style={styles.mapInfo}>
                <Text style={styles.mapInfoText}>
                  Lat: {location.latitude.toFixed(4)}
                </Text>
                <Text style={styles.mapInfoText}>
                  Lng: {location.longitude.toFixed(4)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.nearbyCard}>
            <Text style={styles.cardTitle}>🏪 Nearby Pet Services</Text>
            <Text style={styles.nearbyItem}>🏥 Pet Hospital - 0.5 km</Text>
            <Text style={styles.nearbyItem}>🛒 Pet Store - 1.2 km</Text>
            <Text style={styles.nearbyItem}>🏃 Dog Park - 2.1 km</Text>
            <Text style={styles.nearbyItem}>🏥 Vet Clinic - 3.4 km</Text>
          </View>
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Refresh Location" onPress={getCurrentLocation} />
        <View style={styles.buttonSpacing} />
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 20,
  },
  coordinatesCard: {
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 12,
  },
  coordinateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  coordinateLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  coordinateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
  },
  mapContainer: {
    marginBottom: 20,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 12,
  },
  mapSimulation: {
    height: 200,
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  mapGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#C0C0C0',
    opacity: 0.3,
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#C0C0C0',
    opacity: 0.3,
  },
  userMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -15}, {translateY: -15}],
    alignItems: 'center',
  },
  markerText: {
    fontSize: 24,
  },
  markerLabel: {
    fontSize: 10,
    color: COLORS.black,
    backgroundColor: COLORS.white,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  mapInfo: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 6,
  },
  mapInfoText: {
    fontSize: 10,
    color: COLORS.black,
  },
  nearbyCard: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  nearbyItem: {
    fontSize: 14,
    color: COLORS.white,
    marginBottom: 6,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  buttonSpacing: {
    height: 12,
  },
});

export default LocationScreen;
