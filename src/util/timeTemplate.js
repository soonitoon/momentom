const timeTemplate12H = timeObj => {
  const { hours, minutes, seconds } = timeObj;
  let hoursFor12H;
  if (hours === 0) hoursFor12H = 12;
  if (hours > 12) hoursFor12H = hours - 12;
  const template = `${hoursFor12H}:${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
  return template;
};

const timeTemplate24H = timeObj => {
  const { hours, minutes, seconds } = timeObj;
  const template = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  return template;
};

export { timeTemplate12H, timeTemplate24H };
