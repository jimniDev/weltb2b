import { StarOutlined } from "@ant-design/icons";
import { Pie } from "ant-design-pro/lib/Charts";

const PieChart = ({ percent, color, total, subTitle }) => {
  return (
    <Pie
      percent={percent}
      color={color}
      total={
        <div style={{ fontSize: 8, marginTop: 20 }}>
          어제 대비<div style={{ fontSize: 14, marginTop: 4 }}>{percent}</div>
        </div>
      }
      subTitle={<StarOutlined style={{ fontSize: 36, color: "#020202" }} />}
    ></Pie>
  );
};

export default PieChart;
