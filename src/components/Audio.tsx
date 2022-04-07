import { useState } from 'react';
import { Spin, Upload, message, Button, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Service } from '../services/service';

const { Dragger } = Upload;

export const Audio = () => {
    const [spinner, setSpinner] = useState(false);
    const [result, setResult] = useState<{
        model_string: string;
        prediction: string;
    } | null>(null);
    const [files, setFiles] = useState<any[]>([]);

    const predict = async () => {
        if (files.length) {
            const service = new Service();
            setSpinner(true);
            setResult(null);
            message.info('Kindly wait while we process...');
            try {
                const result = await service.predictFile(files[0]);
                setResult(result as any);
                message.success('Successfully predicted.');
                setFiles([]);
            } catch (e: any) {
                message.error('Something went wrong.');
                setResult(null);
            } finally {
                setTimeout(() => {
                    setSpinner(false);
                }, 2000);
            }
        }
    };

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
                <div>{JSON.stringify(files)}</div>
                <Dragger
                    {...{
                        name: 'file',
                        multiple: true,
                        onChange(info: any) {
                            const { status } = info.file;
                            if (status !== 'uploading') {
                                console.log(info.file, info.fileList);
                            }
                            if (status === 'done') {
                                setFiles([...files, info.file]);
                                // message.success(
                                //     `${info.file.name} file uploaded successfully.`
                                // );
                            } else if (status === 'error') {
                                message.error(
                                    `${info.file.name} file upload failed.`
                                );
                            }
                        },
                        onDrop(e: any) {
                            console.log('Dropped files', e.dataTransfer.files);
                        },
                        onRemove: (file) => {
                            const newFiles = files;
                            newFiles.splice(files.indexOf(file), 1);
                            setFiles(newFiles);
                        },
                        // fileList: files,
                        customRequest: (options) => {
                            if (options.onSuccess) {
                                options.onSuccess({}, {} as any);
                            }
                        },
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit
                        from uploading company data or other band files
                    </p>
                </Dragger>
                <div
                    style={{
                        marginTop: '3rem',
                        textAlign: 'center',
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={predict}
                        disabled={files.length === 0}
                    >
                        Predict
                    </Button>
                </div>
            </div>
        </Spin>
    );
};
