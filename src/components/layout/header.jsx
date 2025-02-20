import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { BookOutlined, HomeOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Header = () => {
    const [current, setCurrent] = useState('');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'products',
            icon: <BookOutlined />,
        },
        {
            label: 'Cài đặt',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to={"/login"}>Đăng nhập</Link>,
                    key: 'login',
                }, {
                    label: 'Đăng xuất',
                    key: 'logout',
                }
            ]
        }
    ];
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    )
}

export default Header;