// C:\PoliceAI-Command-Center\client\src\components\CCTVStats.jsx
import {
  Camera,
  Radio,
  Wifi,
  WifiOff
} from "lucide-react";


const CCTVStats = ({cameras}) => {


const total = cameras.length;


const online = cameras.filter(
  c=>c.status==="online"
).length;


const offline = total-online;



const cards=[

{
title:"Total Cameras",
value:total,
icon:Camera,
color:"text-blue-400"
},

{
title:"Online",
value:online,
icon:Wifi,
color:"text-green-400"
},

{
title:"Offline",
value:offline,
icon:WifiOff,
color:"text-red-400"
},

{
title:"Recording",
value:"ACTIVE",
icon:Radio,
color:"text-purple-400"
}

];




return (

<div className="
grid
grid-cols-2
xl:grid-cols-4
gap-4
">


{
cards.map((card)=>{


const Icon=card.icon;


return (

<div

key={card.title}

className="
bg-slate-900
border
border-slate-800
rounded-xl
p-5
"

>


<div className="flex justify-between">


<div>


<p className="
text-slate-400
text-sm
">

{card.title}

</p>


<h2 className="
text-3xl
font-bold
text-white
mt-2
">

{card.value}

</h2>


</div>



<Icon

className={card.color}

size={28}

/>



</div>


</div>

);


})

}



</div>

);


};


export default CCTVStats;