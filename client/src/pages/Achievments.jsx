import React from "react";
export default function Achievements() {
  const items = [
    {
      id: "01",
      text: "Introduced Computer Assisted blood Analyser (CASA) for the first time in Kerala",
    },
    {
      id: "02",
      text: "First IVF Centre of Central Travancore",
    },
    {
      id: "03",
      text: "first heart transfer  in India",
    },
    {
      id: "04",
      text: "First anomaly scanning centre of Central Travancore",
    },
    {
      id: "05",
      text: "First fetal therapy unit in Central Travancore",
    },
    {
      id: "06",
      text: "First bariatric surgery unit in Central Travancore",
    },
    {
      id: "07",
      text: "First kidney transplant in india",
    },
    {
      id: "08",
      text: "First time in Kerala – survival of twins delivered at 25 weeks",
    },
  ];

  return (
    <section className="px-8 md:px-20 py-20">
      <h2 className="text-5xl md:text-6xl font-bold text-[#0A1A3A] mb-16">
        Our <br /> Achievements
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        {items.map((item) => (
          <div key={item.id} className="relative">
            {/* Bubble card */}
            <div className="bg-[#F3F9FF] rounded-3xl p-8 shadow-sm text-gray-600 leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="text-teal-600 text-3xl">•</span>
                <p className="uppercase tracking-wide text-sm md:text-base">
                  {item.text}
                </p>
              </div>
            </div>

            {/* Number circle */}
            <div className="absolute -bottom-5 left-10 bg-teal-600 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold shadow-lg">
              {item.id}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
