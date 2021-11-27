import initClock from './javascript/clock';
import initWeatherInfo from './javascript/weather';
import initToDo from './javascript/toDo';
import initGretting from './javascript/gretting';
import initBackgroundImage from './javascript/backgroundImage';
import initPopupBtn from './javascript/popup';
import initResetBtn from './javascript/reset';
import './index.css';

const main = () => {
  initClock();
  initGretting();
  initToDo();
  initWeatherInfo();
  initResetBtn();
  initPopupBtn();
  initBackgroundImage();
};

main();
