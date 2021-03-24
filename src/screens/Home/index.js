import * as React from 'react';
import PropTypes from 'prop-types';
import { Linking, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import { gStyle } from '../../constants';
import styles from './style';
// components
import RequestRideType from '../../components/RequestRideType';
import SelectRideType from '../../components/SelectRideType';
import TouchIcon from '../../components/TouchIcon';
import TouchText from '../../components/TouchText';
import WhereTo from '../../components/WhereTo';

// icons
import SvgCheckShield from '../../components/icons/Svg.CheckShield';
import SvgMenu from '../../components/icons/Svg.Menu';
import SvgQRCode from '../../components/icons/Svg.QRCode';

const { PROVIDER_GOOGLE } = MapView;

const types = {
    car: {
        image: 'manLg',
        imageLg: 'manLg',
        text: 'Male'
    },
    bike: {
        image: 'womanSm',
        imageLg: 'womanLg',
        text: 'Female'
    }
};

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'car',
            selectType: false,
            showMap: false,
            userLat: null,
            userLon: null
        };

        this.toggleTypeModal = this.toggleTypeModal.bind(this);
        this.changeRideType = this.changeRideType.bind(this);
    }

    async componentDidMount() {
        // get exisiting locaton permissions first
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.LOCATION
        );
        let finalStatus = existingStatus;

        // ask again to grant locaton permissions (if not already allowed)
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            finalStatus = status;
        }

        // still not allowed to use location?
        if (finalStatus !== 'granted') {
            return;
        }

        const { coords } = await Location.getCurrentPositionAsync();

        this.setState({
            showMap: true,
            userLat: coords.latitude,
            userLon: coords.longitude
        });
    }

    toggleTypeModal() {
        this.setState((prevState) => ({
            selectType: !prevState.selectType
        }));
    }

    changeRideType(type) {
        this.setState({
            type
        });
    }

    render() {
        const { navigation } = this.props;
        const { type, selectType, showMap, userLat, userLon } = this.state;

        return (
            <View style={gStyle.container}>
                {showMap && (
                    <MapView
                        followsUserLocation
                        provider={PROVIDER_GOOGLE}
                        region={{
                            latitude: userLat,
                            longitude: userLon,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }}
                        showsUserLocation
                        style={styles.map}
                    />
                )}

                {!showMap && (
                    <View style={styles.containerNoLocation}>
                        <Text style={styles.textLocationNeeded}>
                            We need your location data...
            </Text>
                        <TouchText
                            onPress={() => Linking.openURL('app-settings:')}
                            style={styles.btnGoTo}
                            styleText={styles.btnGoToText}
                            text="Go To Permissions"
                        />
                    </View>
                )}

                {type === 'bike' && (
                    <View style={styles.rightContainer}>
                        <View style={styles.icons}>
                            <TouchIcon
                                icon={<SvgQRCode />}
                                iconSize={20}
                                onPress={() => navigation.navigate('ModalQRCode')}
                                style={[styles.icon, styles.iconQRCode]}
                            />
                            <TouchIcon
                                icon={<SvgCheckShield />}
                                iconSize={20}
                                onPress={() => navigation.navigate('ModalTutorialBike')}
                                style={[styles.icon, styles.iconShield]}
                            />
                        </View>
                    </View>
                )}

                <View style={styles.header}>
                    <TouchIcon
                        icon={<SvgMenu />}
                        iconSize={32}
                        onPress={() => navigation.toggleDrawer()}
                    />
                    <RequestRideType
                        image={types[type].image}
                        onPress={this.toggleTypeModal}
                        text={types[type].text}
                    />

                    {type === 'car' && <View style={styles.placeholder} />}
                    {type === 'bike' && (
                        <TouchText
                            onPress={() => navigation.navigate('ModalHelp')}
                            style={styles.help}
                            text="Help"
                        />
                    )}
                </View>

                <SelectRideType
                    data={types}
                    onClose={this.toggleTypeModal}
                    onSelect={this.changeRideType}
                    visible={selectType}
                />

                {type === 'car' && <WhereTo />}
            </View>
        );
    }
}

Home.propTypes = {
    // required
    navigation: PropTypes.object.isRequired
};



export default Home;
