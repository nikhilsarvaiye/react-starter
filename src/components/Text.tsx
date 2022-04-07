import { useState } from 'react';
import { Form, Input, Button, Spin, message, Card } from 'antd';
import { Service } from '../services/service';

export const Text = () => {
    const [spinner, setSpinner] = useState(false);
    const [result, setResult] = useState<{
        model_string: string;
        prediction: string;
    } | null>(null);

    const onFinish = async (values: any) => {
        console.log('Form Values:', values);
        const service = new Service();
        setSpinner(true);
        setResult(null);
        message.info('Kindly wait while we process...');
        try {
            const result = await service.predictText(values.text);
            setResult(result as any);
            message.success('Successfully predicted.');
        } catch (e: any) {
            message.error('Something went wrong.');
            setResult(null);
        } finally {
            setTimeout(() => {
                setSpinner(false);
            }, 2000);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onChange={() => {
                    setResult(null);
                }}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label="Text"
                    name="text"
                    rules={[
                        { required: true, message: 'Please input your text!' },
                    ]}
                >
                    <Input.TextArea rows={18} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Predict
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};
