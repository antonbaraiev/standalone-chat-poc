import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Link, useSearchParams} from "react-router";
import {ChatContainer} from "@dazn/pwp-chat-web";
import {useAuthToken} from "./hooks/useAuthToken/index.ts";
import {useV3JoinFlow, createAxios, setupAxios} from "@dazn/public-watch-party-join-flow";
import {DAZN} from "./utils/dazn.ts";

const ROOM_ID = '0e7744ed-0811-4f5b-a69f-38a896cc1452';
const TOKEN = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6InE0akNLajFtUlE0V2ktSC1FVWY0RExaZWQ1RDNFNnRmMEt2QllzR2JCeGMifQ.eyJ1c2VyIjoiNTJiYzU5ZjktM2FkZi00MjhkLTgyM2ItNTQwMDI1MjZmYmU5IiwiZmlyc3ROYW1lIjoiYW50b24tc3RhZy1kYXpuLWdlcm1hbnkiLCJpc3N1ZWQiOjE3MzM4MzM1NzksInVzZXJzdGF0dXMiOiJBY3RpdmVQYWlkIiwic291cmNlVHlwZSI6IiIsInByb2R1Y3RTdGF0dXMiOnsiRklCQSI6IlBhcnRpYWwiLCJMaWdhU2VndW5kYSI6IlBhcnRpYWwiLCJORkwiOiJQYXJ0aWFsIiwiREFaTiI6IkFjdGl2ZVBhaWQifSwidmlld2VySWQiOiI1NDAwMjUyNmZiZTkiLCJjb3VudHJ5IjoiZGUiLCJjb250ZW50Q291bnRyeSI6ImRlIiwibGFuZ3VhZ2UiOiJlbiIsImlzUHVyY2hhc2FibGUiOnRydWUsImhvbWVDb3VudHJ5IjoiZGUiLCJ1c2VyVHlwZSI6MywiZGV2aWNlSWQiOiI1MmJjNTlmOS0zYWRmLTQyOGQtODIzYi01NDAwMjUyNmZiZTktMDA0MDIzNTgxOCIsImlzRGV2aWNlUGxheWFibGUiOnRydWUsInBsYXlhYmxlRWxpZ2liaWxpdHlTdGF0dXMiOiJQTEFZQUJMRSIsImNhbnJlZGVlbWdjIjoiRW5hYmxlZCIsImp0aSI6IjRiNjE5ZmZjLTJmNGYtNDkxZC04MzIyLWZiN2ZjM2FhYzIyZSIsImlkcFR5cGUiOiJpZHAtcGFzc3dvcmQiLCJwcm92aWRlck5hbWUiOiJkYXpuIiwicHJvdmlkZXJDdXN0b21lcklkIjoiNWNlYWI5YWUtOTEzMy00NDFmLWFlNmMtZTVkMWI4YmM1ODliIiwiZW50aXRsZW1lbnRzIjp7ImVudGl0bGVtZW50U2V0cyI6W3siaWQiOiJ0aWVyX2dvbGRfZGUiLCJwcm9kdWN0R3JvdXAiOiJEQVpOIiwicHJvZHVjdFR5cGUiOiJ0aWVyIiwiZW50aXRsZW1lbnRzIjpbImVudGl0bGVtZW50X211bHRpcGxlX2RldmljZXNfOTk5IiwiZW50aXRsZW1lbnRfYWxsb3dfd2F0Y2hfY29uY3VycmVuY3lfd2l0aF9zaW5nbGVfbG9jYXRpb24iLCJlX3N1cGVyX3Nwb3J0X2RlIiwiZV9zaWx2ZXJfZGUiLCJlX2Jyb256ZV9kZSIsImVfYnJvbnplX3N1cGVyX2RlIiwiZV9icm9uemVfYXJ0X2RlIiwiZV9zaWx2ZXJfYXJ0X2RlIiwiZV9icm9uemVfZml4X2RlIiwiZV9zaWx2ZXJfc3VwZXJfZGUiLCJlX3NlcmllYV9sZWFndWVfZGFjaF9jb21wdCIsImVfYnJvbnplX3N1cGVyX3NpbHZlcl9kZSIsImVfcHJvbW9fZGUiLCJlX3Byb21vX2FydGljbGVfZGUiLCJiYXNlX2Rhem5fY29udGVudCIsImVfYXJ0X3VubGltaXRlZF9jaCJdfV0sImZlYXR1cmVzIjp7IkNPTkNVUlJFTkNZIjp7Im1heF9pcHMiOjEsIm1heF9kZXZpY2VzIjoyfSwiREVWSUNFIjp7ImFjY2Vzc19kZXZpY2UiOiJhbnkiLCJtYXhfcmVnaXN0ZXJlZF9kZXZpY2VzIjo5OTl9fX0sImxpbmtlZFNvY2lhbFBhcnRuZXJzIjpbXSwiZXhwIjoxNzMzODQwNzc5LCJpc3MiOiJodHRwczovL2F1dGguYXIuZGF6bi1zdGFnZS5jb20ifQ.JZLsMO60QGKcoVHl-STF7CbQyrt030YS_SzRVh50LVQqXw3ziolXf9MEBVDJkUkCaKADdupkiR5MFqycFSRgAcraWU-zgZr0EJcfX1XcOQ7zHV6_SJqQhO5dQOv-tii8GlprWRVaMMiIrAp460ak0JlGLJb893MdTsuq1vwdZEjXBDjaE4f1ImRab8ZxAafeaHQHJxdKTR6j5T-F-VrB8MOEotKaLSUe0KxdPRGfvB2RTAQ-YUlQnRPtHGtqujZmECLBPwsv0P_M1kz2hcz89jQaEuK08zW-u_Q7oNDVVLpjpWA5ETCoV9k2t7QuGsBEanTmyGBl0pYUc5ez7mccDQ';

const axiosInstance = createAxios();
axiosInstance.defaults.headers.common = {'Authorization': `Bearer ${TOKEN}`}

const Home = () => {
  return (
      <Link
          to={{
            pathname: "/chat",
            search: `?roomId=${ROOM_ID}&token=${TOKEN}`,
          }}
      >
        Go to chat
      </Link>);
}

const Chat = () => {
  const [userNickname, setUserNickname] = useState();
  const [isError, setIsError] = useState();

  const [searchParams] = useSearchParams();

  const roomId = searchParams.get('roomId') || '';
  const authToken = searchParams.get('token') || '';

  const { userUUid, deviceId, isAuthTokenValid } = useAuthToken(authToken);

    // if (isAuthTokenValid) {
    //     setupAxios(authToken, axiosInstance);
    // }

  const [{pubnubInstanceV3, tokenV3: messengerToken, ntpOffset, roomState, messengerState}] = useV3JoinFlow({
      userUUid,
      axiosInstance,
      roomId,
      deviceId,
      isModerator: false,
      isV3: true,
      isLR: false,
      setUserNickname,
      updateError: setIsError,
      userPassedInternalPartyCheck: true,
  });

  const isUserBlocked = messengerState ? messengerState?.userState !== 'UNBLOCKED' : false;

  if (!userUUid || !deviceId || !isAuthTokenValid) {
      return <div>....</div>
  }

  return (
      <div style={{ boxSizing: "border-box", width: 500, height: 800, padding: 10 }}>
          <ChatContainer
              pubnubInstance={pubnubInstanceV3}
              pwpAuthToken={TOKEN}
              // chatTabActivatedTimestamp={publicWPTabActivatedTimestamp}
              hasErrorOccured={isError}
              roomId={roomId}
              userId={'985653f4-3ec6-4888-bd92-da437bcdaccc'}
              eventId={'3tshicdlhtmntj5zhou75xbed'}
              deviceId={deviceId}
              isModeratorUser={false}
              isBlocked={isUserBlocked}
              syncStatus={'SYNCED'}
              roomState={roomState?.state}
              isDebugMode={true}
              ntpOffset={ntpOffset}
              userDisplayName={userNickname}
              // SaveFirstPartyDataRequest={saveFPDRequest}
              optimizelyParams={{
                  isGenderVisible: false,
                  isAgeVisible: false,
                  isPinnedMessageVisible: true,
                  pinnedMessageExpandedDuration: 2000,
                  isMessageTimestampVisible: true,
                  isPollVisible: false,
                  isQuizzesVisible: true,
                  isLeaderboardVisible: true,
                  pollFinishedCollapsedDelay: 3000,
                  pollFinishedDismissDelay: 3000,
                  isReactionsFeatureEnabled: true,
                  isPromotionLinksV2Enabled: true,
                  reactionsMaxCount: 15,
                  reactionsSpreadLimit: 600,
                  leaderboardLoadingTimeoutMs: 3000,
                  leaderboardLoadingTimeoutRandomDelayMaxMs: 1000,
                  maxUsersShownInLeaderboard: 50,
                  maxHistoryMessages: 200,
                  msgMaxCharacters: 60,
                  isImagesFeatureEnabled: true,
                  isEngagementBreaksFeatureEnabled: true,
                  isGamificationFeatureEnabled: true,
              }}
              channels={{
                  messenger_moderator: `messenger_moderator.${roomId}`,
                  messenger: `messenger.${roomId}`,
                  pinned_messages: `pinned_messages.${roomId}`,
                  reports: `reports.${roomId}`,
                  reactions: `reactions.${roomId}`,
                  polls: `polls.${roomId}`,
                  quizzes: `quizzes.${roomId}`,
                  quizzes_answers: `quizzes_answers.${roomId}`,
                  polls_votes: `polls_votes.${roomId}`,
                  sponsorship: `sponsorship.${roomId}`,
                  messenger_images: `messenger_images.${roomId}`,
                  breaks: `breaks.${roomId}`,
                  fans_battles: `battles.${roomId}`,
              }}
              isRtl={false}
              isSponsorshipPartyType={roomState?.partyType.endsWith('SPONSORSHIP')}
          />
      </div>
  )
}

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="chat" element={<Chat />}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
