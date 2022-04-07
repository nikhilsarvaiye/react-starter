import { useState } from 'react';
import { Spin, Upload, message, Button, Card, Table } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Service } from '../services/service';

const { Dragger } = Upload;

export const Csv = () => {
    const [spinner, setSpinner] = useState(false);
    const [result, setResult] = useState<
        {
            dates_review_data: Date;
            prediction_data: string;
            row_data: string;
        }[]
    >([]);
    const [files, setFiles] = useState<any[]>([]);

    const predict = async () => {
        if (files.length) {
            const service = new Service();
            setSpinner(true);
            setResult([]);
            message.info('Kindly wait while we process...');
            try {
                const result = await service.predictCsv(files[0]);
                setResult(result as any);
                message.success('Successfully predicted.');
                setFiles([]);
            } catch (e: any) {
                message.error('Something went wrong.');
                setResult([]);
            } finally {
                setTimeout(() => {
                    setSpinner(false);
                }, 2000);
            }
        }
    };

    return (
        <Spin spinning={spinner}>
            <div
                style={{
                    width: '70%',
                    height: '20em',
                }}
            >
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
                        loading={spinner}
                    >
                        Predict
                    </Button>
                </div>
            </div>
            {result.length > 0 && (
                <Table
                    dataSource={result}
                    columns={[
                        {
                            title: 'Date',
                            dataIndex: 'date',
                            key: 'date',
                        },
                        {
                            title: 'Data',
                            dataIndex: 'data',
                            key: 'data',
                        },
                        {
                            title: 'Prediction',
                            dataIndex: 'prediction',
                            key: 'prediction',
                        },
                    ]}
                ></Table>
            )}
        </Spin>
    );
};
