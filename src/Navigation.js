import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
{/* Onboarding */ }
import RealRelationships from './screens/Onboarding/RealRelationships';
import Onboarding01 from './screens/Onboarding/Onboarding01';
import Onboarding05 from './screens/Onboarding/Onboarding05';
import Onboarding06 from './screens/Onboarding/Onboarding06';
import ProfileLook3 from './screens/Onboarding/ProfileLook3';
import Name from './screens/Onboarding/Name';
import ProfileInfo12 from './screens/Onboarding/ProfileInfo12';
import ProfileInfo3 from './screens/Onboarding/ProfileInfo3';
import ProfileInfo14 from './screens/Onboarding/ProfileInfo14';
import ProfileInfo16 from './screens/Onboarding/ProfileInfo16';
import ProfileInfo15 from './screens/Onboarding/ProfileInfo15';
import ProfileInfo17 from './screens/Onboarding/ProfileInfo17';
import FriendsV3 from './screens/Onboarding/FriendsV3';
import CommunityTags from './screens/Onboarding/CommunityTags';
import AvailabilityFeature from './screens/Onboarding/AvailabilityFeature';
import AddSchedule from './screens/Onboarding/AddSchedule';
import LastOnboarding from './screens/Onboarding/LastOnboarding';
{/* Landing Pages */ }
import LandingPageEvents from './screens/events/LandingPageEvents';
import LandingPageCommunity from './screens/community/LandingPageCommunity';
import LandingPageFriends from './screens/friends/LandingPageFriends'
import LandingPageProfile from './screens/profile/LandingPageProfile';
import LandingPageSchedule from './screens/schedule/LandingPageSchedule';
import EditProfile from './screens/profile/EditProfile';
import CreateEvent from './screens/events/CreateEvent';
import ProfileSettings from './screens/profile/ProfileSettings';
import NewCommunity from './screens/community/NewCommunity';
import EventDetails from './screens/schedule/EventDetails';
import LandingPageCircles from './screens/circles/LandingPageCircles';
import EditSchedule from './screens/profile/EditSchedule';
import FriendsPageProfile from './screens/profile/FriendsPageProfile';
import CircleProfile from './screens/circles/CircleProfile';
import ChangePhoneNumber from './screens/profile/ChangePhoneNumber';
import CreateCircle from './screens/circles/CreateCircle';
import CircleProfilePreview from './screens/circles/CircleProfilePreview';
import AddMembers from './screens/circles/AddMembers';
import CircleSettings from './screens/circles/CircleSettings';
import ManageMembers from './screens/circles/ManageMembers';
import CircleProfileMockedData from './screens/circles/CircleProfileMockedData';
import ManageMembersMockedData from './screens/circles/ManageMembersMockedData';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Onboarding */}
        <Stack.Screen name="RealRelationships" component={RealRelationships} options={{ showNavBar: false }} />
        <Stack.Screen name="Onboarding01" component={Onboarding01} options={{ showNavBar: false }} />
        <Stack.Screen name="Onboarding05" component={Onboarding05} options={{ showNavBar: false }} />
        <Stack.Screen name="Onboarding06" component={Onboarding06} options={{ showNavBar: false }} />
        <Stack.Screen name="ProfileLook3" component={ProfileLook3} options={{ showNavBar: false }} />
        <Stack.Screen name="Name" component={Name} options={{ showNavBar: false }} />
        <Stack.Screen name="ProfileInfo12" component={ProfileInfo12} options={{ showNavBar: false }} />
        <Stack.Screen name="ProfileInfo3" component={ProfileInfo3} options={{ showNavBar: false }} />
        <Stack.Screen name="ProfileInfo14" component={ProfileInfo14} options={{ showNavBar: false }} />
        <Stack.Screen name="ProfileInfo16" component={ProfileInfo16} options={{ showNavBar: false }} />
        <Stack.Screen name="ProfileInfo15" component={ProfileInfo15} options={{ showNavBar: false }} />
        <Stack.Screen name="ProfileInfo17" component={ProfileInfo17} options={{ showNavBar: false }} />
        <Stack.Screen name="FriendsV3" component={FriendsV3} options={{ showNavBar: false }} />
        <Stack.Screen name="CommunityTags" component={CommunityTags} options={{ showNavBar: false }} />
        <Stack.Screen name="AvailabilityFeature" component={AvailabilityFeature} options={{ showNavBar: false }} />
        <Stack.Screen name="AddSchedule" component={AddSchedule} options={{ showNavBar: false }} />
        <Stack.Screen name="LastOnboarding" component={LastOnboarding} options={{ showNavBar: false }} />
        {/* Landing Pages */}
       
        <Stack.Screen name="LandingPageEvents" component={LandingPageEvents} options={{ showNavBar: true }} />
        <Stack.Screen name="LandingPageCommunity" component={LandingPageCommunity} options={{ showNavBar: true }} />
        <Stack.Screen name="LandingPageFriends" component={LandingPageFriends} options={{ showNavBar: true }} />
         <Stack.Screen name="LandingPageProfile" component={LandingPageProfile} options={{ showNavBar: true }} />
        
        <Stack.Screen name="LandingPageSchedule" component={LandingPageSchedule} options={{ showNavBar: true }} />
        <Stack.Screen name="LandingPageCircles" component={LandingPageCircles} options={{ showNavBar: true }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ showNavBar: true }} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} options={{ showNavBar: true }} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettings} options={{ showNavBar: true }} />
        <Stack.Screen name="NewCommunity" component={NewCommunity} options={{ showNavBar: true }} />
        <Stack.Screen name="EventDetails" component={EventDetails} options={{ showNavBar: true }} />
        <Stack.Screen name="EditSchedule" component={EditSchedule} options={{ showNavBar: true }} />
        <Stack.Screen name="FriendsPageProfile" component={FriendsPageProfile} options={{ showNavBar: true }} />
        <Stack.Screen name="CircleProfile" component={CircleProfile} options={{ showNavBar: true }} />
        <Stack.Screen name="ChangePhoneNumber" component={ChangePhoneNumber} options={{ showNavBar: true }} />
        <Stack.Screen name="CreateCircle" component={CreateCircle} options={{ showNavBar: true }} />
        <Stack.Screen name="CircleProfilePreview" component={CircleProfilePreview} options={{ showNavBar: true }} />
        <Stack.Screen name="AddMembers" component={AddMembers} options={{ showNavBar: true }} />
        <Stack.Screen name="CircleSettings" component={CircleSettings} options={{ showNavBar: true }} />
        <Stack.Screen name="ManageMembers" component={ManageMembers} options={{ showNavBar: true }} />
        <Stack.Screen name="CircleProfileMockedData" component={CircleProfileMockedData} options={{ showNavBar: true }} />
        <Stack.Screen name="ManageMembersMockedData" component={ManageMembersMockedData} options={{ showNavBar: true }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;