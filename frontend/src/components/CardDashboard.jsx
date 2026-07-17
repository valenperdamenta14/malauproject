import {
  FaBox,
  FaUsers,
  FaCalendarCheck,
  FaMoneyBillWave,
} from "react-icons/fa";

const CardDashboard = ({
  title,
  value,
  icon,
  color,
}) => {

  return (
    <div
      className="card-dashboard"
      style={{
        borderLeft: `5px solid ${color}`,
      }}
    >

      <div className="card-icon">
        {icon}
      </div>

      <div className="card-content">
        <p>
          {title}
        </p>

        <h3>
          {value}
        </h3>
      </div>
    </div>
  );
};

export default CardDashboard;