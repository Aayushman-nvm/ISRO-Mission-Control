import { NavLink } from "react-router-dom";

function DisplayCard({
  Name,
  LaunchDate,
  LaunchType,
  Payload,
  Link,
  MissionStatus,
  LaunchVehicle,
  OrbitType,
  Application
}) {
  const isUnsuccessful = MissionStatus?.toLowerCase().includes("unsuccessful");

  return (
    <div
      className={`p-4 rounded-md shadow-md transition duration-300 border border-gray-700
        ${isUnsuccessful
          ? "bg-gradient-to-r from-transparent via-transparent to-red-900/20"
          : "bg-gradient-to-r from-[#0a0a1a] via-transparent to-gray-900/80"
        }`}
    >
      {Name && <h2 className="text-xl font-semibold text-white">{Name}</h2>}

      {LaunchDate && (
        <p className="text-sm text-gray-300">
          <strong>Launch Date:</strong> {new Date(LaunchDate).toLocaleDateString()}
        </p>
      )}

      {LaunchType && (
        <p className="text-sm text-gray-300">
          <strong>Launch Type:</strong> {LaunchType}
        </p>
      )}

      {Payload && (
        <p className="text-sm text-gray-300">
          <strong>Payload:</strong> {Payload}
        </p>
      )}

      {MissionStatus && (
        <p className={`text-sm ${isUnsuccessful ? "text-red-400" : "text-green-400"}`}>
          <strong>Mission Status:</strong> {MissionStatus}
        </p>
      )}

      {LaunchVehicle && (
        <p className="text-sm text-gray-300">
          <strong>Launch Vehicle:</strong> {LaunchVehicle}
        </p>
      )}

      {OrbitType && (
        <p className="text-sm text-gray-300">
          <strong>Orbit Type:</strong> {OrbitType}
        </p>
      )}

      {Application && (
        <p className="text-sm text-gray-300">
          <strong>Application:</strong> {Application}
        </p>
      )}

      {Link && (
        <NavLink
          to={Link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-blue-400 hover:text-blue-300 transition"
        >
          More Details →
        </NavLink>
      )}
    </div>
  );
}

export default DisplayCard;
