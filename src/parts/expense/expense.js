import {
  Button,
  Col,
  Row
} from "antd";
import React, { useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FidgetSpinner } from 'react-loader-spinner';
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBudget,
  getAllExpense,
  resetOperationType
} from "../../redux/budget/reducer";
import InputModal from "../inputModal/inputModal";
import ExpenseView from "./expenseView";
import "./style.css";


function Expense() {
  const dispatch = useDispatch();
  const budgetSlice = useSelector((state) => state.budget);
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllExpense());
    dispatch(getAllBudget());
  }, []);

  useEffect(() => {
    let data = [...budgetSlice.expenses];
    data = filter(data, search);
    setTableData(data);
  }, [budgetSlice.expenses]);

  function filter(data, name) {
    data = data.map((obj, index) => {
      return { ...obj, index: parseInt(index) + 1 };
    });
    return data.filter((obj) => {
      return obj.description.toLowerCase().includes(name.toLowerCase());
    });
  }

  useEffect(() => {
    if (
      budgetSlice.operationType == "ADD_EXPENSE_SUCCESS" ||
      budgetSlice.operationType == "DELETE_EXPENSE_SUCCESS"
    ) {
      dispatch(resetOperationType());
      dispatch(getAllExpense());
      setIsModalOpen(null);
    }
  }, [budgetSlice.operationType]);

  let height = window.appHeight !== undefined ? window.appHeight : "1500px";
  return (
    <div>
      {budgetSlice.isLoading ?
        <div className="spinClass">
          <FidgetSpinner
            visible={budgetSlice.isLoading}
            height="80"
            width="80"
            ariaLabel="fidget-spinner-loading"
            wrapperStyle={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: "200px",
            }}
            wrapperClass="spinClass"
          />
        </div> :
        <div
          style={{ height: height }} className="mainDivE">
          <div className="homeDiv22">
            <div className="budExDiv">
              <div>
                <p className="tb1">
                  {/* <Input
                    placeholder="Search budget"
                    onChange={(e) => {
                      filter(budgetSlice.budgets, e.target.value)
                    }}
                    style={{
                      width: "100%",
                      marginTop: "3px"
                    }}
                    value={search}

                  /> */}
                </p>
              </div>
              <div className="dashDiv">My Expense</div>
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
                    Add Expense
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

                      <ExpenseView
                        index={Number(index) + 1}
                        expense={obj}
                      />
                    </Col>
                  )
                })}
              </Row>
            </div>
            <InputModal
              title={"Add Expense"}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
      }
    </div>
  );
}
export default Expense;
