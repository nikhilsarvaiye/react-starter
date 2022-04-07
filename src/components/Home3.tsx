import { useState } from 'react';
import 'react-voice-recorder/dist/index.css';
const RecorderLib = require('react-voice-recorder');
const Recorder = RecorderLib.Recorder;

export const Home3 = () => {
    const [audio, setAudio] = useState({
        audioDetails: {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: 0,
                m: 0,
                s: 0,
            },
        },
    });

    const handleAudioStop = (data: any) => {
        console.log(data);
        setAudio({ audioDetails: data });
    };

    const handleAudioUpload = (file: any) => {
        console.log(file);
    };

    const handleCountDown = (data: any) => {
        console.log(data);
    };

    const handleReset = () => {
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: 0,
                m: 0,
                s: 0,
            },
        };
        setAudio({ audioDetails: reset });
    };

    console.log(Recorder);
    return (
        <div
            style={{
                width: '70%',
                height: '20em',
            }}
        >
            <Recorder
                record={true}
                title={'New recording'}
                audioURL={audio.audioDetails.url}
                showUIAudio
                handleAudioStop={(data: any) => handleAudioStop(data)}
                handleAudioUpload={(data: any) => handleAudioUpload(data)}
                handleCountDown={(data: any) => handleCountDown(data)}
                handleReset={() => handleReset()}
                mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
            />
        </div>
    );
};
