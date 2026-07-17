// C:\PoliceAI-Command-Center\client\src\components\DashboardAlertPanel.jsx
import { BellRing } from "lucide-react";
import AlertCard from "./AlertCard";


const DashboardAlertPanel = ({data}) => {


const alerts = data?.alerts || [];



return (

<div

className="
bg-slate-950
"

>


<div className="
flex
items-center
gap-3
mb-4
">


<div
className="
bg-red-500/10
p-2
rounded-lg
"
>

<BellRing
className="text-red-400"
/>

</div>



<div>

<h2 className="
text-xl
font-bold
text-white
">

Latest Alerts

</h2>


<p className="
text-slate-400
text-sm
">

AI detected security events

</p>


</div>


</div>







<div className="
space-y-4
">


{

alerts.length > 0

?

alerts.map(alert=>(

<AlertCard

key={alert._id}

alert={alert}

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

No active alerts

</div>

)


}


</div>




</div>


);


};


export default DashboardAlertPanel;