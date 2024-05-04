import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBudget, getAllExpense } from "../../redux/budget/reducer";
import dayjs from "dayjs";
import "./style.css";
import DoubleBarChart from "./doubleBarChart";
import PieChart from "./pieChart";
import LineChart from "./lineChart";
import Helper from "../../utility/helper";
import { BallTriangle } from 'react-loader-spinner'


function Dashboard() {
  const dispatch = useDispatch();
  const budgetSlice = useSelector((state) => state.budget);

  const [monthValue, setMonthValue] = useState(dayjs());

  useEffect(() => {
    let user = Helper.getItem("user");
    if (user && user != "null" && user != "undefined") {
      dispatch(getAllBudget());
      dispatch(getAllExpense());
    }
  }, []);

  function onChange(value) {
    setMonthValue(value);
  }

  function getAmt(key) {
    let amount = 0;
    if (key == "totalBudget") {
      budgetSlice.budgets.map((obj) => {
        amount += obj.allocatedAmount;
      });
    } else {
      budgetSlice.expenses.map((obj) => {
        if (dayjs(obj.date).isSame(monthValue, "month")) amount += obj.amount;
      });
    }
    return amount;
  }

  function getDoubleBarChartData(key) {
    let result = [];
    if (key == "labels") {
      budgetSlice.budgets.map((obj) => {
        result.push(obj.name);
      });
    } else if (key == "data1") {
      budgetSlice.budgets.map((obj) => {
        result.push(obj.allocatedAmount);
      });
    } else if (key == "lineChartData") {
      let month = dayjs(monthValue).startOf("month");
      let tmp = {};
      for (let i = 1; i <= month.daysInMonth(); i++) {
        tmp[month.date(i).format("Do MMM")] = 0;
      }
      budgetSlice.expenses.map((item) => {
        let monthVal = dayjs(item.date).format("Do MMM");
        if (tmp.hasOwnProperty(monthVal)) {
          tmp[monthVal] += item.amount;
        }
      });
      Object.values(tmp).forEach((val) => {
        result.push(val);
      });
    } else if (key == "budgetByCategory") {
    } else {
      budgetSlice.budgets.map((obj) => {
        let amt = 0;
        budgetSlice.expenses.map((item) => {
          if (
            obj._id == item.categoryId &&
            dayjs(item.date).isSame(monthValue, "month")
          ) {
            amt += item.amount;
          }
        });
        result.push(amt);
      });
    }
    return result;
  }

  return (
    <div>
      {budgetSlice.isLoading
        ? <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass="spinClass"
          visible={budgetSlice.isLoading}
        /> :
        <div className="mainDivE">
          <div className="homeDiv1">
            <div className="dateDiv">
              <Row style={{ marginBottom: "15px" }}>
                <Col>
                  <DatePicker
                    value={monthValue}
                    onChange={(value) => {
                      onChange(value);
                    }}
                    format={"MMM-YYYY"}
                    picker="month"
                    allowClear={false}
                  />
                </Col>
              </Row>
            </div>
            <div className="budExDiv">
              <div>
                <p className="tb1"> {"Total Expense : "} {"$ " + getAmt("expense")} </p>
              </div>
              <div className="dashDiv">My Dashboard</div>
              <div>
                <p className="tb1">{"Total budget : "} {"$ " + getAmt("totalBudget")}</p>
              </div>
            </div>

            <div className="graphDiv">
              <div className="cardDiv">
              </div>
              <div className="doubleBarChartDiv">
                <PieChart
                  labels={getDoubleBarChartData("labels")}
                  data={getDoubleBarChartData("data1")}
                  chartType={"option1"}
                />
              </div>
              <div className="doubleBarChartDiv">
                <DoubleBarChart
                  labels={getDoubleBarChartData("labels")}
                  data1={getDoubleBarChartData("data1")}
                  data2={getDoubleBarChartData("data2")}
                />
              </div>
              <div className="doubleBarChartDiv">
                <LineChart
                  month={monthValue}
                  data={getDoubleBarChartData("lineChartData")}
                />
              </div>

            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Dashboard;
