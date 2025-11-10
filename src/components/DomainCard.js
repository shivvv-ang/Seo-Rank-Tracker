export default function DomainCard({owner,icon,domain}) {
    const keywords = [
      "github",
      "git",
      "copilot",
      "AI-powered",
      "developer platform",
      "largest open source",
      "community build software",
    ];
  
    return (
      <div className="flex gap-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-5 items-center justify-between hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-xl">
      
        <div className="shrink-0">
          <img
            src={icon}
            alt="Domain Logo"
            className="h-12 w-12 rounded-full border border-white/30 shadow"
          />
        </div>
  
    
        <div className="grow">
          <h2 className="font-extrabold text-lg mb-2 text-white">
            {domain}
          </h2>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="text-xs text-gray-100 bg-white/10 border border-white/20 rounded-lg px-2 py-1 hover:bg-white/20 transition-all"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
  
      
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl text-center text-white w-36 h-16 flex items-center justify-center font-semibold shadow-md">
          Rank ↑12
        </div>
      </div>
    );
  }
  