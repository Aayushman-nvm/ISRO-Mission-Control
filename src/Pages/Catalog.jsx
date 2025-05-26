import CatalogCard from '../Components/CatalogCard';
import commercialCraftImg from '../Images/Commercial_Craft.jpg';
import spaceCraftImg from '../Images/Spacecrafts_placeholder.jpeg';

function Catalog() {
  const catalogData = [
    {
      name: "Spacecrafts",
      link: "/catalog/spacecrafts",
      description: "Explore the various spacecrafts launched by ISRO, including their missions and specifications.",
      img_src: spaceCraftImg
    },
    {
      name: "Commercial",
      link: "/catalog/commercial",
      description: "Discover ISRO's commercial ventures and partnerships in the space industry.",
      img_src: commercialCraftImg
    }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-screen-lg">
        <h1 className="text-xl font-bold md:text-center text-white mb-6 mt-20">
          Catalog
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {catalogData.map((item, index) => (
            <CatalogCard 
              key={index} 
              name={item.name} 
              link={item.link} 
              description={item.description} 
              img_src={item.img_src} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
