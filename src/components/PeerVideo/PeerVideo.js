import React, { useEffect, useRef } from 'react';

const PeerVideo = (props) => {
  const ref = useRef();

  console.log(props.index)
  console.log(props.peer)

  useEffect(() => {
    props.peer.on("stream", stream => {
      ref.current.srcObject = stream;
    })
  }, []);

  return (
    <video playsInline autoPlay ref={ref} />
  );
}

export default PeerVideo;
