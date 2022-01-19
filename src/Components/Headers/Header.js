import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import Logo from '../UI/Logo/Logo';
import classes from './Header.module.css';
import SettingsIcon from '../../assets/Vector.png';
import ReportsIcon from '../../assets/Vector2.png';
import ModalSettings from './Settings/Settings';
import loginIcon from '../../assets/loginIcon.png';

const Header = () => {
  const [isShowSettings, setIsShowSettings] = useState(false);

  const showHandler = () => {
    setIsShowSettings((prevState) => !prevState);
  };

  const updatedPomodoro = () => {
    document.location.reload();
  };

  return (
    <>
      <div className={classes.container}>
        <Logo onClick={updatedPomodoro} />
        <ul className={classes.nav}>
          <li>
            <Button onClick={showHandler}>
              <img
                src={SettingsIcon}
                style={{ width: '15px', marginRight: '5px' }}
                alt="/"
              />
              Settings
            </Button>
            {isShowSettings ? <ModalSettings showSetings={showHandler} /> : ''}
          </li>
          <li>
            <Button>
              <img
                src={ReportsIcon}
                style={{ width: '15px', marginRight: '5px' }}
                alt="/"
              ></img>
              Reports
            </Button>
          </li>
          <li>
            <Button>
              <img
                style={{
                  width: '18px',
                  marginRight: '5px',
                  color: 'white',
                }}
                src={loginIcon}
                alt="/"
              />
              Login
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
