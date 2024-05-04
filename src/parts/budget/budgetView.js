import {
    DeleteOutlined
} from "@ant-design/icons";
import React from 'react';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch } from "react-redux";
import {
    deleteBudget
} from "../../redux/budget/reducer";
import "./style.css";

function BudgetView(props) {
    const dispatch = useDispatch();

    const { budget, index } = props;
    return (
        <div className='bugetView' >
            <div className='displayFlex '>
                <p>No : </p>
                <p className='p2'>{index}</p>
            </div>
            <div className='displayFlex mp10'>
                <p>Name : </p>
                <p className='p2'>{budget.name}</p>
            </div>
            <div className='displayFlex mp10'>
                <p>Amount : </p>
                <p className='p2'>{budget.allocatedAmount}</p>
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
                                        dispatch(deleteBudget(budget));
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

export default BudgetView