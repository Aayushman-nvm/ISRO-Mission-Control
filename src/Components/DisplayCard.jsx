import { NavLink } from "react-router-dom"

function DisplayCard({Name,LaunchDate,LaunchType,Payload,Link,MissionStatus,LaunchVehicle,OrbitType,Application}) {
  return (
    <div>DisplayCard
        <h2>{Name}</h2>
        <p><strong>Launch Date:</strong> {new Date(LaunchDate).toLocaleDateString()}</p>
        <p><strong>Launch Type:</strong> {LaunchType}</p>
        <p><strong>Payload:</strong> {Payload}</p>
        <p><strong>Mission Status:</strong> {MissionStatus}</p>
        <p><strong>Launch Vehicle:</strong> {LaunchVehicle}</p>
        <p><strong>Orbit Type:</strong> {OrbitType}</p>
        <p><strong>Application:</strong> {Application}</p>
        <NavLink to={Link} target="_blank" rel="noopener noreferrer" className={({ isActive }) => isActive ? "active" : "inactive"}>
          More Details
        </NavLink>
    </div>
  )
}

export default DisplayCard