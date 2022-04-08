import { useState } from 'react';
import { Spin, message, Card, Button } from 'antd';
import 'react-voice-recorder/dist/index.css';
import { Service } from '../services/service';
import { useReactMediaRecorder } from 'react-media-recorder';
const RecorderLib = require('react-voice-recorder');
const Recorder = RecorderLib.Recorder;

const RecordView = () => {
    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ video: false });

    return (
        <div>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            {/* <video src={mediaBlobUrl || ''} controls autoPlay loop /> */}
            <audio src={mediaBlobUrl || ''} controls autoPlay loop />
        </div>
    );
};

export const Record = () => {
    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ video: false });

    const [spinner, setSpinner] = useState(false);
    const [result, setResult] = useState<{
        model_string: string;
        prediction: string;
        result: string;
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
        if (file) {
            debugger;
            let blob = await fetch(mediaBlobUrl || '');
            file = await blob.blob();
            console.log(file);
            const service = new Service();
            setSpinner(true);
            setResult(null);
            const f = new File([file], 'filename.wav');
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
        }
    };

    const predict = async () => {
        if (mediaBlobUrl) {
            debugger;
            let blob = await fetch(mediaBlobUrl || '');
            const file = await blob.blob();
            console.log(file);
            const service = new Service();
            setSpinner(true);
            setResult(null);
            const f = new File([file], 'filename.wav');
            message.info('Kindly wait while we process...');
            try {
                const result = await service.predictFile(file as any);
                setResult(result as any);
                message.success('Successfully predicted.');
            } catch (e: any) {
                message.error('Something went wrong.');
                setResult(null);
            } finally {
                setSpinner(false);
            }
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

    return (
        <Spin spinning={spinner}>
            <div
                style={{
                    width: '70%',
                    height: '20em',
                }}
            >
                <Recorder
                    record={true}
                    title={'Record'}
                    audioURL={audio.audioDetails.url}
                    showUIAudio
                    handleAudioStop={(data: any) => handleAudioStop(data)}
                    handleAudioUpload={(data: any) => handleAudioUpload(data)}
                    handleCountDown={(data: any) => handleCountDown(data)}
                    handleReset={() => handleReset()}
                    mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
                />
            </div>
            <div
                style={{
                    marginTop: '10rem'
                }}
            >
                <div>
                    <p>{status}</p>
                    <button onClick={startRecording}>Start Recording</button>
                    <button onClick={stopRecording}>Stop Recording</button>
                    {/* <video src={mediaBlobUrl || ''} controls autoPlay loop /> */}
                    <audio src={mediaBlobUrl || ''} controls autoPlay loop />
                </div>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={predict}
                    disabled={!mediaBlobUrl}
                    loading={spinner}
                >
                    Predict
                </Button>
            </div>
            {result && (
                <Card
                    title="Result"
                    style={{ width: '70%', marginBottom: '3em' }}
                >
                    <p>{result?.model_string}</p>
                    <p>{result?.prediction}</p>
                    <p>{result?.result}</p>
                </Card>
            )}
        </Spin>
    );
};
