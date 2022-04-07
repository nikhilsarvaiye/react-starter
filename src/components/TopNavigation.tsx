import { FC } from 'react';
import { Menu } from 'antd';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { SubMenu } = Menu;

export const TopNavigation: FC = () => {
    const [current, setCurrent] = useState<any>();

    const handleClick = (e: any) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={{
                justifyContent: 'end',
                alignItems: 'center',
                height: '4rem',
            }}
        >
            <Menu.Item key="user" icon={<UserOutlined />}>
                User
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
                Settings
            </Menu.Item>
        </Menu>
    );
};
