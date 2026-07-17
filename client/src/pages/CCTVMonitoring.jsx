// C:\PoliceAI-Command-Center\client\src\pages\CCTVMonitoring.jsx
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CCTVPlayer from "../components/CCTVPlayer";
import CCTVStats from "../components/CCTVStats";
import AIStatusPanel from "../components/AIStatusPanel";
import useFetch from "../hooks/useFetch";


const CCTVMonitoring = () => {


  const {
    data,
    loading,
    error
  } = useFetch("/cctv");



  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-white">
          Loading CCTV System...
        </p>
      </div>
    );



  if (error)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-red-400">
          Unable to connect CCTV server
        </p>
      </div>
    );



  const cameras = data?.cameras || [];



  return (

    <div className="flex min-h-screen bg-slate-950">


      <Sidebar />


      <div className="flex-1">


        <Navbar />



        <main className="p-6 space-y-6">



          {/* HEADER */}

          <div className="flex justify-between items-center">


            <div>

              <h1 className="text-3xl font-bold text-white">
                AI CCTV Surveillance
              </h1>


              <p className="text-slate-400 mt-1">
                Real-time AI powered camera monitoring
              </p>

            </div>



            <div className="
            bg-green-500/10
            border
            border-green-500/30
            px-4
            py-2
            rounded-full
            text-green-400
            text-sm
            ">

              🟢 System Active

            </div>


          </div>





          {/* CAMERA STATS */}

          <CCTVStats cameras={cameras} />







          {/* 4 CAMERA GRID */}

          <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          ">


            {
              cameras.map((camera)=>(

                <CCTVPlayer

                  key={camera._id}

                  camera={camera}

                />

              ))
            }


          </div>







          {/* AI STATUS */}

          <AIStatusPanel />




          {
            cameras.length===0 && (

              <p className="text-slate-400">
                No cameras registered yet.
              </p>

            )
          }



        </main>


      </div>


    </div>


  );

};


export default CCTVMonitoring;