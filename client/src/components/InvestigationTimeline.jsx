// C:\PoliceAI-Command-Center\client\src\components\InvestigationTimeline.jsx
import {
  Clock,
  ShieldAlert,
  CheckCircle,
} from "lucide-react";

const InvestigationTimeline = ({ caseData }) => {
  const steps = [
    {
      title: "Case Created",
      icon: Clock,
      color: "text-blue-400",
      date: new Date(caseData.createdAt).toLocaleString(),
    },
    {
      title: "Investigation",
      icon: ShieldAlert,
      color: "text-yellow-400",
      date:
        caseData.status === "investigation" ||
        caseData.status === "closed"
          ? "Investigation Started"
          : "Pending",
    },
    {
      title: "Case Closed",
      icon: CheckCircle,
      color: "text-green-400",
      date:
        caseData.status === "closed"
          ? "Completed"
          : "Not Closed",
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">
        Investigation Timeline
      </h2>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={index}
              className="flex gap-4 relative"
            >
              {/* Vertical Line */}
              {index !== steps.length - 1 && (
                <div
                  className="
                    absolute
                    left-5
                    top-10
                    w-[2px]
                    h-10
                    bg-slate-700
                  "
                />
              )}

              {/* Icon */}
              <div
                className="
                  h-10
                  w-10
                  rounded-full
                  bg-slate-800
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Icon
                  size={18}
                  className={step.color}
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-white font-semibold">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  {step.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvestigationTimeline;