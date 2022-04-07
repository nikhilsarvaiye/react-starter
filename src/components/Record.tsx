import { useState } from 'react';
import { Spin, message, Card } from 'antd';
import 'react-voice-recorder/dist/index.css';
import { Service } from '../services/service';
const RecorderLib = require('react-voice-recorder');
const Recorder = RecorderLib.Recorder;

export const Record = () => {
    const [spinner, setSpinner] = useState(false);
    const [result, setResult] = useState<{
        model_string: string;
        prediction: string;
    } | null>(null);
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

    const handleAudioUpload = async (file: any) => {
        console.log(file);
        const service = new Service();
        setSpinner(true);
        setResult(null);
        message.info('Kindly wait while we process...');
        try {
            const result = await service.predictFile(file);
            setResult(result as any);
            message.success('Successfully predicted.');
        } catch (e: any) {
            message.error('Something went wrong.');
            setResult(null);
        } finally {
            setSpinner(false);
        }
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
        <Spin spinning={spinner}>
            {result && (
                <Card
                    title="Result"
                    style={{ width: '70%', marginBottom: '3em' }}
                >
                    <p>{result?.model_string}</p>
                    <p>{result?.prediction}</p>
                </Card>
            )}
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
        </Spin>
    );
};
