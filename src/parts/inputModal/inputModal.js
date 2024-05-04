import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Form,
  Input,
  Spin,
  Select,
  InputNumber,
  DatePicker,
} from "antd";
import Helper from "../../utility/helper";
import { addExpense, addBudget } from "../../redux/budget/reducer";
const Option = Select.Option;

function InputModal(props) {
  const dispatch = useDispatch();
  const budgetSlice = useSelector((state) => state.budget);

  const {
    isModalOpen,
    setIsModalOpen,
    title,
    editableRecord,
  } = props;
  const [form] = Form.useForm();

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        if (editableRecord) {
          values._id = editableRecord._id;
        }
        if (title?.toLowerCase().includes("expense")) {
          values.date = dayjs(values.date).valueOf();
          dispatch(addExpense(values));
        } else {
          dispatch(addBudget(values));
        }
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
        Helper.sendNotification("error", "Please fill all the details");
      });
  }

  function handleCancel() {
    form.resetFields();
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (editableRecord) {
      if (title?.toLowerCase().includes("expense")) {
        form.setFieldsValue({
          ...editableRecord,
          date: dayjs(editableRecord.date),
        });
      } else {
        form.setFieldsValue(editableRecord);
      }
    }
  }, [editableRecord]);

  function getFormFields() {
    if (title?.toLowerCase().includes("expense")) {
      return (
        <Form
          form={form}
          name="basic"
          layout="vertical"
          labelCol={{ span: 8, style: { color: "black", fontWeight: "bold" } }}
          wrapperCol={{ span: 16 }}
          onFinish={() => { }}
          onFinishFailed={(errorInfo) => {
            console.log("Failed:", errorInfo);
            Helper.sendNotification("error", "Please fill all the details");
          }}
          autoComplete="off"
        >
          <Form.Item
            label={
              <span style={{ color: "black", fontWeight: "bold" }}>Name</span>
            }
            name="description"
            rules={[{ required: true, message: "Please input description" }]}
          >
            <Input placeholder="Enter description" />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ color: "black", fontWeight: "bold" }}>Amount</span>
            }
            name="amount"
            rules={[{ required: true, message: "Please input amount" }]}
          >
            <InputNumber style={{ width: "100%" }} placeholder="Enter amount" />
          </Form.Item>
          <Form.Item
            label={
              <span style={{ color: "black", fontWeight: "bold" }}>Date</span>
            }
            name="date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="select date"
              format={"DD-MMM-YYYY"}
            />
          </Form.Item>
          <Form.Item
            label={
              <span style={{ color: "black", fontWeight: "bold" }}>
                Category
              </span>
            }
            name="categoryId"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select category">
              {budgetSlice.budgets.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      );
    }
    return (
      <Form
        form={form}
        name="basic"
        layout="vertical"
        labelCol={{ span: 8, style: { color: "black", fontWeight: "bold" } }}
        wrapperCol={{ span: 16 }}
        onFinish={() => { }}
        onFinishFailed={(errorInfo) => {
          console.log("Failed:", errorInfo);
          Helper.sendNotification("error", "Please fill all the details");
        }}
        autoComplete="off"
      >
        <div >
          <Form.Item
            label={
              <span style={{ color: "black", fontWeight: "bold" }}>
                Category Name
              </span>
            }
            style={{ alignItems: "center" }}
            name="name"
            rules={[{ required: true, message: "Please input category name" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ color: "black", fontWeight: "bold" }}>
                Allocated Amount
              </span>
            }
            style={{ alignItems: "center" }}
            name="allocatedAmount"
            rules={[{ required: true, message: "Please input amount" }]}
          >
            <InputNumber style={{ width: "100%" }} placeholder="Enter amount" />
          </Form.Item>
        </div>
      </Form >
    );
  }
  return (
    <Modal
      title={<div style={{ marginBottom: "20px" }}>{title}</div>}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add"
    >
      <Spin spinning={budgetSlice.isLoading}>{getFormFields()}</Spin>
    </Modal>
  );
}

export default InputModal;
