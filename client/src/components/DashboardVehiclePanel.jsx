// C:\PoliceAI-Command-Center\client\src\components\DashboardVehiclePanel.jsx
import { CarFront } from "lucide-react";
import VehicleCard from "./VehicleCard";



const DashboardVehiclePanel = ({data})=>{


const vehicles = data?.vehicles || [];



return (

<div>


<div className="
flex
items-center
gap-3
mb-4
">


<div

className="
bg-blue-500/10
p-2
rounded-lg
"

>

<CarFront
className="text-blue-400"
/>

</div>




<div>


<h2 className="
text-xl
font-bold
text-white
">

Police Vehicles

</h2>


<p className="
text-slate-400
text-sm
">

Live patrol units

</p>


</div>



</div>








<div className="
space-y-4
">


{


vehicles.length > 0

?


vehicles.map(vehicle=>(


<VehicleCard

key={vehicle._id}

vehicle={vehicle}

/>


))


:


(

<div

className="
bg-slate-900
border
border-slate-800
rounded-xl
p-5
text-slate-400
"

>

No vehicles available

</div>

)


}



</div>



</div>

);


};


export default DashboardVehiclePanel;