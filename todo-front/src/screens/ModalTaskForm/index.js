import React from 'react';
import {
    Form,
    Input,
    Modal,
    DatePicker,
    Select,
    Checkbox
} from 'antd';
import moment from 'moment';

import './style.less';
import {BASE_URL, KEY_USER_ID} from "../../utils/config";
import axios from "axios/index";

const FormItem = Form.Item;
const Option = Select.Option;

class ModalTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            start_date: "",
            end_date: "",
            task: null,
            status: '',
            priority: '',
            repeat: false
        }
    }

    onCancel = () => {
        if (this.props.onHide) {
            this.props.onHide([]);
        }
    };

    onSubmit = () => {
        const userId = localStorage.getItem(KEY_USER_ID);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    title: values.title,
                    description: values.description
                });
                if (this.props.task !== undefined) {
                    if (this.state.priority === '') {
                        this.setState({
                            priority: this.props.task.priority
                        });
                    }
                    if (this.state.status === '') {
                        this.setState({
                            status: this.props.task.status
                        });
                    }
                    let params = {
                        id: this.props.task._id,
                        title: values.title,
                        description: values.description,
                        priority: this.state.priority === '' ? this.props.task.priority : this.state.priority,
                        status: this.state.status === '' ? this.props.task.status : this.state.status,
                        end_date: this.state.end_date === '' ? moment(this.props.task.end_date).format("YYYY-MM-DD") : this.state.end_date,
                        user_id: userId
                    };
                    console.log(params);
                    axios.post(BASE_URL + "task/update", params).then(this.onSuccess).catch(this.onError);
                } else {
                    axios.post(BASE_URL + "task/store", {
                        title: values.title,
                        description: values.description,
                        priority: this.state.priority,
                        status: this.state.status,
                        repeat: this.state.repeat,
                        end_date: this.state.end_date,
                        user_id: userId
                    }).then(this.onSuccess).catch(this.onError);
                }
            }
        });
    };

    onSuccess = (response) => {
        console.log("response", response.data.data.tasks);
        if (this.props.onHide) {
            this.props.onHide(response.data.data.tasks);
        }
    };

    onError = (error) => {
        if (this.props.onHide) {
            this.props.onHide([]);
        }
    };

    onChangeEndDate = (date, dateString) => {
        this.setState({
            end_date: moment(dateString).format("YYYY-MM-DD")
        });
    };

    handlePriorityChange = (value) => {
        this.setState({
            priority: value
        });
    };

    handleStatusChange = (value) => {
        this.setState({
            status: value
        });
    };

    onRepeatChange = (e) => {
        this.setState({
            repeat: e.target.checked,
        });
    };

    componentWillMount() {
        console.log("task", this.props.task);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {visible} = this.props;
        return (
            <Modal visible={visible}
                   title="Create a Task"
                   okText="Submit"
                   maskClosable={false}
                   onCancel={this.onCancel}
                   onOk={this.onSubmit}>
                <Form layout="vertical">
                    <FormItem label="Title">
                        {
                            getFieldDecorator('title', {
                                    rules: [{required: true, message: 'Please input the title of collection!'}],
                                    initialValue: this.props.task !== undefined ? this.props.task.title : ""
                                }
                            )
                            (
                                <Input placeholder="Task Title"/>
                            )
                        }
                    </FormItem>
                    <FormItem label="Description">
                        {
                            getFieldDecorator('description', {
                                    rules: [{required: true, message: 'Please input the title of collection!'}],
                                    initialValue: this.props.task !== undefined ? this.props.task.description : ""
                                }
                            )
                            (
                                <Input.TextArea rows={4} placeholder="Task Description"/>
                            )
                        }
                    </FormItem>
                    <FormItem label="Priority">
                        <Select defaultValue={this.props.task !== undefined ? this.props.task.priority : ''}
                                onChange={this.handlePriorityChange}>
                            <Option value="High">High</Option>
                            <Option value="Medium">Medium</Option>
                            <Option value="Low">Low</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="Status">
                        <Select defaultValue={this.props.task !== undefined ? this.props.task.status : ''}
                                onChange={this.handleStatusChange}>
                            <Option value="Opened">Opened</Option>
                            <Option value="In Progress">In Progress</Option>
                            <Option value="In Review">In Review</Option>
                            <Option value="Completed">Completed</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="Due Date">
                        <DatePicker onChange={this.onChangeEndDate} style={{width: '100%'}}
                                    defaultValue={this.props.task !== undefined ? moment(this.props.task.end_date) : moment()}/>
                    </FormItem>
                    {this.props.task === undefined ? (
                        <FormItem>
                            <Checkbox checked={this.state.repeat}
                                      onChange={this.onRepeatChange}>
                                Repeat task
                            </Checkbox>
                        </FormItem>
                    ) : null}
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(ModalTaskForm);