import React, { useState } from 'react';
import axios from 'axios';
import Logo from "../assets/logo.png";
import Settings from "../assets/setting-2.png";
import CloseBtn from "../assets/close-circle.png";
import Monitor from "../assets/monitor.png";
import CurTab from "../assets/copy.png";
import Camera from "../assets/camera.png";
import Mic from "../assets/microphone.png";
import Circle from "../assets/Button.png";

const Popup = () => {
  // Define a style object to apply font-family
  const title = {
    fontFamily: "'Sora', sans-serif",
  };
  const text = {
    fontFamily: "'Work Sans', sans-serif",
  };

  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

      const mediaRecorderInstance = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorderInstance);

      mediaRecorderInstance.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks([...recordedChunks, event.data]);
        }
      };

      mediaRecorderInstance.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        // Do something with the recorded video URL (e.g., save, play, or send it).
        console.log('Recorded Video URL:', url);

        // Cleanup recorded chunks
        setRecordedChunks([]);
      };

      mediaRecorderInstance.start();
      setRecording(true);
    } catch (error) {
      console.error('Error starting screen recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
  
      // Call the function to send the recorded video
      sendVideoToServer(new Blob(recordedChunks, { type: 'video/webm' }));
    }
  };
  

  const sendVideoToServer = async (blob) => {
    try {
      // Create a FormData object and append the video Blob to it
      const formData = new FormData();
      formData.append('video', blob, 'recorded-video.webm'); // 'recorded-video.webm' is the desired filename
  
      // Make a POST request to your API endpoint
      const response = await axios.post('https://your-api-endpoint.com/upload-video', formData);
  
      // Handle the response, e.g., show a success message or update the UI
      console.log('Video upload response:', response.data);
    } catch (error) {
      // Handle any errors, e.g., show an error message
      console.error('Error uploading video:', error);
    }
  };
  return (
    <div className="w-[300px] h-[450px] p-[24px] flex flex-col justify-between">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" />
          <p style={title} className="font-bold text-[#120B48]">
            HelpMeOut
          </p>
        </div>
        <div className="flex gap-4">
          <img src={Settings} alt="" />
          <img src={CloseBtn} alt="" />
        </div>
      </header>

      <section className="">
        <p style={text} className="w-[225px] text-[14px]">
          This extension helps you record and share help videos with ease.
        </p>
      </section>

      <section className="flex justify-evenly">
        <div className="flex flex-col items-center">
          <img src={Monitor} alt="" />
          <p style={text} className="text-[14px]">
            Full Screen
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img src={CurTab} alt="" />
          <p style={text} className="text-[14px]">
            Current Tab
          </p>
        </div>
      </section>

      <section className="">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-[1px] border-[#120B48] p-[12px] rounded-xl">
            <div className="flex items-center gap-2">
              <img src={Camera} alt="" />
              <p style={text} className="text-[14px]">
                Camera
              </p>
            </div>
            <div className="w-10 h-5 bg-[#120B48] rounded-3xl">
              <img src={Circle} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between border-[1px] border-black p-[12px] rounded-xl">
            <div className="flex items-center gap-2">
              <img src={Mic} alt="" />
              <p style={text} className="text-[14px]">
                Audio
              </p>
            </div>
            <div className="w-10 h-5 bg-[#120B48] rounded-3xl">
              <img src={Circle} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className=''>
        {recording ? (
          <button onClick={stopRecording} style={text} className='bg-red-500 p-[16px] text-white w-[100%] rounded-[12px]'>
            Stop Recording
          </button>
        ) : (
          <button onClick={startRecording} style={text} className='bg-[#120B48] p-[16px] text-white w-[100%] rounded-[12px]'>
            Start Recording
          </button>
        )}
      </section>
    </div>
  );
};

export default Popup;
