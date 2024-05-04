import {
    DeleteOutlined
} from "@ant-design/icons";
import React from 'react';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteExpense
} from "../../redux/budget/reducer";
import "./style.css";
import dayjs from "dayjs";

function ExpenseView(props) {
    const dispatch = useDispatch();
    const { expense, index } = props;
    const budgetSlice = useSelector((state) => state.budget);

    function getCategoryName(id) {
        let data = budgetSlice.budgets.filter((obj) => {
            return obj._id == id;
        })
        return data?.length > 0 ? data[0].name : ""
    }

    return (
        <div className='bugetView' >
            <div className='displayFlex '>
                <p>No : </p>
                <p className='p2'>{index}</p>
            </div>
            <div className='displayFlex mp10'>
                <p>Name : </p>
                <p className='p2'>{expense.description}</p>
            </div>
            <div className='displayFlex mp10'>
                <p>Amount : </p>
                <p className='p2'>{expense.amount}</p>
            </div>
            <div className='displayFlex mp10'>
                <p>Date : </p>
                <p className='p2'>{dayjs(expense.date).format("DD-MMM-YYYY")}</p>
            </div>
            <div className='displayFlex mp10'>
                <p>Category : </p>
                <p className='p2'>{getCategoryName(expense.categoryId)}</p>
            </div>
            <div className="editDelete mp10">
                <div
                    className="cursor"
                    onClick={() => {
                        confirmAlert({
                            title: <p className="deleteBudP">{"Delete budget"}</p>,
                            message: "Are you sure to delete this ?",
                            buttons: [
                                {
                                    label: "Yes",
                                    onClick: () => {
                                        dispatch(deleteExpense(expense));
                                    },
                                },
                                {
                                    label: "No",
                                },
                            ],
                        });
                    }}
                >
                    <DeleteOutlined size="large" style={{ fontSize: "24px" }} />
                </div>
            </div>

        </div>
    )
}

export default ExpenseView