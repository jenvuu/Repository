import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";

// Data Types
interface Photo {
  url: string;
  location: string;
  caption: string;
}

interface Country {
  code: string;
  name: string;
  photos: Photo[];
}

// Travel Data
const countries: Country[] = [
  {
    code: "GB",
    name: "United Kingdom",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
        location: "Lake District",
        caption: "Waterfalls"
      }
    ]
  },
  {
    code: "FR",
    name: "France",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
        location: "Paris",
        caption: "Eiffel Tower at sunset"
      }
    ]
  },
  {
    code: "IT",
    name: "Italy",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
        location: "Venice",
        caption: "Canals of Venice"
      }
    ]
  },
  {
    code: "ES",
    name: "Spain",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
        location: "Barcelona",
        caption: "Sagrada Familia"
      }
    ]
  },
  {
    code: "JP",
    name: "Japan",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
        location: "Kyoto",
        caption: "Cherry blossoms in spring"
      }
    ]
  },
  {
    code: "US",
    name: "United States",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&q=80",
        location: "California",
        caption: "Golden Gate Bridge"
      }
    ]
  },
  {
    code: "AU",
    name: "Australia",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80",
        location: "Sydney",
        caption: "Sydney Opera House"
      }
    ]
  },
  {
    code: "TH",
    name: "Thailand",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
        location: "Bangkok",
        caption: "Grand Palace"
      }
    ]
  },
  {
    code: "GR",
    name: "Greece",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
        location: "Santorini",
        caption: "Blue domes of Santorini"
      }
    ]
  },
  {
    code: "IS",
    name: "Iceland",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
        location: "Reykjavik",
        caption: "Northern Lights"
      }
    ]
  }
];

// WorldMap Component
const WorldMap = ({ selectedCountry, onCountryClick }: { selectedCountry: Country | null; onCountryClick: (country: Country | null) => void }) => {
  const countryRegions: Record<string, { x: number; y: number; width: number; height: number }> = {
    GB: { x: 460, y: 180, width: 25, height: 35 },
    FR: { x: 453, y: 200, width: 50, height: 55 },
    IT: { x: 484, y: 215, width: 40, height: 70 },
    ES: { x: 430, y: 230, width: 60, height: 50 },
    JP: { x: 805, y: 220, width: 70, height: 90 },
    US: { x: 75, y: 197, width: 250, height: 120 },
    AU: { x: 724, y: 450, width: 120, height: 80 },
    TH: { x: 718, y: 315, width: 35, height: 50 },
    GR: { x: 519, y: 238, width: 30, height: 25 },
    IS: { x: 429, y: 140, width: 35, height: 30 }
  };

  const handleCountryClick = (code: string) => {
    const country = countries.find(c => c.code === code);
    if (country) {
      onCountryClick(country);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 1000 600" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <rect width="1000" height="600" fill="#F5F5F0" />
        
        {/* Simplified continents */}
        <path d="M 50 150 L 350 150 L 350 350 L 200 380 L 100 350 Z" fill="#D8D8D0" opacity="0.4" />
        <path d="M 250 350 L 320 350 L 340 500 L 280 520 L 250 480 Z" fill="#D8D8D0" opacity="0.4" />
        <path d="M 420 140 L 550 140 L 570 200 L 560 260 L 480 280 L 420 240 Z" fill="#D8D8D0" opacity="0.4" />
        <path d="M 450 250 L 560 250 L 580 400 L 520 480 L 460 460 L 450 350 Z" fill="#D8D8D0" opacity="0.4" />
        <path d="M 550 140 L 850 140 L 900 220 L 880 350 L 750 370 L 650 340 L 570 260 Z" fill="#D8D8D0" opacity="0.4" />
        <path d="M 720 420 L 870 420 L 880 500 L 810 520 L 720 500 Z" fill="#D8D8D0" opacity="0.4" />
        
        {/* Country regions */}
        {Object.entries(countryRegions).map(([code, region]) => {
          const isSelected = selectedCountry?.code === code;
          const hasPhotos = countries.find(c => c.code === code);
          
          if (!hasPhotos) return null;
          
          return (
            <g key={code}>
              <rect
                x={region.x}
                y={region.y}
                width={region.width}
                height={region.height}
                fill={isSelected ? "#B4A5D9" : "#C5C5BA"}
                stroke="#F5F5F0"
                strokeWidth="2"
                rx="2"
                className="cursor-pointer hover:fill-[#B4A5D9] transition-all duration-300"
                onClick={() => handleCountryClick(code)}
                style={{ opacity: isSelected ? 1 : 0.85 }}
              />
              {isSelected && (
                <text
                  x={region.x + region.width / 2}
                  y={region.y + region.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="600"
                  pointerEvents="none"
                >
                  {code}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// CountrySelector Component
const CountrySelector = ({ selectedCountry, onSelect }: { selectedCountry: Country | null; onSelect: (country: Country) => void }) => {
  return (
    <div className="relative">
      <select
        value={selectedCountry?.code || ""}
        onChange={(e) => {
          const country = countries.find(c => c.code === e.target.value);
          if (country) onSelect(country);
        }}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
    </div>
  );
};

// PolaroidPhoto Component
const PolaroidPhoto = ({ photo, countryName }: { photo: Photo; countryName: string }) => {
  return (
    <div className="bg-white p-6 shadow-2xl rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={photo.url}
          alt={`${photo.location}, ${countryName}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-6 pb-2">
        <p className="text-2xl sm:text-3xl text-gray-800 text-center" style={{ fontFamily: 'Caveat, cursive' }}>
          {photo.caption}
        </p>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    countries.find((c) => c.code === "GB") || null
  );

  const currentPhoto = selectedCountry?.photos[0] || null;

  return (
    <main className="flex flex-col lg:flex-row min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
      `}</style>
      
      {/* Left Panel - Map Section */}
      <section className="lg:w-[45%] bg-[#F5F5F0] flex flex-col min-h-[50vh] lg:min-h-screen">
        {/* Header */}
        <header className="bg-[#1F1F1F] px-6 py-6 rounded-br-[2rem]">
          <h1 className="text-4xl sm:text-5xl text-white tracking-wide" style={{ fontFamily: 'Caveat, cursive' }}>
            travel pics
          </h1>
        </header>

        {/* Dropdown */}
        <div className="px-6 py-6">
          <CountrySelector
            selectedCountry={selectedCountry}
            onSelect={setSelectedCountry}
          />
        </div>

        {/* Map */}
        <div className="flex-1 min-h-[300px] lg:min-h-0 px-4">
          <WorldMap
            selectedCountry={selectedCountry}
            onCountryClick={setSelectedCountry}
          />
        </div>
      </section>

      {/* Right Panel - Photo Section */}
      <section className="lg:w-[55%] bg-[#C5B4E3] flex flex-col items-center justify-center p-8 lg:p-12 min-h-[50vh] lg:min-h-screen">
        {currentPhoto && selectedCountry ? (
          <div className="flex flex-col items-center gap-6 max-w-2xl w-full" key={selectedCountry.code}>
            <PolaroidPhoto
              photo={currentPhoto}
              countryName={selectedCountry.name}
            />
            
            {/* Location badge */}
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5" />
              <span className="text-xl sm:text-2xl" style={{ fontFamily: 'Caveat, cursive' }}>
                {currentPhoto.location}, {selectedCountry.name}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p className="text-3xl" style={{ fontFamily: 'Caveat, cursive' }}>
              Select a country to view photos
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
