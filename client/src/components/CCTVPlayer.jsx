// C:\PoliceAI-Command-Center\client\src\components\CCTVPlayer.jsx
import { useState, useEffect, useRef } from "react";
import { Radio, Maximize2, Minimize2 } from "lucide-react";


const CCTVPlayer = ({ camera }) => {

  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);



  useEffect(() => {

    const handleFsChange = () => {
      setIsFullscreen(
        document.fullscreenElement === containerRef.current
      );
    };


    document.addEventListener(
      "fullscreenchange",
      handleFsChange
    );


    return () =>
      document.removeEventListener(
        "fullscreenchange",
        handleFsChange
      );

  }, []);



  const toggleFullscreen = () => {

    if (!document.fullscreenElement) {

      containerRef.current?.requestFullscreen?.();

    } else {

      document.exitFullscreen?.();

    }

  };



  if (!camera) {
    return (
      <div className="bg-slate-900 text-white p-5 rounded-xl">
        No camera selected
      </div>
    );
  }



  const isOnline = camera.status === "online";



  return (

    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">


      {/* Camera Header */}

      <div className="flex items-center justify-between px-3 py-2">

        <h2 className="font-bold text-white text-sm tracking-wide">
          {camera.cameraName}
        </h2>


        <div className="flex items-center gap-1.5">

          <span
            className={`h-2 w-2 rounded-full ${
              isOnline
                ? "bg-green-400 animate-pulse"
                : "bg-slate-600"
            }`}
          />


          <span
            className={`text-xs uppercase ${
              isOnline
                ? "text-green-400"
                : "text-slate-500"
            }`}
          >
            {camera.status}
          </span>


        </div>

      </div>





      {/* Video Area */}

      <div
        ref={containerRef}
        className={`relative bg-black group ${
          isFullscreen
            ? "h-screen w-screen"
            : "h-[260px] md:h-[280px]"
        }`}
      >


        {
          camera.streamUrl ? (

            <video
              src={camera.streamUrl}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />

          ) : (

            <div className="h-full w-full flex items-center justify-center text-slate-500 text-sm">

              Waiting for CCTV stream...

            </div>

          )
        }




        {/* CCTV Effects */}

        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_20px_rgba(0,0,0,0.6)]" />


        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(0deg,#fff_0px,transparent_1px,transparent_3px)]" />






        {/* REC */}

        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">

          <Radio
            size={12}
            className="text-red-500 animate-pulse"
          />

          <span className="text-red-500 text-xs font-mono tracking-wider">
            REC
          </span>

        </div>






        {/* Time */}

        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">

          <span className="text-white text-xs font-mono">

            {time.toLocaleTimeString(
              "en-IN",
              {
                hour12:false
              }
            )}

          </span>

        </div>






        {/* Location */}

        <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">

          <span className="text-slate-300 text-xs font-mono">

            {camera.location}

          </span>

        </div>







        {/* Fullscreen */}

        <button

          onClick={toggleFullscreen}

          className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm p-1.5 rounded hover:bg-black/80 transition-colors cursor-pointer"

          title={
            isFullscreen
              ? "Exit fullscreen"
              : "Fullscreen"
          }

        >

          {
            isFullscreen ?

            (
              <Minimize2
                size={14}
                className="text-slate-300"
              />
            )

            :

            (
              <Maximize2
                size={14}
                className="text-slate-300"
              />
            )
          }


        </button>



      </div>


    </div>

  );

};


export default CCTVPlayer;