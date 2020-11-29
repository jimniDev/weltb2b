import { Pie } from "ant-design-pro/lib/Charts";
import { AiOutlineEnvironment } from "react-icons/ai";
import { AiTwotoneFire } from "react-icons/ai";
import { BiWalk } from "react-icons/bi";
import { GiBelt } from "react-icons/gi";

const PieChart = ({ percent, color, total, subTitle, con, num }) => {
  let arr;
  if (con >= 0) arr = "▲";
  else arr = "▼";
  con = Math.abs(con);
  if (num === 1) {
    return (
      <Pie
        percent={percent}
        color={color}
        total={
          <div style={{ fontSize: 8, marginTop: 20 }}>
            어제 대비 {con}
            {arr}
            <div style={{ fontSize: 14, marginTop: 4 }}>{percent}</div>
          </div>
        }
        subTitle={
          <AiOutlineEnvironment style={{ fontSize: 36, color: "#020202" }} />
        }
      ></Pie>
    );
  } else if (num === 2) {
    return (
      <Pie
        percent={percent}
        color={color}
        total={
          <div style={{ fontSize: 8, marginTop: 20 }}>
            어제 대비 {con}
            {arr}
            <div style={{ fontSize: 14, marginTop: 4 }}>{percent}</div>
          </div>
        }
        subTitle={<GiBelt style={{ fontSize: 36, color: "#020202" }} />}
      ></Pie>
    );
  } else if (num === 3) {
    return (
      <Pie
        percent={percent}
        color={color}
        total={
          <div style={{ fontSize: 8, marginTop: 20 }}>
            어제 대비 {con}
            {arr}
            <div style={{ fontSize: 14, marginTop: 4 }}>{percent}</div>
          </div>
        }
        subTitle={<AiTwotoneFire style={{ fontSize: 36, color: "#020202" }} />}
      ></Pie>
    );
  } else if (num === 4) {
    return (
      <Pie
        percent={percent}
        color={color}
        total={
          <div style={{ fontSize: 8, marginTop: 20 }}>
            어제 대비 {con}
            {arr}
            <div style={{ fontSize: 14, marginTop: 4 }}>{percent}</div>
          </div>
        }
        subTitle={<BiWalk style={{ fontSize: 36, color: "#020202" }} />}
      ></Pie>
    );
  }
};

export default PieChart;
