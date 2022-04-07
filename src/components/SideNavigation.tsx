import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UploadOutlined, CopyOutlined, AudioOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { SubMenu } = Menu;

export const SideNavigation: FC = () => {
    const [current, setCurrent] = useState<any>();

    const handleClick = (e: any) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={handleClick}
            style={{ width: 130 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            <Menu.Item key="1" icon={<CopyOutlined />}>
                <Link to="/text">Input Text</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UploadOutlined />}>
                <Link to="/csv">Input CSV</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<AudioOutlined />}>
                <Link to="/record">Audio Record</Link>
            </Menu.Item>
        </Menu>
    );
};
