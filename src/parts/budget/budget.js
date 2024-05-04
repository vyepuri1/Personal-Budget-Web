import { TinyColor } from "@ctrl/tinycolor";
import {
  Button,
  Col,
  Input,
  Row
} from "antd";
import React, { useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { CirclesWithBar } from 'react-loader-spinner';
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBudget,
  getAllBudget,
  resetOperationType,
} from "../../redux/budget/reducer";
import InputModal from "../inputModal/inputModal";
import BudgetView from "./budgetView";
import "./style.css";


function Budget() {
  const dispatch = useDispatch();
  const budgetSlice = useSelector((state) => state.budget);



  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllBudget());
  }, []);

  useEffect(() => {
    setTableData(filterlist(budgetSlice.budgets, search));
  }, [budgetSlice.budgets]);

  function filter(data, name) {
    setSearch(name);
    setTableData(filterlist(data, name));
  }
  function filterlist(data, name) {
    data = data.map((obj, index) => {
      return { ...obj, index: parseInt(index) + 1 };
    });
    return data.filter((obj) => {
      return obj.name.toLowerCase().includes(name.toLowerCase());
    });
  }


  useEffect(() => {
    if (
      budgetSlice.operationType == "ADD_BUDGET_SUCCESS" ||
      budgetSlice.operationType == "DELETE_BUDGET_SUCCESS"
    ) {
      dispatch(resetOperationType());
      dispatch(getAllBudget());
      setIsModalOpen(null);
    }
  }, [budgetSlice.operationType]);

  let height = window.appHeight !== undefined ? window.appHeight : "1500px";

  return (
    <div>{budgetSlice.isLoading ?
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        outerCircleColor="#4fa94d"
        innerCircleColor="#4fa94d"
        barColor="#4fa94d"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass="spinClass"
        visible={budgetSlice.isLoading}
      ></CirclesWithBar>
      :
      <div
        style={{ height: height }}
        className="mainDivE">
        <div className="homeDiv22">
          <div className="budExDiv">
            <div>
              <p className="tb1">
                <Input
                  placeholder="Search budget"
                  onChange={(e) => {
                    filter(budgetSlice.budgets, e.target.value)
                  }}
                  style={{
                    width: "100%",
                    marginTop: "3px"
                  }}
                  value={search}

                /> </p>
            </div>
            <div className="dashDiv">My Budget</div>
            <div>
              <p className="tb1">
                <Button
                  type="primary"
                  danger
                  size="large"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  Add budget
                </Button> </p>
            </div>
          </div>
          <div className="tableDiv">
            <Row>
              {tableData.map((obj, index) => {
                return (
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={6}
                    style={{ padding: "10px" }}
                  >

                    <BudgetView
                      index={Number(index) + 1}
                      budget={obj}
                      deleteBudget={deleteBudget}
                    />
                  </Col>
                )
              })}
            </Row>
          </div>
          <InputModal
            title={"Add Budget"}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            deleteBudget={deleteBudget}
            dispatch={dispatch}
          />
        </div>
      </div>
    }
    </div>

  );
}

export default Budget;
