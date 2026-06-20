import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import { VideoIcon, ShieldCheckIcon, HeadphonesIcon, InfoIcon } from "lucide-react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [hasJoined, setHasJoined] = useState(false);
  const [joiningInProgress, setJoiningInProgress] = useState(false);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCallClient = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        console.log("Initializing Stream video client...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error initializing call client:", error);
        toast.error("Could not load calling client. Please refresh.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCallClient();
  }, [tokenData, authUser, callId]);

  const handleJoinCall = async () => {
    if (!call) return;
    setJoiningInProgress(true);
    try {
      // Joining call requires user gesture (tap/click) on mobile to request permissions
      await call.join({ create: true });
      setHasJoined(true);
      toast.success("Connected to call room!");
    } catch (error) {
      console.error("Error joining call:", error);
      toast.error(
        "Could not access camera/microphone. Please ensure permissions are enabled in your browser settings!"
      );
    } finally {
      setJoiningInProgress(false);
    }
  };

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen w-screen bg-base-300 flex items-center justify-center p-4">
      {client && call && hasJoined ? (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <CallContent />
          </StreamCall>
        </StreamVideo>
      ) : (
        /* Pre-Join screen: requires User Gesture to satisfy iOS/Android WebRTC safety models */
        <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-content/10 p-6 sm:p-8 rounded-3xl space-y-6 text-center">
          <div className="mx-auto size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <VideoIcon className="size-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Enter Video Room</h1>
            <p className="text-sm opacity-70">
              You are invited to a private 1-on-1 language exchange call.
            </p>
          </div>

          {/* Secure & Permission Tip */}
          <div className="bg-base-200 rounded-2xl p-4 text-left space-y-2.5">
            <div className="flex items-start gap-2.5 text-xs">
              <ShieldCheckIcon className="size-4 text-success shrink-0 mt-0.5" />
              <span>
                <strong>Secure & Private:</strong> Only you and your matched partner can access this session.
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-xs">
              <HeadphonesIcon className="size-4 text-info shrink-0 mt-0.5" />
              <span>
                <strong>Permissions:</strong> The browser will request access to your camera and microphone.
              </span>
            </div>
          </div>

          <button
            onClick={handleJoinCall}
            disabled={joiningInProgress || !call}
            className="btn btn-primary btn-lg w-full font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            {joiningInProgress ? (
              <>
                <span className="loading loading-spinner"></span>
                Connecting...
              </>
            ) : (
              "Join Video Room"
            )}
          </button>

          <div className="flex items-center gap-1.5 justify-center text-[10px] opacity-60">
            <InfoIcon className="size-3" />
            <span>Mobile users must tap to activate audio/video stream.</span>
          </div>
        </div>
      )}
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
