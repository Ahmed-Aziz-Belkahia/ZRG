import React, { useEffect, useState } from 'react';

interface Server {
  name: string;
  image: string | null;
  url: string;
}

const TrustedBy: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch('/api/featured-servers'); // Fetch data from the endpoint
        if (response.ok) {
          const data = await response.json();
          setServers(data); // Update state with fetched data
        } else {
          console.error('Failed to fetch servers:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching servers:', error);
      }
    };

    fetchServers();
  }, []);

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-play text-2xl font-bold text-white mb-2">
            Trusted By <span className="text-gold">Leading Servers</span>
          </h2>
          <p className="text-gray-400">
            Join hundreds of successful FiveM servers powered by ZRG scripts
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-12">
          {servers.length > 0 ? (
            servers.map((server, index) => (
              <a
                key={index}
                href={server.url}
                target="_blank"
                rel="noopener noreferrer"
                className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img 
                  src={server.image || 'https://placehold.co/150x60/2A2A2A/FFFFFF?text=No+Image'} 
                  alt={server.name} 
                  className="h-12"
                />
              </a>
            ))
          ) : (
            <p className="text-gray-400">Loading servers...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;