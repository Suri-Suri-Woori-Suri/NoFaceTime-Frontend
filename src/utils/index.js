export const copyRoomInvitationLink = (event) => {
  const linkText = document.createElement('textarea');

  linkText.value = event.target.value;
  event.target.appendChild(linkText);
  linkText.focus();
  linkText.select();

  const isSuccessToCopy = document.execCommand('copy');

  if (isSuccessToCopy) {
    alert('Invitation Link Copy!');
  } else {
    alert('Copy Failure');
  }

  event.target.removeChild(linkText);
};

export const handleStreamError = (err) => {
  console.error(err);
};

export const getStream = async (isMuted) => {
  return await navigator.mediaDevices.getUserMedia({
    audio: isMuted,
    video: {
      width: { exact: 500 }
    }
  });
};

export const getCoordinates = (element) => {
  const locationData = element.getBoundingClientRect();
  let { x, y, width, height } = locationData;

  x += window.scrollX;
  y += window.scrollY;

  return { x, y, width, height };
};
