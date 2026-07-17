// C:\PoliceAI-Command-Center\client\src\components\RecommendationCard.jsx
import {
  BrainCircuit
} from "lucide-react";


const RecommendationCard = ({data})=>{


return (

<div
className="
bg-slate-900
border border-slate-800
rounded-xl
p-6
"
>


<div className="flex items-center gap-3">


<div
className="
bg-blue-500/10
p-3
rounded-lg
"
>

<BrainCircuit
className="text-blue-400"
/>

</div>


<div>

<h2 className="text-xl font-bold text-white">
AI Coverage Recommendation
</h2>

<p className="text-slate-400 text-sm">
AI powered patrol optimization
</p>

</div>


</div>



<p className="
mt-5
text-slate-300
leading-relaxed
">

{
data?.recommendation ||
"No recommendation available"
}

</p>


</div>

);


};


export default RecommendationCard;