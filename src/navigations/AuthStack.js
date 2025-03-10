import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import SignupScreen from '../screens/auth/signup/SignupScreen';
import CredentialsScreen from '../screens/auth/login/CredentialsScreen';
import LoginScreen from '../screens/auth/login/LoginScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import ForgotCredentialsScreen from '../screens/auth/login/ForgotCredentialsScreen';
import ResetPasswordScreen from '../screens/auth/login/ResetPasswordScreen';
import ThanksScreen from '../screens/auth/ThanksScreen';
import ManagingkidInfluencersScreen from '../screens/auth/signup/ManagingkidInfluencersScreen';
import KidsDetailsScreen from '../screens/auth/signup/KidsDetailsScreen';
import NewProfileDetailsBusinessScreen from '../screens/auth/signup/NewProfileDetailsBusinessScreen';
import GovernmentOrganizationScreen from '../screens/auth/signup/GovernmentOrganizationScreen';
import KidAccountManagerScreen from '../screens/auth/signup/KidAccountManagerScreen';
import BuisGovAccountManagerScreen from '../screens/auth/signup/BuisGovAccountManagerScreen';
import SentEmailThanksScreen from '../screens/auth/SentEmailThanksScreen';
import PhoneNumberScreen from '../screens/auth/signup/PhoneNumberScreen';
import RecoveringAccountScreen from '../screens/auth/recoveringAccount/RecoveringAccountScreen';
import UploadGovIDScreen from '../screens/auth/recoveringAccount/UploadGovIDScreen';
import PhotoVerificationScreen from '../screens/auth/recoveringAccount/PhotoVerificationScreen';
import PosesMatchScreen from '../screens/auth/recoveringAccount/PosesMatchScreen';
import YourPartDoneScreen from '../screens/auth/recoveringAccount/YourPartDoneScreen';
import RejectDeleteAccountScreen from '../screens/auth/recoveringAccount/RejectDeleteAccountScreen';
import RejectRequestScreen from '../screens/auth/recoveringAccount/RejectRequestScreen';
import BadActorScreen from '../screens/auth/recoveringAccount/BadActorScreen';
import DontHaveIdScreen from '../screens/auth/recoveringAccount/DontHaveIdScreen';
import RealAccountHolderScreen from '../screens/auth/recoveringAccount/RealAccountHolderScreen';
import LinkExpiredScreen from '../screens/auth/recoveringAccount/LinkExpiredScreen';
import BuildProfileScreen from '../screens/auth/BuildProfile/BuildProfileScreen';
import ProfilePictureScreen from '../screens/auth/BuildProfile/ProfilePictureScreen';
import AddAdditionalDetailsScreen from '../screens/auth/BuildProfile/AddAdditionalDetailsScreen';
import SelectYourCategoryScreen from '../screens/auth/BuildProfile/SelectYourCategoryScreen';
import AddMusicVideosScreen from '../screens/auth/BuildProfile/AddMusicVideosScreen';
import AddIntroVideoScreen from '../screens/auth/BuildProfile/AddIntroVideoScreen';
import AddIntroVideo2Screen from '../screens/auth/BuildProfile/AddIntroVideo2Screen';
import SignupSuccessScreen from '../screens/auth/SignupSuccessScreen';
import ConnectSocialAccountsScreen from '../screens/auth/ConnectSocialAccountsScreen';
import PaymentMethodsScreen from '../screens/nonAuth/payment/PaymentMethodsScreen';
import ToContinueScreen from '../screens/nonAuth/payment/ToContinueScreen';
import AccountSuspendedScreen from '../screens/nonAuth/payment/AccountSuspendedScreen';
import SuspendedNextStepScreen from '../screens/nonAuth/payment/SuspendedNextStepScreen';
import StrikeScreen from '../screens/nonAuth/payment/StrikeScreen';
import ThanksLogoutScreen from '../screens/nonAuth/payment/ThanksLogoutScreen';
import RequestDataScreen from '../screens/nonAuth/payment/RequestDataScreen';
import ThanksYourRequestScreen from '../screens/nonAuth/payment/ThanksYourRequestScreen';
import SorryAboutThisScreen from '../screens/nonAuth/payment/SorryAboutThisScreen';
// *********** NonAuthStack **************
import SettingScreen from '../screens/nonAuth/settingScreens/SettingScreen';
import ViewProfileScreen from '../screens/nonAuth/profile/ViewProfileScreen';
import AllMusicScreen from '../screens/nonAuth/profile/AllMusicScreen';
import AllVideoScreen from '../screens/nonAuth/profile/AllVideoScreen';
import AllReviewsScreen from '../screens/nonAuth/profile/AllReviewsScreen';
import AccountManagerScreen from '../screens/nonAuth/settingScreens/AccountManagerScreen';
import TwoStepVerificationScreen from '../screens/nonAuth/settingScreens/TwoStepVerificationScreen';
import EditProfileScreen from '../screens/nonAuth/settingScreens/EditProfileScreen';
import ManageMusicScreen from '../screens/nonAuth/settingScreens/ManageMusicScreen';
import ManageVideoScreen from '../screens/nonAuth/settingScreens/ManageVideoScreen';
import ReferralsScreen from '../screens/nonAuth/settingScreens/ReferralsScreen';
import ReferralsListScreen from '../screens/nonAuth/settingScreens/ReferralsListScreen';
import PaymentsScreen from '../screens/nonAuth/settingScreens/PaymentsScreen';
import WithdrawFundsScreen from '../screens/nonAuth/settingScreens/WithdrawFundsScreen';
import WithdrawBalanceScreen from '../screens/nonAuth/settingScreens/WithdrawBalanceScreen';
import PaymentSuccessScreen from '../screens/nonAuth/settingScreens/PaymentSuccessScreen';
import WithdrawalHistoryScreen from '../screens/nonAuth/settingScreens/WithdrawalHistoryScreen';
import IncomeHistoryScreen from '../screens/nonAuth/settingScreens/IncomeHistoryScreen';
import DescribeIssueScreen from '../screens/nonAuth/settingScreens/DescribeIssueScreen';
import AddDebitCreditCardScreen from '../screens/nonAuth/settingScreens/AddDebitCreditCardScreen';
import CardAddedScreen from '../screens/nonAuth/settingScreens/CardAddedScreen';
import AddBankAccountScreen from '../screens/nonAuth/settingScreens/AddBankAccountScreen';
import AnalyticsScreen from '../screens/nonAuth/settingScreens/AnalyticsScreen';
import ManageYourServicesScreen from '../screens/nonAuth/settingScreens/ManageYourServicesScreen';
import AdvertisementSettingsScreen from '../screens/nonAuth/settingScreens/AdvertisementSettingsScreen';
import ActingServicesSettingsScreen from '../screens/nonAuth/settingScreens/ActingServicesSettingsScreen';
import BookingSettingsScreen from '../screens/nonAuth/settingScreens/BookingSettingsScreen';
import MySpecialRequirementsScreen from '../screens/nonAuth/settingScreens/MySpecialRequirementsScreen';
import PostalAddressScreen from '../screens/nonAuth/settingScreens/PostalAddressScreen';
import LoginSecurityScreen from '../screens/nonAuth/settingScreens/LoginSecurityScreen';
import ChangeEmailAddressScreen from '../screens/nonAuth/settingScreens/ChangeEmailAddressScreen';
import ChangePasswordScreen from '../screens/nonAuth/settingScreens/ChangePasswordScreen';
import PasswordChangedThanksScreen from '../screens/nonAuth/settingScreens/PasswordChangedThanksScreen';
import TwoFactorAuthenticationScreen from '../screens/nonAuth/settingScreens/TwoFactorAuthenticationScreen';
import ChangeDOBScreen from '../screens/nonAuth/settingScreens/ChangeDOBScreen';
import RequestYourDataScreen from '../screens/nonAuth/settingScreens/RequestYourDataScreen';
import RequestDataThanksScreen from '../screens/nonAuth/settingScreens/RequestDataThanksScreen';
import DeleteMyAccountScreen from '../screens/nonAuth/settingScreens/DeleteMyAccountScreen';
import DeleteMyAccountSecScreen from '../screens/nonAuth/settingScreens/DeleteMyAccountSecScreen';
import AccountDeletedThanksScreen from '../screens/nonAuth/settingScreens/AccountDeletedThanksScreen';
import CantDeleteAccountScreen from '../screens/nonAuth/settingScreens/CantDeleteAccountScreen';
import HelpCenterScreen from '../screens/nonAuth/settingScreens/HelpCenterScreen';
import SupportInboxScreen from '../screens/nonAuth/settingScreens/SupportInboxScreen';
import HowDoSigninScreen from '../screens/nonAuth/settingScreens/HowDoSigninScreen';
import TipsQuickAdsScreen from '../screens/nonAuth/settingScreens/TipsQuickAdsScreen';
import BlogScreen from '../screens/nonAuth/settingScreens/BlogScreen';
import BlogTitleScreen from '../screens/nonAuth/settingScreens/BlogTitleScreen';
import FAQScreen from '../screens/nonAuth/settingScreens/FAQScreen';
import InternationalLawsScreen from '../screens/nonAuth/settingScreens/InternationalLawsScreen';
import SavedTopicsScreen from '../screens/nonAuth/settingScreens/SavedTopicsScreen';
import SavedTopicsDetailScreen from '../screens/nonAuth/settingScreens/SavedTopicsDetailScreen';
import SelectLanguageScreen from '../screens/nonAuth/settingScreens/SelectLanguageScreen';
import TaxResponsibilityScreen from '../screens/nonAuth/settingScreens/TaxResponsibilityScreen';
import SpendingHistoryScreen from '../screens/nonAuth/settingScreens/SpendingHistoryScreen';
import VerifyLittleTimmyScreen from '../screens/nonAuth/settingScreens/VerifyLittleTimmyScreen';
import LicensingDealSettingsScreen from '../screens/nonAuth/settingScreens/LicensingDealSettingsScreen';
import MusicServicesSettingsScreen from '../screens/nonAuth/settingScreens/MusicServicesSettingsScreen';
import ToDoBottomNavigation from './ToDoBottomNavigation';
import JobDetailsScreen from '../screens/nonAuth/ToDoList/JobDetailsScreen';
import MediaFilesScreen from '../screens/nonAuth/ToDoList/MediaFilesScreen';
import ManageSocialPostsScreen from '../screens/nonAuth/ToDoList/ManageSocialPostsScreen';
import CancelJobScreen from '../screens/nonAuth/ToDoList/CancelJobScreen';
import JobCancelledThanksScreen from '../screens/nonAuth/ToDoList/JobCancelledThanksScreen';
import ReportProposalScreen from '../screens/nonAuth/ToDoList/ReportProposalScreen';
import LookingReportToDoScreen from '../screens/nonAuth/ToDoList/LookingReportToDoScreen';
import MainScreen from '../screens/nonAuth/QuickAds/MainScreen';
import SavedScreen from '../screens/nonAuth/QuickAds/SavedScreen';
import CreateNewScreen from '../screens/nonAuth/QuickAds/CreateNewScreen';
import AllMediaScreen from '../screens/nonAuth/Messages/AllMediaScreen';
import BlockedScreen from '../screens/nonAuth/Messages/BlockedScreen';
import BroadCastScreen from '../screens/nonAuth/Messages/BroadcastScreen';
import MessageScreen from '../screens/nonAuth/Messages/MessageScreen';
import LookingReportScreen from '../screens/nonAuth/Messages/LookingReportScreen';
import UploadMediaScreen from '../screens/nonAuth/Messages/UploadMediaScreen';
import NewProfileDetailsInfluencerScreen from '../screens/auth/signup/NewProfileDetailsInfluencerScreen';
import NewProfileDetailsCustomerScreen from '../screens/auth/signup/NewProfileDetailsCustomerScreen';
import GovtAccountCredentialScreen from '../screens/auth/signup/GovtAccountCredentialScreen';
import NoBusinessCredentialScreen from '../screens/auth/signup/NoBusinessCredentialScreen';
import KidInfluencerCredentialScreen from '../screens/auth/signup/KidsInfluencerCredentialScreen';
import SponsorshipsScreen from '../screens/nonAuth/EnterApp/SponsorshipsScreen';
import InfluencersScreen from '../screens/nonAuth/EnterApp/InfluencersScreen';
import DashboardScreen from '../screens/nonAuth/EnterApp/DashboardScreen';
import DetailScreen from '../screens/nonAuth/QuickAds/DetailScreen';
import VideoRecordScreen from '../screens/auth/BuildProfile/VideoRecordScreen';
import StandardQuickAdsScreen from '../screens/nonAuth/QuickAds/StandardQuickAdsScreen';
import AcceptedJobScreen from '../screens/nonAuth/QuickAds/AcceptedJobScreen';
import DisclosureNoticeScreen from '../screens/nonAuth/QuickAds/DisclosureNoticeScreen';
import QuestionScreen from '../screens/nonAuth/QuickAds/QuestionScreen';
import ReviewScreen from '../screens/nonAuth/QuickAds/ReviewScreen';
import ReportScreenQuickAd from '../screens/nonAuth/Messages/ReportScreenQuickAd';
import DepositFundsScreen from '../screens/nonAuth/QuickAds/DepositFundsScreen';
import ChangePaymentMethodsScreen from '../screens/nonAuth/QuickAds/ChangePaymentMethodsScreen';
import JobLivePaymentSuccessScreen from '../screens/nonAuth/QuickAds/JobLivePaymentSuccessScreen';
import AnalyticsSocialPostsScreen from '../screens/nonAuth/QuickAds/AnalyticsSocialPostsScreen';
import QuickChatScreen from '../screens/nonAuth/Messages/QuickChatScreen';
import JobChatScreen from '../screens/nonAuth/Messages/JobChatScreen';
import ReadyToSendScreen from '../screens/nonAuth/Messages/ReadyToSendScreen';
import PhotoVerificationCameraScreen from '../screens/auth/PhotoVerificationCameraScreen';
import PhotoVerificationFinalCameraScreen from '../screens/auth/PhotoVerificationFinalCameraScreen';
import FinalPoseMatchScreen from '../screens/auth/recoveringAccount/FinalPoseMatchScreen';
import LoggedInUserProfileScreen from '../screens/nonAuth/profile/LoggedInUserProfileScreen';
import UnfortunatelyScreen from '../screens/auth/BuildProfile/UnfortunatelyScreen';
import GuardianAgeScreen from '../screens/auth/BuildProfile/GuardianAgeScreen';
import BusinessManagerAgeScreen from '../screens/auth/signup/BusinessManagerAgeScreen';
import AccountManagerProfilePictureScreen from '../screens/nonAuth/settingScreens/AccountManagerProfilePictureScreen';
import EditProfileThanksScreen from '../screens/auth/EditProfileThanksScreen';
import PhoneNumberConfirmedScreen from '../screens/nonAuth/settingScreens/PhoneNumberConfirmedScreen';
import EditQuickAdScreen from '../screens/nonAuth/QuickAds/EditQuickAdScreen';
import ReviewPublishScreen from '../screens/nonAuth/QuickAds/ReviewPublishScreen';
import NotEligibleScreen from '../screens/nonAuth/QuickAds/NotEligibleScreen';
import ToDoJobDetailsScreen from '../screens/nonAuth/ToDoList/ToDoJobDetailsScreen';
import ToDoAllMediaScreen from '../screens/nonAuth/ToDoList/ToDoAllMediaScreen';
import ToDoAnalyticsSocialPostsScreen from '../screens/nonAuth/ToDoList/ToDoAnalyticsSocialPostsScreen';
import QuickAdsApplicantDetailsScreen from '../screens/nonAuth/QuickAds/QuickAdsApplicantDetailsScreen';
import ApplicantsAllMediaScreen from '../screens/nonAuth/QuickAds/ApplicantsAllMediaScreen';
import ApplicantViewProfileScreen from '../screens/nonAuth/QuickAds/ApplicantViewProfileScreen';
import ApplicantAllMusicScreen from '../screens/nonAuth/QuickAds/ApplicantAllMusicScreen';
import ApplicantAllReviewsScreen from '../screens/nonAuth/QuickAds/ApplicantAllReviewsScreen';
import ApplicantAllVideoScreen from '../screens/nonAuth/QuickAds/ApplicantAllVideoScreen';
import ToDoJobCompletedScreen from '../screens/nonAuth/ToDoList/ToDoJobCompletedScreen';
import CancelQuickadCoustmerScreen from '../screens/nonAuth/QuickAds/CancelQuickadCoustmerScreen';
import ReportMessageScreen from '../components/nonAuth/Message/ReportMessageScreen';
import ChatRoomScreen from '../screens/nonAuth/Messages/ChatRoomScreen';
import CookiesScreen from '../screens/auth/CookiesScreen';
import VerifyYourAccountScreen from '../screens/nonAuth/settingScreens/VerifyYourAccountScreen';
import TodoCalendarScreen from '../screens/nonAuth/ToDoList/TodoCalendarScreen';
import ToDoCustomRightsScreen from '../screens/nonAuth/ToDoList/ToDoCustomRightsScreen';
import ToDoSocialMediaUsageRightsScreen from '../screens/nonAuth/ToDoList/ToDoSocialMediaUsageRightsScreen';
import SelectCurrencyScreen from '../screens/nonAuth/QuickAds/SelectCurrencyScreen';

const AuthStack = () => {
  const Stack = createStackNavigator();
  return (
    // <Stack.Navigator initialRouteName="WelcomeScreen">
    <Stack.Navigator initialRouteName="CookiesScreen">
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ApplicantAllMusicScreen"
        component={ApplicantAllMusicScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ApplicantAllReviewsScreen"
        component={ApplicantAllReviewsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ApplicantAllVideoScreen"
        component={ApplicantAllVideoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotEligibleScreen"
        component={NotEligibleScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ApplicantViewProfileScreen"
        component={ApplicantViewProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ApplicantsAllMediaScreen"
        component={ApplicantsAllMediaScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuickAdsApplicantDetailsScreen"
        component={QuickAdsApplicantDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ToDoAnalyticsSocialPostsScreen"
        component={ToDoAnalyticsSocialPostsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ToDoAllMediaScreen"
        component={ToDoAllMediaScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ToDoJobDetailsScreen"
        component={ToDoJobDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhoneNumberConfirmedScreen"
        component={PhoneNumberConfirmedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JobChatScreen"
        component={JobChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfileThanksScreen"
        component={EditProfileThanksScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountManagerProfilePictureScreen"
        component={AccountManagerProfilePictureScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GuardianAgeScreen"
        component={GuardianAgeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BusinessManagerAgeScreen"
        component={BusinessManagerAgeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UnfortunatelyScreen"
        component={UnfortunatelyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoggedInUserProfileScreen"
        component={LoggedInUserProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhotoVerificationCameraScreen"
        component={PhotoVerificationCameraScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhotoVerificationFinalCameraScreen"
        component={PhotoVerificationFinalCameraScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FinalPoseMatchScreen"
        component={FinalPoseMatchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReadyToSendScreen"
        component={ReadyToSendScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotCredentialsScreen"
        component={ForgotCredentialsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ThanksScreen"
        component={ThanksScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CredentialsScreen"
        component={CredentialsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GovtAccountCredentialScreen"
        component={GovtAccountCredentialScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewProfileDetailsInfluencerScreen"
        component={NewProfileDetailsInfluencerScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="NewProfileDetailsCustomerScreen"
        component={NewProfileDetailsCustomerScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ManagingkidInfluencersScreen"
        component={ManagingkidInfluencersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="KidsDetailsScreen"
        component={KidsDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="KidAccountManagerScreen"
        component={KidAccountManagerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewProfileDetailsBusinessScreen"
        component={NewProfileDetailsBusinessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GovernmentOrganizationScreen"
        component={GovernmentOrganizationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BuisGovAccountManagerScreen"
        component={BuisGovAccountManagerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SentEmailThanksScreen"
        component={SentEmailThanksScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhoneNumberScreen"
        component={PhoneNumberScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecoveringAccountScreen"
        component={RecoveringAccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadGovIDScreen"
        component={UploadGovIDScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhotoVerificationScreen"
        component={PhotoVerificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PosesMatchScreen"
        component={PosesMatchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="YourPartDoneScreen"
        component={YourPartDoneScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RejectDeleteAccountScreen"
        component={RejectDeleteAccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RejectRequestScreen"
        component={RejectRequestScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BadActorScreen"
        component={BadActorScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DontHaveIdScreen"
        component={DontHaveIdScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RealAccountHolderScreen"
        component={RealAccountHolderScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LinkExpiredScreen"
        component={LinkExpiredScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BuildProfileScreen"
        component={BuildProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfilePictureScreen"
        component={ProfilePictureScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddAdditionalDetailsScreen"
        component={AddAdditionalDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectYourCategoryScreen"
        component={SelectYourCategoryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddMusicVideosScreen"
        component={AddMusicVideosScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddIntroVideoScreen"
        component={AddIntroVideoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddIntroVideo2Screen"
        component={AddIntroVideo2Screen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupSuccessScreen"
        component={SignupSuccessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConnectSocialAccountsScreen"
        component={ConnectSocialAccountsScreen}
        options={{headerShown: false}}
      />

      {/* ye part alag h  */}
      <Stack.Screen
        name="PaymentMethodsScreen"
        component={PaymentMethodsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ToContinueScreen"
        component={ToContinueScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountSuspendedScreen"
        component={AccountSuspendedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuspendedNextStepScreen"
        component={SuspendedNextStepScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StrikeScreen"
        component={StrikeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ThanksLogoutScreen"
        component={ThanksLogoutScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RequestDataScreen"
        component={RequestDataScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ThanksYourRequestScreen"
        component={ThanksYourRequestScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SorryAboutThisScreen"
        component={SorryAboutThisScreen}
        options={{headerShown: false}}
      />
      {/* ********** NonAuthStack start ************* */}
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewProfileScreen"
        component={ViewProfileScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
        }}
      />
      <Stack.Screen
        name="AllMusicScreen"
        component={AllMusicScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllVideoScreen"
        component={AllVideoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllReviewsScreen"
        component={AllReviewsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountManagerScreen"
        component={AccountManagerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TwoStepVerificationScreen"
        component={TwoStepVerificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ManageMusicScreen"
        component={ManageMusicScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ManageVideoScreen"
        component={ManageVideoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReferralsScreen"
        component={ReferralsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReferralsListScreen"
        component={ReferralsListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentsScreen"
        component={PaymentsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WithdrawFundsScreen"
        component={WithdrawFundsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WithdrawBalanceScreen"
        component={WithdrawBalanceScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WithdrawalHistoryScreen"
        component={WithdrawalHistoryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IncomeHistoryScreen"
        component={IncomeHistoryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DescribeIssueScreen"
        component={DescribeIssueScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddDebitCreditCardScreen"
        component={AddDebitCreditCardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CardAddedScreen"
        component={CardAddedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddBankAccountScreen"
        component={AddBankAccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AnalyticsScreen"
        component={AnalyticsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ManageYourServicesScreen"
        component={ManageYourServicesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdvertisementSettingsScreen"
        component={AdvertisementSettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ActingServicesSettingsScreen"
        component={ActingServicesSettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookingSettingsScreen"
        component={BookingSettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MySpecialRequirementsScreen"
        component={MySpecialRequirementsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostalAddressScreen"
        component={PostalAddressScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginSecurityScreen"
        component={LoginSecurityScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangeEmailAddressScreen"
        component={ChangeEmailAddressScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PasswordChangedThanksScreen"
        component={PasswordChangedThanksScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TwoFactorAuthenticationScreen"
        component={TwoFactorAuthenticationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangeDOBScreen"
        component={ChangeDOBScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RequestYourDataScreen"
        component={RequestYourDataScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RequestDataThanksScreen"
        component={RequestDataThanksScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeleteMyAccountScreen"
        component={DeleteMyAccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeleteMyAccountSecScreen"
        component={DeleteMyAccountSecScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountDeletedThanksScreen"
        component={AccountDeletedThanksScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CantDeleteAccountScreen"
        component={CantDeleteAccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpCenterScreen"
        component={HelpCenterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SupportInboxScreen"
        component={SupportInboxScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HowDoSigninScreen"
        component={HowDoSigninScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TipsQuickAdsScreen"
        component={TipsQuickAdsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BlogScreen"
        component={BlogScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BlogTitleScreen"
        component={BlogTitleScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InternationalLawsScreen"
        component={InternationalLawsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SavedTopicsScreen"
        component={SavedTopicsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SavedTopicsDetailScreen"
        component={SavedTopicsDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectLanguageScreen"
        component={SelectLanguageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaxResponsibilityScreen"
        component={TaxResponsibilityScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SpendingHistoryScreen"
        component={SpendingHistoryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerifyLittleTimmyScreen"
        component={VerifyLittleTimmyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LicensingDealSettingsScreen"
        component={LicensingDealSettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MusicServicesSettingsScreen"
        component={MusicServicesSettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ToDoBottomNavigation"
        component={ToDoBottomNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JobDetailsScreen"
        component={JobDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MediaFilesScreen"
        component={MediaFilesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ManageSocialPostsScreen"
        component={ManageSocialPostsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CancelJobScreen"
        component={CancelJobScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JobCancelledThanksScreen"
        component={JobCancelledThanksScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReportProposalScreen"
        component={ReportProposalScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LookingReportScreen"
        component={LookingReportScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LookingReportToDoScreen"
        component={LookingReportToDoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="SavedScreen"
        component={SavedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateNewScreen"
        component={CreateNewScreen}
        options={{headerShown: false}}
      />
      {/* {chat} */}
      <Stack.Screen
        name="AllMediaScreen"
        component={AllMediaScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BlockedScreen"
        component={BlockedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BroadCastScreen"
        component={BroadCastScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuickChatScreen"
        component={QuickChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReportScreenQuickAd"
        component={ReportScreenQuickAd}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadMediaScreen"
        component={UploadMediaScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NoBusinessCredentialScreen"
        component={NoBusinessCredentialScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SponsorshipsScreen"
        component={SponsorshipsScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="KidInfluencerCredentialScreen"
        component={KidInfluencerCredentialScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="InfluencersScreen"
        component={InfluencersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoRecordScreen"
        component={VideoRecordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StandardQuickAdsScreen"
        component={StandardQuickAdsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AcceptedJobScreen"
        component={AcceptedJobScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DisclosureNoticeScreen"
        component={DisclosureNoticeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DepositFundsScreen"
        component={DepositFundsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePaymentMethodsScreen"
        component={ChangePaymentMethodsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JobLivePaymentSuccessScreen"
        component={JobLivePaymentSuccessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AnalyticsSocialPostsScreen"
        component={AnalyticsSocialPostsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditQuickAdScreen"
        component={EditQuickAdScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReviewPublishScreen"
        component={ReviewPublishScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ToDoJobCompletedScreen"
        component={ToDoJobCompletedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CancelQuickadCoustmerScreen"
        component={CancelQuickadCoustmerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReportMessageScreen"
        component={ReportMessageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CookiesScreen"
        component={CookiesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerifyYourAccountScreen"
        component={VerifyYourAccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TodoCalendarScreen"
        component={TodoCalendarScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ToDoCustomRightsScreen"
        component={ToDoCustomRightsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ToDoSocialMediaUsageRightsScreen"
        component={ToDoSocialMediaUsageRightsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectCurrencyScreen"
        component={SelectCurrencyScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
