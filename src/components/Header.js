import React from 'react'
import '../styles/App.css';

import {Flex} from 'antd';

const Header = () => {
  return (
    <div class="header">
    <ul>
        <Flex justify="end" gap="10%" align="center">
        <li>Home</li>
        <li>About Us</li>
        <li>Careers</li>
        <li>Logout</li>
        </Flex>
    </ul>
  </div>
  );
}

export default Header