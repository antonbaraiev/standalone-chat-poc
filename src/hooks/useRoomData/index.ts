import type {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';

import type {TRoomData, TRoomDataResponse} from './types';

// @ts-ignore
const startupData = {
    "Rails": {
        "Versions": {
            "v1": {
                "ServicePath": "https://rails.discovery.dazn-stage.com/eu/v1/rails"
            },
            "v2": {
                "ServicePath": "https://rails.discovery.dazn-stage.com/eu/v2/rails"
            },
            "v3": {
                "ServicePath": "https://rails.discovery.dazn-stage.com/eu/v3/rails"
            },
            "v4": {
                "ServicePath": "https://rails.discovery.dazn-stage.com/eu/v4/rails"
            },
            "v5": {
                "ServicePath": "https://rails.discovery.dazn-stage.com/eu/v5/rails"
            },
            "v6": {
                "ServicePath": "https://rails.discovery.dazn-stage.com/eu/v6/rails"
            },
            "v7": {
                "ServicePath": "https://rails.discovery.dazn-stage.com/eu/v7/rails"
            },
            "v8": {
                "ServicePath": "https://rails.discovery.dazn-stage.com/eu/v8/rails"
            }
        }
    },
    "Rail": {
        "Versions": {
            "v1": {
                "ServicePath": "https://rail-router.discovery.dazn-stage.com/eu/v1/Rail"
            },
            "v9": {
                "ServicePath": "https://rail-router.discovery.dazn-stage.com/eu/v9/Rail"
            },
            "v8": {
                "ServicePath": "https://rail-router.discovery.dazn-stage.com/eu/v8/Rail"
            },
            "v7": {
                "ServicePath": "https://rail-router.discovery.dazn-stage.com/eu/v7/Rail"
            },
            "v6": {
                "ServicePath": "https://rail-router.discovery.dazn-stage.com/eu/v6/Rail"
            },
            "v5": {
                "ServicePath": "https://rail-router.discovery.dazn-stage.com/eu/v5/Rail"
            },
            "v4": {
                "ServicePath": "https://rail-router.discovery.dazn-stage.com/eu/v4/Rail"
            },
            "v3": {
                "ServicePath": "https://rail-router.discovery.dazn-stage.com/eu/v3/Rail"
            },
            "v2": {
                "ServicePath": "https://rail-router.discovery.dazn-stage.com/eu/v2/Rail"
            }
        }
    },
    "img": {
        "Versions": {
            "v1": {
                "ServicePath": "https://image.discovery.dazn-stage.com/eu/v1/eu/image"
            },
            "v2": {
                "ServicePath": "https://image.discovery.dazn-stage.com/eu/v2/eu/image"
            },
            "v3": {
                "ServicePath": "https://image.discovery.dazn-stage.com/eu/v3/eu"
            },
            "v4": {
                "ServicePath": "https://image.discovery.dazn-stage.com/eu/v4"
            }
        }
    },
    "Search": {
        "Versions": {
            "v1": {
                "ServicePath": "https://cdn-stage.dazn.com/isl/eu/api/v1/dataservice/v1/Search"
            },
            "v3": {
                "ServicePath": "https://search.discovery.dazn-stage.com/v3/search"
            },
            "v4": {
                "ServicePath": "https://search.discovery.dazn-stage.com/v4/search"
            }
        }
    },
    "JapanesePrediction": {
        "Versions": {
            "v1": {
                "ServicePath": "https://transliteration.ar.dazn-stage.com/v1/ja-Hira%7Cja"
            }
        }
    },
    "Event": {
        "Versions": {
            "v1": {
                "ServicePath": "https://event.discovery.dazn-stage.com/eu/v1/Event"
            },
            "v7": {
                "ServicePath": "https://event.discovery.dazn-stage.com/eu/v7/Event"
            },
            "v6": {
                "ServicePath": "https://event.discovery.dazn-stage.com/eu/v6/Event"
            },
            "v5": {
                "ServicePath": "https://event.discovery.dazn-stage.com/eu/v5/Event"
            },
            "v4": {
                "ServicePath": "https://event.discovery.dazn-stage.com/eu/v4/Event"
            },
            "v3": {
                "ServicePath": "https://event.discovery.dazn-stage.com/eu/v3/Event"
            },
            "v2": {
                "ServicePath": "https://event.discovery.dazn-stage.com/eu/v2/Event"
            }
        }
    },
    "Playback": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stage-eu.dazn.com/isl/eu/api/v1/dataservice/v1/Playback"
            },
            "v4": {
                "ServicePath": "https://api.playback.dazn-stage.com/v4/Playback"
            },
            "v5": {
                "ServicePath": "https://api.playback.dazn-stage.com/v5/Playback"
            }
        }
    },
    "PlaybackUpdate": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/PlaybackUpdate"
            }
        }
    },
    "PlaybackUnlock": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/PlaybackUnlock"
            }
        }
    },
    "SignUp": {
        "Versions": {
            "v1": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v1/SignUp"
            },
            "v2": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v2/SignUp"
            },
            "v3": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v3/SignUp"
            },
            "v4": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v4/SignUp"
            },
            "v5": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v5/SignUp"
            }
        }
    },
    "SignIn": {
        "Versions": {
            "v1": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v1/SignIn"
            },
            "v2": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v2/SignIn"
            },
            "v3": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v3/SignIn"
            },
            "v4": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v4/SignIn"
            },
            "v5": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v5/SignIn"
            }
        }
    },
    "Subscribe": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/Subscribe"
            },
            "v2": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v2/Subscribe"
            },
            "v3": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v3/Subscribe"
            },
            "v4": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v4/Subscribe"
            },
            "v5": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v5/Subscribe"
            },
            "v6": {
                "ServicePath": "https://checkout.ar.dazn-stage.com/api/v1/subscribe"
            },
            "v7": {
                "ServicePath": "https://checkout.ar.dazn-stage.com/api/v1/subscribe"
            }
        }
    },
    "DirectDebit": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/DirectDebit"
            }
        }
    },
    "RefreshAccessToken": {
        "Versions": {
            "v1": {
                "ServicePath": "https://ott-authz-bff-stage.ar.dazn-stage.com/v1/RefreshAccessToken"
            },
            "v2": {
                "ServicePath": "https://ott-authz-bff-stage.ar.dazn-stage.com/v2/RefreshAccessToken"
            },
            "v3": {
                "ServicePath": "https://ott-authz-bff-stage.ar.dazn-stage.com/v3/RefreshAccessToken"
            },
            "v4": {
                "ServicePath": "https://ott-authz-bff-stage.ar.dazn-stage.com/v4/RefreshAccessToken"
            },
            "v5": {
                "ServicePath": "https://ott-authz-bff-stage.ar.dazn-stage.com/v5/RefreshAccessToken"
            }
        }
    },
    "ContentItem": {
        "Versions": {
            "v1": {
                "ServicePath": "https://content-item.discovery.dazn-stage.com/eu/v1/ContentItem"
            },
            "v2": {
                "ServicePath": "https://content-item.discovery.dazn-stage.com/eu/v2/ContentItem"
            }
        }
    },
    "PaymentSignature": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/PaymentSignature"
            }
        }
    },
    "RatePlans": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/RatePlans"
            },
            "v2": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v2/RatePlans"
            },
            "v3": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v3/RatePlans"
            },
            "v4": {
                "ServicePath": "https://tiered-pricing-offer-service.ar.dazn-stage.com/v1/offers"
            }
        }
    },
    "RememberEmail": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/RememberEmail"
            }
        }
    },
    "UpdateUser": {
        "Versions": {
            "v1": {
                "ServicePath": "https://user-profile.ar.dazn-stage.com/v1/UpdateUser"
            }
        }
    },
    "SignOut": {
        "Versions": {
            "v1": {
                "ServicePath": "https://ott-authz-bff-stage.ar.dazn-stage.com/v1/SignOut"
            }
        }
    },
    "BackendVersion": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/BackendVersion"
            }
        }
    },
    "SecureConnectionCheck": {
        "Versions": {
            "v1": {
                "ServicePath": "https://rest.pt1.zuora.com/v1/payment-methods/credit-cards"
            }
        }
    },
    "ResumePoint": {
        "Versions": {
            "v1": {
                "ServicePath": "https://resume-points.playback.dazn-stage.com/v1/resumepoints"
            }
        }
    },
    "PlaybackPrecision": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/PlaybackPrecision"
            }
        }
    },
    "VerifyZipCode": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/VerifyZipCode"
            }
        }
    },
    "LandingPage": {
        "Versions": {
            "v1": {
                "ServicePath": "https://lp-content-proxy.ar.dazn-stage.com/v1/landingPage"
            },
            "v2": {
                "ServicePath": "https://lp-content-proxy.ar.dazn-stage.com/v2/landingPage"
            }
        }
    },
    "ResumeSubscription": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/ResumeSubscription"
            }
        }
    },
    "Ping": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/Ping"
            }
        }
    },
    "UserProfile": {
        "Versions": {
            "v1": {
                "ServicePath": "https://user-profile.ar.dazn-stage.com/v1/UserProfile"
            },
            "v2": {
                "ServicePath": "https://user-profile.ar.dazn-stage.com/v2"
            },
            "v3": {
                "ServicePath": "https://user-profile.ar.dazn-stage.com/v3"
            }
        }
    },
    "VersionCheck": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/VersionCheck"
            }
        }
    },
    "VerifyGiftCode": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/VerifyGiftCode"
            },
            "v2": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v2/VerifyGiftCode"
            },
            "v3": {
                "ServicePath": "https://gift-codes-gateway.ar.dazn-stage.com/api/verify"
            }
        }
    },
    "Download": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/Download"
            },
            "v2": {
                "ServicePath": "https://api.playback.dazn-stage.com/v2/Download"
            }
        }
    },
    "RestoreGoogleSubscription": {
        "Versions": {
            "v1": {
                "ServicePath": "https://checkout.ar.dazn-stage.com/api/v1/restore/google"
            }
        }
    },
    "SetupPayPalAuthorization": {
        "Versions": {
            "v1": {
                "ServicePath": "https://paypal-dpss.payments.dazn-stage.com/v1/setup-authorisation"
            }
        }
    },
    "RedeemGiftCode": {
        "Versions": {
            "v1": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v1/RedeemGiftCode"
            },
            "v2": {
                "ServicePath": "https://stag-eu.dazn.com/misl/eu/v2/RedeemGiftCode"
            },
            "v3": {
                "ServicePath": "https://gift-codes-gateway.ar.dazn-stage.com/api/redeem"
            }
        }
    },
    "PasswordReset": {
        "Versions": {
            "v1": {
                "ServicePath": "https://password-reset-stage.ar.dazn-stage.com/reset-password/v1/reset"
            }
        }
    },
    "RestoreAppleSubscription": {
        "Versions": {
            "v1": {
                "ServicePath": "https://checkout.ar.dazn-stage.com/api/v1/restore/apple"
            }
        }
    },
    "AmazonIAP": {
        "Versions": {
            "v1": {
                "ServicePath": "https://checkout.ar.dazn-stage.com/api/v1/subscribe/amazon"
            }
        }
    },
    "GetCapturedGiftCode": {
        "Versions": {
            "v1": {
                "ServicePath": "https://partner-subscriptions-management.ar.dazn-stage.com/getCapturedGiftCode"
            }
        }
    },
    "MfaServiceInitiate": {
        "Versions": {
            "v1": {
                "ServicePath": "https://mfa-service.ar.dazn-stage.com/v1/mfa/initiate"
            }
        }
    },
    "MfaServiceVerify": {
        "Versions": {
            "v1": {
                "ServicePath": "https://mfa-service.ar.dazn-stage.com/v1/mfa/verify"
            }
        }
    },
    "PurchaseAddon": {
        "Versions": {
            "v1": {
                "ServicePath": "https://checkout.ar.dazn-stage.com/api/v1/purchase/add-on"
            }
        }
    },
    "ContactUs": {
        "Versions": {
            "v1": {
                "ServicePath": "https://contact-us-stage.ar.dazn-stage.com"
            }
        }
    },
    "subscriptionManagement": {
        "Versions": {
            "v1": {
                "ServicePath": "https://partner-subscriptions-management.ar.dazn-stage.com/subscriptionManagement"
            }
        }
    },
    "Help": {
        "Versions": {
            "v1": {
                "ServicePath": "https://help.stage.ar.dazn-stage.com"
            }
        }
    },
    "HelpSearch": {
        "Versions": {
            "v1": {
                "ServicePath": "https://help-search.stage.ar.dazn-stage.com"
            }
        }
    },
    "LiveChat": {
        "Versions": {
            "v1": {
                "ServicePath": "https://live-chat-stage.ar.dazn-stage.com"
            }
        }
    },
    "AndroidTvDbConfig": {
        "Versions": {
            "v1": {
                "ServicePath": "https://static-www.fe.dazn-stage.com/AndroidTvDbConfig.json"
            }
        }
    },
    "UserActions": {
        "Versions": {
            "v1": {
                "ServicePath": "https://user-actions.discovery.dazn-stage.com"
            }
        }
    },
    "SpeedDating": {
        "Versions": {
            "v1": {
                "ServicePath": "https://speed-dating.discovery.dazn-stage.com/v1"
            }
        }
    },
    "CompetitionStandings": {
        "Versions": {
            "v1": {
                "ServicePath": "https://standings.sd.dazn-stage.com/competition"
            }
        }
    },
    "CompetitorStandings": {
        "Versions": {
            "v1": {
                "ServicePath": "https://standings.sd.dazn-stage.com/competitor"
            }
        }
    },
    "CompetitorSquads": {
        "Versions": {
            "v1": {
                "ServicePath": "https://squads.sd.dazn-stage.com/competitor"
            }
        }
    },
    "SportsdataDiscoveryCompetition": {
        "Versions": {
            "v1": {
                "ServicePath": "https://sportsdata-discovery.sd.dazn-stage.com/competition"
            }
        }
    },
    "SportsdataDiscoveryCompetitor": {
        "Versions": {
            "v1": {
                "ServicePath": "https://sportsdata-discovery.sd.dazn-stage.com/competitor"
            }
        }
    },
    "SportsdataNFLStandings": {
        "Versions": {
            "v1": {
                "ServicePath": "https://nfl-standings.sd.dazn-stage.com"
            }
        }
    },
    "YouthProtection": {
        "Versions": {
            "v1": {
                "ServicePath": "https://youth-protect.discovery.dazn-stage.com/v1/"
            },
            "v2": {
                "ServicePath": "https://youth-protect.discovery.dazn-stage.com/v2/"
            },
            "v3": {
                "ServicePath": "https://youth-protect.discovery.dazn-stage.com/v3/"
            }
        }
    },
    "ResetPasswordVerify": {
        "Versions": {
            "v1": {
                "ServicePath": "https://password-reset-stage.ar.dazn-stage.com/reset-password/v1/verify"
            }
        }
    },
    "ResetPasswordUpdate": {
        "Versions": {
            "v1": {
                "ServicePath": "https://password-reset-stage.ar.dazn-stage.com/reset-password/v1/update"
            }
        }
    },
    "Clips": {
        "Versions": {
            "v1": {
                "ServicePath": "https://api.playback.dazn-stage.com/v1/Clips"
            }
        }
    },
    "Concurrency": {
        "Versions": {
            "v1": {
                "ServicePath": "https://concurrency.playback.dazn-stage.com/v1/concurrency/lock/"
            },
            "v2": {
                "ServicePath": "https://concurrency.playback.dazn-stage.com/v2/concurrency/lock/"
            },
            "v3": {
                "ServicePath": "https://concurrency.playback.dazn-stage.com/v3/concurrency/lock/"
            }
        }
    },
    "ResourceStrings": {
        "Versions": {
            "v1": {
                "ServicePath": "https://resource-strings.acc.indazn.com/v1/eu/preview"
            }
        }
    },
    "SearchV2": {
        "Versions": {
            "v1": {
                "ServicePath": "https://search.discovery.dazn-stage.com/v1/search"
            }
        }
    },
    "PushNotificationDevices": {
        "Versions": {
            "v1": {
                "ServicePath": "https://favouritesv2.discovery.dazn-stage.com/v2/devices"
            }
        }
    },
    "PushNotificationReminders": {
        "Versions": {
            "v1": {
                "ServicePath": "https://favouritesv2.discovery.dazn-stage.com/v2/reminders"
            }
        }
    },
    "Favourites": {
        "Versions": {
            "v1": {
                "ServicePath": "https://favouritesv2.discovery.dazn-stage.com/v2"
            },
            "v3": {
                "ServicePath": "https://favouritesv2.discovery.dazn-stage.com/v3"
            }
        }
    },
    "Segmentation": {
        "Versions": {
            "v1": {
                "ServicePath": "https://segmentation-service-api.discovery.dazn-stage.com/v1"
            }
        }
    },
    "PartnerAPIGateway": {
        "Versions": {
            "v1": {
                "ServicePath": "https://partner-api-gateway.ar.dazn-stage.com/api"
            }
        }
    },
    "PersonalisedRail": {
        "Versions": {
            "v2": {
                "ServicePath": "https://prail.discovery.dazn-stage.com/v2/personalised-rail-service"
            }
        }
    },
    "FollowShortcuts": {
        "Versions": {
            "v1": {
                "ServicePath": "https://follow-shortcuts.discovery.dazn-stage.com/v1/follow-shortcuts"
            }
        }
    },
    "ApplePromoOfferSignature": {
        "Versions": {
            "v2": {
                "ServicePath": "https://tpp-subs-global-default.ar.dazn-stage.com/api/v2/promo-offer-signature/apple"
            }
        }
    },
    "UserDetails": {
        "Versions": {
            "v1": {
                "ServicePath": "https://my-account-stage.ar.dazn-stage.com/v1/user"
            }
        }
    },
    "Devices": {
        "Versions": {
            "v1": {
                "ServicePath": "https://my-account-stage.ar.dazn-stage.com/v1/devices"
            }
        }
    },
    "UpdateContentCountry": {
        "Versions": {
            "v1": {
                "ServicePath": "https://my-account-stage.ar.dazn-stage.com/v1/users/content-country"
            }
        }
    },
    "Subscriptions": {
        "Versions": {
            "v1": {
                "ServicePath": "https://subscriptions-service-stage.ar.dazn-stage.com/fe/v1/subscriptions"
            },
            "v2": {
                "ServicePath": "https://subscriptions-service-stage.ar.dazn-stage.com/fe/v2/subscriptions"
            }
        }
    },
    "PauseConfirmedImages": {
        "Versions": {
            "v1": {
                "ServicePath": "https://pause-confirmed-marketing-images-stage.s3.eu-central-1.amazonaws.com/"
            }
        }
    },
    "PaymentMethod": {
        "Versions": {
            "v1": {
                "ServicePath": "https://subscriptions-service-stage.ar.dazn-stage.com/fe/v1/payment-method"
            }
        }
    },
    "MyAccountPayments": {
        "Versions": {
            "v1": {
                "ServicePath": "https://myaccount-payments-be-eu-central-1.ar.dazn-stage.com/v1"
            }
        }
    },
    "MyAccountSubscriptions": {
        "Versions": {
            "v1": {
                "ServicePath": "https://myaccount-be.ar.dazn-stage.com/v1"
            }
        }
    },
    "MyAccountWebBff": {
        "Versions": {
            "v1": {
                "ServicePath": "https://myaccount-web-bff.ar.dazn-stage.com/v1"
            },
            "v2": {
                "ServicePath": "https://myaccount-bff.ar.dazn-stage.com/v1"
            },
            "v3": {
                "ServicePath": "https://myaccount-bff.ar.dazn-stage.com/v2"
            }
        }
    },
    "Pubby": {
        "Versions": {
            "v1": {
                "ServicePath": "wss://pubby.dazn-stage.com"
            }
        }
    },
    "TotalRekall": {
        "Versions": {
            "v1": {
                "ServicePath": "https://total-rekall.metrics.dazn-stage.com/v1/heartbeats"
            }
        }
    },
    "SportsdataMatchesCompetition": {
        "Versions": {
            "v1": {
                "ServicePath": "https://matches.sd.dazn-stage.com/competition"
            }
        }
    },
    "SportsdataMatchesCompetitor": {
        "Versions": {
            "v1": {
                "ServicePath": "https://matches.sd.dazn-stage.com/competitor"
            }
        }
    },
    "SportsdataMatchesFixture": {
        "Versions": {
            "v1": {
                "ServicePath": "https://matches.sd.dazn-stage.com/fixture"
            }
        }
    },
    "SportsdataDatePickerCompetition": {
        "Versions": {
            "v1": {
                "ServicePath": "https://matches-datepicker.sd.dazn-stage.com/competition"
            }
        }
    },
    "SportsdataDatePickerCompetitor": {
        "Versions": {
            "v1": {
                "ServicePath": "https://matches-datepicker.sd.dazn-stage.com/competitor"
            }
        }
    },
    "DcbComposer": {
        "Versions": {
            "v1": {
                "ServicePath": "https://service-dcb-transactions-web-api.ar.dazn-stage.com/api/v1/composer/component"
            }
        }
    },
    "DcbTransactions": {
        "Versions": {
            "v1": {
                "ServicePath": "https://service-dcb-transactions-web-api.ar.dazn-stage.com/v1/dcb-transactions/public/transactions"
            }
        }
    },
    "DcbEntitlement": {
        "Versions": {
            "v1": {
                "ServicePath": "https://service-dcb-entitlement-api.ar.dazn-stage.com/v1/dcb-entitlement/public/entitlements"
            }
        }
    },
    "DcbBundles": {
        "Versions": {
            "v1": {
                "ServicePath": "https://service-dcb-bundles-orchestrator.ar.dazn-stage.com/api/v1/dcb-bundles/subscriptions"
            }
        }
    },
    "EventRelated": {
        "Versions": {
            "v7": {
                "ServicePath": "https://event.discovery.dazn-stage.com/eu/v7/eventrelated"
            },
            "v6": {
                "ServicePath": "https://event.discovery.dazn-stage.com/eu/v6/eventrelated"
            }
        }
    },
    "EpgWithDateRange": {
        "Versions": {
            "v5": {
                "ServicePath": "https://epg.discovery.dazn-stage.com/eu/v5/epgWithDatesRange"
            },
            "v4": {
                "ServicePath": "https://epg.discovery.dazn-stage.com/eu/v4/epgWithDatesRange"
            },
            "v3": {
                "ServicePath": "https://epg.discovery.dazn-stage.com/eu/v3/epgWithDatesRange"
            }
        }
    },
    "Epg": {
        "Versions": {
            "v5": {
                "ServicePath": "https://epg.discovery.dazn-stage.com/eu/v5/Epg"
            },
            "v4": {
                "ServicePath": "https://epg.discovery.dazn-stage.com/eu/v4/Epg"
            },
            "v3": {
                "ServicePath": "https://epg.discovery.dazn-stage.com/eu/v3/Epg"
            },
            "v2": {
                "ServicePath": "https://epg.discovery.dazn-stage.com/eu/v2/Epg"
            },
            "v1": {
                "ServicePath": "https://epg.discovery.dazn-stage.com/eu/v1/Epg"
            }
        }
    },
    "CardsPreflight": {
        "Versions": {
            "v1": {
                "ServicePath": "https://secure-card-auth.payments.dazn-stage.com/v1"
            }
        }
    },
    "Paynow": {
        "Versions": {
            "v1": {
                "ServicePath": "https://paynow.payments.dazn-stage.com/v1"
            }
        }
    },
    "DeviceRegistration": {
        "Versions": {
            "v1": {
                "ServicePath": "https://second-screen-stage.ar.dazn-stage.com/v1/subscribe/deviceregistration"
            }
        }
    },
    "SecondScreenCampaignDetails": {
        "Versions": {
            "v1": {
                "ServicePath": "https://second-screen-stage.ar.dazn-stage.com/v1/subscribe/oemdetails"
            }
        }
    },
    "PlayReadyInitiator": {
        "Versions": {
            "v2": {
                "ServicePath": "https://pr.playback.dazn-stage.com/v2/PlayreadyInitiator"
            }
        }
    },
    "Onboarding-Feature": {
        "Versions": {
            "v1": {
                "ServicePath": "https://onboarding.dazn-stage.com/feature"
            }
        }
    },
    "Onboarding-OnboardedFeatures": {
        "Versions": {
            "v1": {
                "ServicePath": "https://onboarding.dazn-stage.com/onboardedfeatures"
            }
        }
    },
    "SamsungSmartHubPersonal": {
        "Versions": {
            "v1": {
                "ServicePath": "https://samsung-smarthub.discovery.dazn-stage.com/eu/feed"
            }
        }
    },
    "LpContentProxy": {
        "Versions": {
            "v1": {
                "ServicePath": "https://lp-content-proxy.ar.dazn-stage.com/v1"
            }
        }
    },
    "Referral": {
        "Versions": {
            "v1": {
                "ServicePath": "https://referral.ar.dazn-stage.com/v1"
            }
        }
    },
    "PartnershipContent": {
        "Versions": {
            "v1": {
                "ServicePath": "https://pcm-content-global.acc.dazn-stage.com"
            }
        }
    },
    "Spolo": {
        "Versions": {
            "v1": {
                "ServicePath": "https://spolo-public-api-global.acc.indazn.com/v1"
            }
        }
    },
    "MarketingPreferences": {
        "Versions": {
            "v2": {
                "ServicePath": "https://user-preferences.ar.dazn-stage.com/v2/userPreferences/marketingPreferences"
            }
        }
    },
    "ExplicitLink": {
        "Versions": {
            "v1": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v1/ExplicitLink"
            }
        }
    },
    "Authenticate": {
        "Versions": {
            "v1": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v1/Authenticate"
            }
        }
    },
    "Register": {
        "Versions": {
            "v1": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v1/Register"
            }
        }
    },
    "TemporaryTokenExchange": {
        "Versions": {
            "v1": {
                "ServicePath": "https://ott-authz-bff-stage.ar.dazn-stage.com/v1/exchange-temp-token"
            }
        }
    },
    "GenerateTempToken": {
        "Versions": {
            "v1": {
                "ServicePath": "https://ott-authz-bff-stage.ar.dazn-stage.com/v1/generate-temp-token"
            }
        }
    },
    "StaticAssets": {
        "Versions": {
            "v1": {
                "ServicePath": "https://static.dazndn.com"
            }
        }
    },
    "Experiments": {
        "Versions": {
            "v1": {
                "ServicePath": "https://experiments-api.acc.indazn.com/v1/preview"
            }
        }
    },
    "ErrorIngest": {
        "Versions": {
            "v1": {
                "ServicePath": "https://ufe-stage.telemetry.indazn.com/"
            }
        }
    },
    "DttEvents": {
        "Versions": {
            "v1": {
                "ServicePath": "https://static.ld.dazn-stage.com/dtt-events.json"
            }
        }
    },
    "SecondScreenQR": {
        "Versions": {
            "v1": {
                "ServicePath": "https://second-screen-stage.ar.dazn-stage.com/v1/subscribe/qr"
            },
            "v2": {
                "ServicePath": "https://second-screen-stage.ar.dazn-stage.com/v2/subscribe/qr"
            }
        }
    },
    "SecondScreenDeviceToken": {
        "Versions": {
            "v1": {
                "ServicePath": "https://second-screen-stage.ar.dazn-stage.com/v1/subscribed/"
            }
        }
    },
    "LandingPageManager": {
        "Versions": {
            "v1": {
                "ServicePath": "https://tv-landingpage-manager-client.acc.indazn.com/"
            }
        }
    },
    "LandingPageClient": {
        "Versions": {
            "v1": {
                "ServicePath": "https://8chb3qr5f2.execute-api.eu-central-1.amazonaws.com/"
            },
            "v2": {
                "ServicePath": "https://6gw6r4964e.execute-api.eu-central-1.amazonaws.com/"
            }
        }
    },
    "LdStaticAssets": {
        "Versions": {
            "v1": {
                "ServicePath": "https://static.ld.dazn-stage.com"
            }
        }
    },
    "EntitlementUsers": {
        "Versions": {
            "v1": {
                "ServicePath": "https://entitlement-users.stage.dazn-gateway.com/v1/entitlements"
            }
        }
    },
    "KeymomentsClips": {
        "Versions": {
            "v1": {
                "ServicePath": "https://clips.sd.dazn-stage.com/clips"
            }
        }
    },
    "UserPreferences": {
        "Versions": {
            "v1": {
                "ServicePath": "https://user-preferences.ar.dazn-stage.com"
            }
        }
    },
    "Identities": {
        "Versions": {
            "v1": {
                "ServicePath": "https://identity-bff-stage.auth.dazn-stage.com/v1/Identities"
            }
        }
    },
    "StartEmailVerification": {
        "Versions": {
            "v1": {
                "ServicePath": "https://identity-bff-stage.auth.dazn-stage.com/v1/StartEmailVerification"
            },
            "v2": {
                "ServicePath": "https://identity-bff-stage.auth.dazn-stage.com/v2/StartEmailVerification"
            },
            "v3": {
                "ServicePath": "https://identity-bff-stage.auth.dazn-stage.com/v3/SignUpEmailVerification"
            }
        }
    },
    "CompleteEmailVerification": {
        "Versions": {
            "v1": {
                "ServicePath": "https://identity-bff-stage.auth.dazn-stage.com/v1/CompleteEmailVerification"
            },
            "v2": {
                "ServicePath": "https://identity-bff-stage.auth.dazn-stage.com/v2/CompleteEmailVerification"
            },
            "v3": {
                "ServicePath": "https://identity-bff-stage.auth.dazn-stage.com/v3/CompleteSignUpEmailVerification"
            }
        }
    },
    "DPP": {
        "Versions": {
            "v1": {
                "ServicePath": "https://dpp.playback.dazn-stage.com/v1/data"
            }
        }
    },
    "MovistarPACIpAuthentication": {
        "Versions": {
            "v1": {
                "ServicePath": "https://psmgrpri.lab.imagenio.telefonica.net"
            },
            "v2": {
                "ServicePath": "https://samos.svp.video.telefonicaservices.com"
            }
        }
    },
    "DAZNXNtpServer": {
        "Versions": {
            "v3": {
                "ServicePath": "time.aws.com"
            }
        }
    },
    "ECTokens": {
        "Versions": {
            "v2": {
                "ServicePath": "https://engagementcloud.stage.dazn-gateway.com/eu/v2/tokens"
            }
        }
    },
    "ECUserData": {
        "Versions": {
            "v2": {
                "ServicePath": "https://engagementcloud.stage.dazn-gateway.com/eu/v2/userdata"
            }
        }
    },
    "MyDaznExperience": {
        "Versions": {
            "v1": {
                "ServicePath": "https://my-dazn-experience-api.stage.dazn-gateway.com/api/v1"
            }
        }
    },
    "UserMessages": {
        "Versions": {
            "v1": {
                "ServicePath": "https://ums-api.ar.dazn-stage.com/v1"
            },
            "v2": {
                "ServicePath": "https://ums-api.ar.dazn-stage.com/v2"
            }
        }
    },
    "WatchNext": {
        "Versions": {
            "v1": {
                "ServicePath": "https://watch-next.discovery.dazn-stage.com/v1/watch-next"
            }
        }
    },
    "PersonalisedWatchNext": {
        "Versions": {
            "v1": {
                "ServicePath": "https://watch-next.discovery.dazn-stage.com/v1/personalised-watch-next"
            }
        }
    },
    "Picks": {
        "Versions": {
            "v1": {
                "ServicePath": "https://dazn-picks-svc.picks.dazn-stage.com"
            }
        }
    },
    "OrderOrchestrator": {
        "Versions": {
            "v1": {
                "ServicePath": "https://order-orchestrator.ar.dazn-stage.com/v1"
            }
        }
    },
    "Authorize": {
        "Versions": {
            "v1": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v1/Authorize"
            }
        }
    },
    "PartnerOnBoarding": {
        "Versions": {
            "v1": {
                "ServicePath": "https://partner-onboarding.ar.dazn-stage.com"
            }
        }
    },
    "ValidateEmail": {
        "Versions": {
            "v1": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v1/validate-email"
            }
        }
    },
    "PartnerToken": {
        "Versions": {
            "v1": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v1/partners/token"
            }
        }
    },
    "DAZNX": {
        "Versions": {
            "v1": {
                "ServicePath": "https://engagementcloud.stage.dazn-gateway.com/eu/v1"
            },
            "v2": {
                "ServicePath": "https://engagementcloud.stage.dazn-gateway.com/eu/v2"
            },
            "v3": {
                "ServicePath": "https://engagementcloud.stage.dazn-gateway.com/eu/v3"
            },
            "v4": {
                "ServicePath": "https://engagementcloud.stage.dazn-gateway.com/eu/v4"
            },
            "v5": {
                "ServicePath": "https://engagementcloud.stage.dazn-gateway.com/eu/v5"
            },
            "v6": {
                "ServicePath": "https://engagementcloud.stage.dazn-gateway.com/eu/v6"
            }
        }
    },
    "DAZNX-CDN": {
        "Versions": {
            "v1": {
                "ServicePath": "https://cdn.daznx.dazn-stage.com"
            },
            "v4": {
                "ServicePath": "https://cdn.daznx.dazn-stage.com/v4"
            },
            "v5": {
                "ServicePath": "https://cdn.daznx.dazn-stage.com/v5"
            }
        }
    },
    "NielsenConfig": {
        "Versions": {
            "v1": {
                "ServicePath": "https://static-www.fe.dazn-stage.com/nielsen-config.json"
            }
        }
    },
    "NFLCompetitions": {
        "Versions": {
            "v1": {
                "ServicePath": "https://static-www.fe.dazn-stage.com/nfl-competitions.json"
            }
        }
    },
    "LivePreRollConfig": {
        "Versions": {
            "v1": {
                "ServicePath": "https://static-www.fe.dazn-stage.com/livepreroll-config.json"
            }
        }
    },
    "LPRSSAIConfig": {
        "Versions": {
            "v1": {
                "ServicePath": "https://static-www.fe.dazn-stage.com/lprssai-config.json"
            }
        }
    },
    "TheEditNews": {
        "Versions": {
            "v1": {
                "ServicePath": "https://the-edit-news-rail.news.dazn-stage.com/"
            }
        }
    },
    "TheEditNewsCategory": {
        "Versions": {
            "v1": {
                "ServicePath": "https://the-edit-news-rail.news.dazn-stage.com/category/"
            }
        }
    },
    "BackendConfigs": {
        "Versions": {
            "v1": {
                "ServicePath": "https://backend-configs.core.dazn-stage.com/"
            }
        }
    },
    "PartnerUserDetails": {
        "Versions": {
            "v1": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v1/getPartnerUserDetails"
            }
        }
    },
    "DaimaniPartnerIntegration": {
        "Versions": {
            "v1": {
                "ServicePath": "https://partner-integration.ar.dazn-dev.com/orders/daimani/v1"
            }
        }
    },
    "PartnerIntegrations": {
        "Versions": {
            "v1": {
                "ServicePath": "https://partner-integration.ar.dazn-stage.com/"
            },
            "v2": {
                "ServicePath": "https://partner-integration-service.ar.dazn-stage.com/"
            }
        }
    },
    "PartnerIntegrationsOrders": {
        "Versions": {
            "v1": {
                "ServicePath": "https://partner-integration.ar.dazn-stage.com/orders/v1"
            }
        }
    },
    "ZendeskCreatePartnerAuthToken": {
        "Versions": {
            "v1": {
                "ServicePath": "https://partner-integration-service.ar.dazn-stage.com/v1/createPartnerAuthToken/zendesk"
            }
        }
    },
    "AccessZendeskWithJwtToken": {
        "Versions": {
            "v1": {
                "ServicePath": "https://daznsupport1705599165.zendesk.com/access/jwt"
            }
        }
    },
    "PartnerOutboundIntegration": {
        "Versions": {
            "v1": {
                "ServicePath": "https://partner-outbound-integration.ar.dazn-stage.com/v1"
            }
        }
    },
    "ShoppableAds": {
        "Versions": {
            "v1": {
                "ServicePath": "https://shop.adtech.dazn-stage.com"
            }
        }
    },
    "AdTechEmail": {
        "Versions": {
            "v1": {
                "ServicePath": "https://adtechemailservice.adtech.dazn-stage.com/emails"
            }
        }
    },
    "B2BSignIn": {
        "Versions": {
            "v1": {
                "ServicePath": "https://b2bproxy.ar.dazn-stage.com/v1/b2b/sign-in"
            }
        }
    },
    "DaznAccessToken": {
        "Versions": {
            "v1": {
                "ServicePath": "https://partner-integration-service.ar.dazn-stage.com/v1/getDaznAccessToken"
            }
        }
    },
    "DaznAuthCode": {
        "Versions": {
            "v1": {
                "ServicePath": "https://partner-integration-service.ar.dazn-stage.com/v1/getDaznAuthCode"
            }
        }
    },
    "LinearChannels": {
        "Versions": {
            "v4": {
                "ServicePath": "https://linear-rail-all.discovery.dazn-stage.com/eu/v4/Rail"
            }
        }
    },
    "TppSubscribedCall": {
        "Versions": {
            "v1": {
                "ServicePath": "https://tpp-external-purchase.ar.dazn-stage.com/v1/subscribed"
            }
        }
    },
    "TppRetrievePurchaseContext": {
        "Versions": {
            "v1": {
                "ServicePath": "https://tpp-external-purchase.ar.dazn-stage.com/v1/retrievePurchaseContext"
            }
        }
    },
    "TppGeneratePurchaseContext": {
        "Versions": {
            "v1": {
                "ServicePath": "https://tpp-external-purchase.ar.dazn-stage.com/v1/generatePurchaseContext"
            }
        }
    },
    "LiveRamp": {
        "Versions": {
            "v1": {
                "ServicePath": "https://api.rlcdn.com/api/identity/v2/envelope?pid=14269"
            }
        }
    },
    "SportsBettingService": {
        "Versions": {
            "v1": {
                "ServicePath": "https://sports-betting-service.picks.dazn-stage.com/v1"
            }
        }
    },
    "Sports Data Stats": {
        "Versions": {
            "v1": {
                "ServicePath": "https://sports-data-stats-api.sd.dazn-stage.com/v1/boxing-fighter-rankings"
            }
        }
    },
    "Sports Boxing Metadata": {
        "Versions": {
            "v1": {
                "ServicePath": "https://sports-data-stats-api.sd.dazn-stage.com/v1/metadata/boxing"
            }
        }
    },
    "AnonymousToken": {
        "Versions": {
            "v1": {
                "ServicePath": "https://authentication-stage.ar.dazn-stage.com/v1/anonymous-user"
            }
        }
    },
    "DAZNX-BE": {
        "Versions": {
            "v1": {
                "ServicePath": "https://engagement-cloud.daznx.dazn-stage.com"
            }
        }
    }
};

const emptyRoomData = {
    roomId: '',
    partyType: '',
    roomState: '',
    isInternal: false,
};

const getBaseUrl = (isV4: boolean, isV5: boolean) =>
    isV4
        ? `${startupData['DAZNX-CDN']?.Versions?.v4?.ServicePath}/rooms`
        : isV5
          ? `${startupData['DAZNX-CDN']?.Versions?.v5?.ServicePath}/rooms`
          : `${startupData?.DAZNX?.Versions?.v3?.ServicePath}/rooms`;

const requestRoomInfoPerEvent = async ({
    eventId,
    isV4,
    isV5,
    controller,
    axiosInstance,
}: {
    eventId: string;
    isV4: boolean;
    isV5: boolean;
    controller: AbortController;
    axiosInstance: any;
}): Promise<{
    status: number;
    data: TRoomData;
}> => {
    const baseUrl = getBaseUrl(isV4, isV5);
    const url = `${baseUrl}/event/${eventId}`;

    const res: AxiosResponse<TRoomDataResponse> = await axiosInstance.get(url, {
        signal: controller.signal,
    });

    return {
        status: res.status,
        data: {
            roomId: res?.data?.roomId || '',
            partyType: res?.data?.type || '',
            roomState: res?.data?.state || '',
            isInternal: res?.data?.internal || false,
        },
    };
};

const useRoomData = ({
    isAuthTokenValid,
    eventId,
    isV4,
    isV5,
    axiosInstance,
}: {
    isAuthTokenValid: boolean;
    eventId: string;
    isV4: boolean;
    isV5: boolean;
    axiosInstance: any;
}): {roomId: string; isInternal: boolean} => {
    const [roomData, setRoomData] = useState<TRoomData>(emptyRoomData);

    useEffect(() => {
        const controller = new AbortController();

        // if (isAuthTokenValid && !!eventId && eventType === MediaType.LIVE) {
        if (isAuthTokenValid && !!eventId) {
            requestRoomInfoPerEvent({eventId, isV4, isV5, controller, axiosInstance})
                .then(r => setRoomData(r.data))
                .catch(() => setRoomData(emptyRoomData));
        }

        return () => {
            controller.abort();
        };
    // }, [isAuthTokenValid, eventId, isV4, eventType]);
    }, [isAuthTokenValid, eventId, isV4]);

    return {...roomData};
};

export {useRoomData};
