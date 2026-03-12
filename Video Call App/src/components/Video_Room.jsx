import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';

const Video_Room = () => {

    const { id } = useParams();

    const meeting = (element) => {
        // generate Kit Token
        const appID = 164452823;
        const serverSecret = "af92b85c51069d1ac2f8dfd2998161fd";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, id, Date.now().toString(), "Himu");
        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element, scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
        })

    }

    return (
        <>
            <div ref={meeting} style={{ width: '100vw', height: '100vh' }}></div>
        </>
    )
}

export default Video_Room