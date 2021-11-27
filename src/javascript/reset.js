const resetBtn = document.querySelector('.js-reset');

const handleReset = () => {
  localStorage.clear();
  window.location.href = './';
};

const initResetBtn = () => resetBtn.addEventListener('click', handleReset);

export default initResetBtn;
